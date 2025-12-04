import express from 'express';
import multer from 'multer';
import { Reader, Builder, LocalSigner, loadVerifyConfig, loadTrustConfig } from '@contentauth/c2pa-node';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

// Middleware to handle any file field name
const handleFileUpload = upload.any();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directories for temp files
const TEMP_DIR = path.join(__dirname, 'temp');
const KEYS_DIR = path.join(__dirname, 'keys');

// Ensure directories exist
await fs.mkdir(TEMP_DIR, { recursive: true });
await fs.mkdir(KEYS_DIR, { recursive: true });

// Configure C2PA to trust our test CA
try {
  const caCertPath = path.join(KEYS_DIR, 'ca_cert.pem');
  if (fsSync.existsSync(caCertPath)) {
    const caCertContent = fsSync.readFileSync(caCertPath, 'utf8');
    
    loadTrustConfig({
      verifyTrustList: false,
      trustAnchors: [caCertContent],
      allowedList: []
    });
    
    console.log('✅ C2PA trust configuration loaded (using custom CA)');
  } else {
    console.warn('⚠️  CA certificate not found. Please run certificate generation script.');
  }
  
  loadVerifyConfig({
    verifyAfterReading: true,
    verifyAfterSign: true,
    verifyTrust: true,
    ocspFetch: false,  // Disable OCSP for test certificates
    remoteManifestFetch: true
  });
} catch (error) {
  console.warn('⚠️  Could not load trust configuration:', error.message);
}

// Helper function to get file extension
function getFileExtension(filename) {
  return path.extname(filename).toLowerCase();
}

