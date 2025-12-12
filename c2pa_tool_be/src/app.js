import express from "express";
import multer from "multer";
import {
  Reader,
  Builder,
  LocalSigner,
  loadVerifyConfig,
  loadTrustConfig,
} from "@contentauth/c2pa-node";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sentry-mark.vercel.app"
  ],          // allow all origins
  methods: "GET,POST",  // allowed HTTP methods
  allowedHeaders: "*",  // allow any headers (important for file uploads)
}));

// -------------------------------------------------------------
//  Writable Temp Directory (IMPORTANT FOR SERVERLESS)
// -------------------------------------------------------------
const TEMP_DIR = "/tmp/c2pa-temp";

await fs.mkdir(TEMP_DIR, { recursive: true });

// -------------------------------------------------------------
//  Read-Only Keys Directory (INSIDE BUNDLE)
// -------------------------------------------------------------
const KEYS_DIR = path.join(__dirname, "keys");

// -------------------------------------------------------------
// Multer config (memory, no disk writes)
// -------------------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });
const handleFileUpload = upload.any();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------------------------------------------
// Trust config
// -------------------------------------------------------------
try {
  const caCertPath = path.join(KEYS_DIR, "ca_cert.pem");
  if (fsSync.existsSync(caCertPath)) {
    const caCert = fsSync.readFileSync(caCertPath, "utf8");

    loadTrustConfig({
      verifyTrustList: false,
      trustAnchors: [caCert],
      allowedList: [],
    });

    console.log("✅ C2PA trust config loaded");
  }

  loadVerifyConfig({
    verifyAfterReading: true,
    verifyAfterSign: true,
    verifyTrust: true,
    ocspFetch: false,
    remoteManifestFetch: true,
  });
} catch (e) {
  console.warn("⚠️ Could not load trust config:", e.message);
}

// -------------------------------------------------------------
// Helpers
// -------------------------------------------------------------
function extOf(filename) {
  return path.extname(filename).toLowerCase();
}

function mimeOf(filename) {
  const map = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".mp3": "audio/mpeg",
    ".wav": 'audio/wav',
    ".ogg": 'audio/ogg',
    ".pdf": 'application/pdf',
    ".txt": 'text/plain',
    ".json": 'application/json',
  };
  return map[extOf(filename)] || "application/octet-stream";
}

// =============================================================
// SIGN ENDPOINT
// =============================================================
app.post("/api/sign", handleFileUpload, async (req, res) => {
  let inputPath = null;
  let outputPath = null;

  try {
    const file = req.files?.[0];
    if (!file) return res.status(400).json({ error: "No file provided" });

    const { title, creator, claimGenerator } = req.body;
    if (!title || !creator)
      return res
        .status(400)
        .json({ error: "Missing required fields: title, creator" });

        
        
        // Temp paths
        const timestamp = Date.now();
        const ext = extOf(file.originalname);
        
        inputPath = `${TEMP_DIR}/input_${timestamp}${ext}`;
        outputPath = `${TEMP_DIR}/output_${timestamp}${ext}`;
        
        await fs.writeFile(inputPath, file.buffer);
        
        const reader = await Reader.fromAsset({ path: inputPath });

        if (reader) {
          await fs.unlink(inputPath);
          return res.status(404).json({
            error: "Media has existing C2PA signature",
          });
        }

    // Load static keys (read-only)
    const certPath = path.join(KEYS_DIR, "certificate_chain.pem");
    const keyPath = path.join(KEYS_DIR, "private_key.pem");

    if (!fsSync.existsSync(certPath) || !fsSync.existsSync(keyPath)) {
      return res.status(500).json({
        error: "Keys missing",
        details: "Run certificate generation script",
      });
    }

    const certBuf = fsSync.readFileSync(certPath);
    const keyBuf = fsSync.readFileSync(keyPath);

    const signer = LocalSigner.newSigner(certBuf, keyBuf, "es256");

    const manifestDefinition = {
      claim_generator: claimGenerator || "C2PA Node API/1.0",
      title,
      assertions: [
        {
          label: "c2pa.actions",
          data: {
            actions: [
              {
                action: "c2pa.created",
                when: new Date().toISOString(),
                softwareAgent: claimGenerator || "C2PA Node API/1.0",
              },
            ],
          },
        },
        {
          label: "stds.schema-org.CreativeWork",
          data: {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            author: [{ "@type": "Person", name: creator }],
          },
        },
      ],
    };

    const builder = Builder.withJson(manifestDefinition);

    // SIGN
    builder.sign(signer, { path: inputPath }, { path: outputPath });

    const signed = await fs.readFile(outputPath);

    await fs.unlink(inputPath);
    await fs.unlink(outputPath);

    res.set({
      "Content-Type": mimeOf(file.originalname),
      "Content-Disposition": `attachment; filename="signed_${file.originalname}"`,
    });

    res.send(signed);
  } catch (err) {
    if (inputPath) try { await fs.unlink(inputPath); } catch {}
    if (outputPath) try { await fs.unlink(outputPath); } catch {}

    console.error("SIGN ERROR", err);
    res.status(500).json({ error: "Failed to sign asset", details: err.message });
  }
});

// =============================================================
// VALIDATE ENDPOINT
// =============================================================
app.post("/api/validate", handleFileUpload, async (req, res) => {
  let tempPath = null;

  try {
    const file = req.files?.[0];
    if (!file) return res.status(400).json({ error: "No file provided" });

    const timestamp = Date.now();
    const ext = extOf(file.originalname);

    tempPath = `${TEMP_DIR}/validate_${timestamp}${ext}`;
    await fs.writeFile(tempPath, file.buffer);

    const reader = await Reader.fromAsset({ path: tempPath });

    if (!reader) {
      await fs.unlink(tempPath);
      return res.status(404).json({
        error: "No C2PA manifest found",
      });
    }

    const store = reader.json();

    const validation = {
      isValid: true,
      hasManifest: true,
      isEmbedded: reader.isEmbedded(),
      remoteUrl: reader.remoteUrl(),
      validationStatus: store.validation_status,
    };

    await fs.unlink(tempPath);

    res.json({
      success: true,
      validation,
      manifestStore: store,
    });
  } catch (err) {
    if (tempPath) try { await fs.unlink(tempPath); } catch {}
    console.error("VALIDATE ERROR", err);

    res.status(500).json({
      error: "Failed to validate manifest",
      details: err.message,
    });
  }
});

// =============================================================
// HEALTH + ROOT
// =============================================================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.json({
    name: "C2PA API",
    version: "1.0.0",
    endpoints: {
      sign: "POST /api/sign",
      validate: "POST /api/validate",
      health: "GET /api/health",
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
