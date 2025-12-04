import express from 'express';
import multer from 'multer';
import { Reader, Builder, LocalSigner } from '@contentauth/c2pa-node';
import fs from 'fs/promises';
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
    // Accept any field name for the file
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
 * @body {file} asset/file - The asset file to sign (any field name accepted)
 * @body {string} title - Title of the asset
 * @body {string} creator - Creator name
 * @body {string} claimGenerator - Claim generator identifier
 * @body {object} assertions - Additional assertions (optional)
 */
app.post('/api/sign', handleFileUpload, async (req, res) => {
  let inputPath = null;
  let outputPath = null;

  try {
    // Get the first uploaded file regardless of field name
    const file = req.files && req.files.length > 0 ? req.files[0] : null;
    
    if (!file) {
      return res.status(400).json({ 
        error: 'No asset file provided',
        hint: 'Please upload a file with any field name (e.g., "asset", "file", "image", etc.)'
      });
    }

    // Use the uploaded file
    req.file = file;

    const { title, creator, claimGenerator } = req.body;
    
    if (!title || !creator) {
      return res.status(400).json({ 
        error: 'Missing required fields: title and creator are required' 
      });
    }

    // Save uploaded file temporarily
    const timestamp = Date.now();
    const ext = getFileExtension(req.file.originalname);
    inputPath = path.join(TEMP_DIR, `input_${timestamp}${ext}`);
    outputPath = path.join(TEMP_DIR, `output_${timestamp}${ext}`);
    
    await fs.writeFile(inputPath, req.file.buffer);

    // Load certificate and private key
    // In production, these should be securely stored (e.g., AWS Secrets Manager, Azure Key Vault)
    const certificatePath = path.join(KEYS_DIR, 'certificate.pem');
    const privateKeyPath = path.join(KEYS_DIR, 'private_key.pem');

    // Check if certificate and key exist
    try {
      await fs.access(certificatePath);
      await fs.access(privateKeyPath);
    } catch (error) {
      return res.status(500).json({
        error: 'Certificate or private key not found. Please configure signing credentials.',
        details: 'Place certificate.pem and private_key.pem in the keys directory'
      });
    }

    const certificate = await fs.readFile(certificatePath);
    const privateKey = await fs.readFile(privateKeyPath);

    // Create a local signer
    const signer = LocalSigner.newSigner(
      certificate,
      privateKey,
      'es256', // or 'ps256', 'ps384', 'ps512', 'es384', 'es512', 'ed25519'
      process.env.TSA_URL // Optional timestamp authority URL
    );

    // Create manifest definition
    const manifestDefinition = {
      claim_generator: claimGenerator || 'C2PA Node API/1.0',
      title: title,
      assertions: [
        {
          label: 'c2pa.actions',
          data: {
            actions: [
              {
                action: 'c2pa.created',
                when: new Date().toISOString(),
                softwareAgent: claimGenerator || 'C2PA Node API/1.0'
              }
            ]
          }
        },
        {
          label: 'stds.schema-org.CreativeWork',
          data: {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            author: [
              {
                '@type': 'Person',
                name: creator
              }
            ]
          }
        }
      ]
    };

    // Add custom assertions if provided
    if (req.body.assertions) {
      try {
        const customAssertions = JSON.parse(req.body.assertions);
        manifestDefinition.assertions.push(...customAssertions);
      } catch (error) {
        console.warn('Invalid custom assertions format:', error.message);
      }
    }

    // Create manifest definition JSON
    const manifestJson = {
      claim_generator: manifestDefinition.claim_generator,
      title: manifestDefinition.title,
      assertions: manifestDefinition.assertions
    };

    // Create builder from JSON string - Builder.withJson expects a JSON string
    const builder = Builder.withJson(JSON.stringify(manifestJson));
    
    // Sign the manifest
    await builder.sign(signer, inputPath, outputPath);

    // Read the signed file
    const signedAsset = await fs.readFile(outputPath);

    // Clean up temp files
    await fs.unlink(inputPath);
    await fs.unlink(outputPath);

    // Send the signed asset back
    res.set({
      'Content-Type': getMimeType(req.file.originalname),
      'Content-Disposition': `attachment; filename="signed_${req.file.originalname}"`,
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
      details: error.message
    });
  }
});

/**
 * @route POST /api/read
 * @description Read and validate C2PA manifest from an asset
 * @body {file} asset/file - The asset file to read (any field name accepted)
 */