// Helper function to detect MIME type
function getMimeType(filename) {
  const ext = getFileExtension(filename);
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.pdf': 'application/pdf'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * @route POST /api/sign
 * @description Sign an asset with C2PA manifest
 */
app.post('/api/sign', handleFileUpload, async (req, res) => {
  let inputPath = null;
  let outputPath = null;

  try {
    // Get the first uploaded file
    const file = req.files && req.files.length > 0 ? req.files[0] : null;
    
    if (!file) {
      return res.status(400).json({ 
        error: 'No asset file provided',
        hint: 'Upload a file with any field name'
      });
    }

    const { title, creator, claimGenerator } = req.body;
    
    if (!title || !creator) {
      return res.status(400).json({ 
        error: 'Missing required fields: title and creator are required' 
      });
    }

    // Save uploaded file temporarily
    const timestamp = Date.now();
    const ext = getFileExtension(file.originalname);
    inputPath = path.join(TEMP_DIR, `input_${timestamp}${ext}`);
    outputPath = path.join(TEMP_DIR, `output_${timestamp}${ext}`);
    
    await fs.writeFile(inputPath, file.buffer);

    // Load certificate chain and private key
    const certificatePath = path.join(KEYS_DIR, 'certificate_chain.pem');  // Use chain
    const privateKeyPath = path.join(KEYS_DIR, 'private_key.pem');

    try {
      await fs.access(certificatePath);
      await fs.access(privateKeyPath);
    } catch (error) {
      return res.status(500).json({
        error: 'Certificate chain or private key not found',
        details: 'Please run the certificate generation script in the keys directory'
      });
    }

    // Read files synchronously to ensure proper Buffer type
    const certificateBuffer = fsSync.readFileSync(certificatePath);
    const privateKeyBuffer = fsSync.readFileSync(privateKeyPath);

    // Create a local signer (without timestamp service for self-signed certs)
    const signer = LocalSigner.newSigner(
      certificateBuffer,
      privateKeyBuffer,
      'es256',
      undefined  // No timestamp service for self-signed certificates
    );

    // Create the actions assertion data
    const actionsAssertion = {
      actions: [
        {
          action: 'c2pa.created',
          when: new Date().toISOString(),
          softwareAgent: claimGenerator || 'C2PA Node API/1.0'
        }
      ]
    };

    // Create the CreativeWork assertion data
    const creativeWorkAssertion = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "author": [
        {
          "@type": "Person",
          "name": creator
        }
      ]
    };

    // Create manifest definition
    const manifestDefinition = {
      claim_generator: claimGenerator || 'C2PA Node API/1.0',
      title: title,
      assertions: [
        {
          label: 'c2pa.actions',
          data: actionsAssertion
        },
        {
          label: 'stds.schema-org.CreativeWork',
          data: creativeWorkAssertion
        }
      ]
    };

    // Add custom assertions if provided
    if (req.body.assertions) {
      try {
        const customAssertions = JSON.parse(req.body.assertions);
        if (Array.isArray(customAssertions)) {
          manifestDefinition.assertions.push(...customAssertions);
        }
      } catch (error) {
        console.warn('Invalid custom assertions:', error.message);
      }
    }

    console.log(`Signing: ${file.originalname} | Title: ${title} | Creator: ${creator}`);

    // Create builder from manifest definition (pass object, not string)
    const builder = Builder.withJson(manifestDefinition);

    // Sign the manifest - pass asset objects with path property
    builder.sign(
      signer,
      { path: inputPath },
      { path: outputPath }
    );

    // Read the signed file
    const signedAsset = await fs.readFile(outputPath);

    // Clean up temp files
    await fs.unlink(inputPath);
    await fs.unlink(outputPath);

    // Send the signed asset
    res.set({
      'Content-Type': getMimeType(file.originalname),
      'Content-Disposition': `attachment; filename="signed_${file.originalname}"`,
      'X-C2PA-Signed': 'true'
    });
    
    res.send(signedAsset);

  } catch (error) {
    console.error('Error signing asset:', error);
    
    // Clean up temp files on error
    if (inputPath) {
      try { await fs.unlink(inputPath); } catch {}
    }
    if (outputPath) {
      try { await fs.unlink(outputPath); } catch {}
    }

    res.status(500).json({
      error: 'Failed to sign asset',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


/**
 * @route POST /api/validate
 * @description Validate C2PA manifest from an asset
 */
app.post('/api/validate', handleFileUpload, async (req, res) => {
  let tempPath = null;

  try {
    const file = req.files && req.files.length > 0 ? req.files[0] : null;
    
    if (!file) {
      return res.status(400).json({ 
        error: 'No asset file provided'
      });
    }

    const timestamp = Date.now();
    const ext = getFileExtension(file.originalname);
    tempPath = path.join(TEMP_DIR, `validate_${timestamp}${ext}`);
    
    await fs.writeFile(tempPath, file.buffer);

    // Read the manifest from the asset (pass as object with path)
    const reader = await Reader.fromAsset({ path: tempPath });

    if (!reader) {
      return res.status(400).json({
        error: true,
        details: 'This asset does not contain C2PA provenance data'
      });
    }

    const manifestStore = reader.json();

    console.log("manifestStore", manifestStore);

    const validation = {
      isValid: true,
      hasManifest: true,
      isEmbedded: reader.isEmbedded(),
      remoteUrl: reader.remoteUrl(),
      errors: [],
      warnings: []
    };

    // Extract validation status from manifest store
    if (manifestStore.validation_status) {
      validation.validationStatus = manifestStore.validation_status;
    }

    // Get active manifest info from the manifest store instead of getActive()
    const activeManifestLabel = manifestStore.active_manifest;
    let manifestInfo = null;
    
    if (activeManifestLabel && manifestStore.manifests) {
      const activeManifest = manifestStore.manifests[activeManifestLabel];
      if (activeManifest) {
        manifestInfo = {
          title: activeManifest.title,
          claimGenerator: activeManifest.claim_generator,
          format: activeManifest.format,
          instanceId: activeManifest.instance_id,
          assertions: Object.keys(activeManifest.assertions || {}).length
        };
      }
    }

    await fs.unlink(tempPath);

    res.json({
      success: true,
      validation,
      manifest: manifestInfo || {
        title: 'Unknown',
        claimGenerator: 'Unknown',
        assertions: 0
      }
    });

  } catch (error) {
    console.error('Error validating manifest:', error);
    
    if (tempPath) {
      try { await fs.unlink(tempPath); } catch {}
    }

    if (error.message.includes('no C2PA data') || error.message.includes('not found')) {
      return res.status(404).json({
        error: 'No C2PA manifest found',
        details: 'This asset does not contain C2PA provenance data'
      });
    }

    res.status(500).json({
      error: 'Failed to validate manifest',
      details: error.message
    });
  }
});

/**
 * @route GET /api/health
 * @description Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'C2PA Signing & Reading API'
  });
});

/**
 * @route GET /
 * @description API documentation
 */
app.get('/', (req, res) => {
  res.json({
    name: 'C2PA Signing & Reading API',
    version: '1.0.0',
    endpoints: {
      'POST /api/sign': {
        description: 'Sign an asset with C2PA manifest',
        body: {
          file: 'file (required)',
          title: 'string (required)',
          creator: 'string (required)',
          claimGenerator: 'string (optional)',
          assertions: 'JSON string of custom assertions (optional)'
        }
      },
      'POST /api/read': {
        description: 'Read C2PA manifest from an asset',
        body: {
          file: 'file (required)'
        }
      },
      'POST /api/validate': {
        description: 'Validate C2PA manifest from an asset',
        body: {
          file: 'file (required)'
        }
      },
      'GET /api/health': {
        description: 'Health check endpoint'
      }
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        details: 'Maximum file size is 50MB'
      });
    }
    return res.status(400).json({
      error: 'File upload error',
      details: error.message
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    details: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ C2PA API server running on port ${PORT}`);
  console.log(`📖 API docs: http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

export default app;