app.post('/api/read', handleFileUpload, async (req, res) => {
  let tempPath = null;

  try {
    // Get the first uploaded file regardless of field name
    const file = req.files && req.files.length > 0 ? req.files[0] : null;
    
    if (!file) {
      return res.status(400).json({ 
        error: 'No asset file provided',
        hint: 'Please upload a file with any field name (e.g., "asset", "file", "image", etc.)'
      });
    }

    // Use the uploaded file
    req.file = file;

    // Save uploaded file temporarily
    const timestamp = Date.now();
    const ext = getFileExtension(req.file.originalname);
    tempPath = path.join(TEMP_DIR, `read_${timestamp}${ext}`);
    
    await fs.writeFile(tempPath, req.file.buffer);

    // Read the manifest from the asset
    const reader = await Reader.fromAsset(tempPath);

    // Get manifest store as JSON
    const manifestStore = JSON.parse(reader.json());

    // Get active manifest
    const activeManifest = reader.getActive();

    // Check if manifest is embedded or remote
    const isEmbedded = reader.isEmbedded();
    const remoteUrl = reader.remoteUrl();

    // Prepare response
    const response = {
      success: true,
      file: {
        name: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype
      },
      manifest: {
        isEmbedded,
        remoteUrl,
        activeManifest,
        manifestStore
      }
    };

    // Clean up temp file
    await fs.unlink(tempPath);

    res.json(response);

  } catch (error) {
    console.error('Error reading manifest:', error);
    
    // Clean up temp file on error
    if (tempPath) {
      try { await fs.unlink(tempPath); } catch {}
    }

    // Check if it's because the file has no C2PA data
    if (error.message.includes('no C2PA data') || error.message.includes('not found')) {
      return res.status(404).json({
        error: 'No C2PA manifest found',
        details: 'This asset does not contain C2PA provenance data'
      });
    }

    res.status(500).json({
      error: 'Failed to read manifest',
      details: error.message
    });
  }
});

/**
 * @route POST /api/validate
 * @description Validate C2PA manifest from an asset with detailed trust information
 * @body {file} asset/file - The asset file to validate (any field name accepted)
 */
app.post('/api/validate', handleFileUpload, async (req, res) => {
  let tempPath = null;

  try {
    // Get the first uploaded file regardless of field name
    const file = req.files && req.files.length > 0 ? req.files[0] : null;
    
    if (!file) {
      return res.status(400).json({ 
        error: 'No asset file provided',
        hint: 'Please upload a file with any field name (e.g., "asset", "file", "image", etc.)'
      });
    }

    // Use the uploaded file
    req.file = file;

    const timestamp = Date.now();
    const ext = getFileExtension(req.file.originalname);
    tempPath = path.join(TEMP_DIR, `validate_${timestamp}${ext}`);
    
    await fs.writeFile(tempPath, req.file.buffer);

    const reader = await Reader.fromAsset(tempPath);
    const manifestStore = JSON.parse(reader.json());
    const activeManifest = reader.getActive();

    // Extract validation information
    const validation = {
      isValid: true,
      hasManifest: true,
      isEmbedded: reader.isEmbedded(),
      remoteUrl: reader.remoteUrl(),
      errors: [],
      warnings: []
    };

    // Check for validation status in manifest
    if (manifestStore.validation_status) {
      validation.validationStatus = manifestStore.validation_status;
    }

    // Clean up
    await fs.unlink(tempPath);

    res.json({
      success: true,
      validation,
      manifest: {
        title: activeManifest?.title,
        claimGenerator: activeManifest?.claim_generator,
        assertions: activeManifest?.assertions?.length || 0
      }
    });

  } catch (error) {
    console.error('Error validating manifest:', error);
    
    if (tempPath) {
      try { await fs.unlink(tempPath); } catch {}
    }

    res.status(500).json({
      error: 'Failed to validate manifest',
      details: error.message
    });
  }
});

/**
 * @route GET /api/health
 * @description Health check endpoint
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
          asset: 'file (required)',
          title: 'string (required)',
          creator: 'string (required)',
          claimGenerator: 'string (optional)',
          assertions: 'JSON string of custom assertions (optional)'
        }
      },
      'POST /api/read': {
        description: 'Read C2PA manifest from an asset',
        body: {
          asset: 'file (required)'
        }
      },
      'POST /api/validate': {
        description: 'Validate C2PA manifest from an asset',
        body: {
          asset: 'file (required)'
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
  
  // Handle multer errors specifically
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        details: 'Maximum file size is 50MB'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: 'Unexpected file field',
        details: 'Please use any field name for file upload (e.g., "asset", "file", "image")',
        hint: 'Make sure you are sending the file in the request body'
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
  console.log(`C2PA API server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} for API documentation`);
});

export default app;