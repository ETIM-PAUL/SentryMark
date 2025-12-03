# C2PA Backend API

A Node.js backend API for signing assets with C2PA (Coalition for Content Provenance and Authenticity) manifests and reading/validating signed manifests.

## Features

- ✅ Sign assets (images, audio, video, PDFs, GIFs) with C2PA manifests
- ✅ Read and validate C2PA manifests from signed assets
- ✅ Support for multiple file formats (JPEG, PNG, GIF, WebP, MP4, MP3, WAV, PDF)
- ✅ RESTful API endpoints
- ✅ File upload handling with size limits
- ✅ Comprehensive error handling

## Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create the necessary directories:

```bash
mkdir keys temp
```

3. **Configure Signing Credentials:**

You need a certificate and private key for signing. Place them in the `keys` directory:

- `keys/certificate.pem` - Your X.509 certificate
- `keys/private_key.pem` - Your private key

### Generating Test Credentials (Development Only)

For development/testing, you can generate self-signed credentials:

```bash
# Generate private key
openssl ecparam -genkey -name prime256v1 -out keys/private_key.pem

# Generate self-signed certificate
openssl req -new -x509 -key keys/private_key.pem -out keys/certificate.pem -days 365
```

**Note:** For production, use certificates from a trusted Certificate Authority.

4. (Optional) Configure timestamp authority:

Set the `TSA_URL` environment variable if you want timestamping:

```bash
export TSA_URL=https://timestamp.example.com
```

## Usage

### Start the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on port 3000 (or the port specified in `PORT` environment variable).

## API Endpoints

### 1. Sign an Asset

**Endpoint:** `POST /api/sign`

**Description:** Sign an asset with a C2PA manifest

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `asset` (file, required): The asset file to sign
  - `title` (string, required): Title of the asset
  - `creator` (string, required): Creator name
  - `claimGenerator` (string, optional): Claim generator identifier
  - `assertions` (JSON string, optional): Additional custom assertions

**Example using curl:**

```bash
curl -X POST http://localhost:3000/api/sign \
  -F "asset=@image.jpg" \
  -F "title=My Photo" \
  -F "creator=John Doe" \
  -F "claimGenerator=MyApp/1.0" \
  --output signed_image.jpg
```

**Example using JavaScript/Fetch:**

```javascript
const formData = new FormData();
formData.append('asset', fileInput.files[0]);
formData.append('title', 'My Photo');
formData.append('creator', 'John Doe');
formData.append('claimGenerator', 'MyApp/1.0');

const response = await fetch('http://localhost:3000/api/sign', {
  method: 'POST',
  body: formData
});

const signedAsset = await response.blob();
```

**Response:** The signed asset file (binary)

---

### 2. Read Manifest

**Endpoint:** `POST /api/read`

**Description:** Read and extract C2PA manifest from a signed asset

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `asset` (file, required): The signed asset file

**Example using curl:**

```bash
curl -X POST http://localhost:3000/api/read \
  -F "asset=@signed_image.jpg"
```

**Response:**

```json
{
  "success": true,
  "file": {
    "name": "signed_image.jpg",
    "size": 123456,
    "mimeType": "image/jpeg"
  },
  "manifest": {
    "isEmbedded": true,
    "remoteUrl": null,
    "activeManifest": {
      "title": "My Photo",
      "claim_generator": "MyApp/1.0",
      "assertions": [...]
    },
    "manifestStore": {...}
  }
}
```

---

### 3. Validate Manifest

**Endpoint:** `POST /api/validate`

**Description:** Validate C2PA manifest from an asset

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `asset` (file, required): The signed asset file

**Example using curl:**

```bash
curl -X POST http://localhost:3000/api/validate \
  -F "asset=@signed_image.jpg"
```

**Response:**

```json
{
  "success": true,
  "validation": {
    "isValid": true,
    "hasManifest": true,
    "isEmbedded": true,
    "remoteUrl": null,
    "errors": [],
    "warnings": []
  },
  "manifest": {
    "title": "My Photo",
    "claimGenerator": "MyApp/1.0",
    "assertions": 2
  }
}
```

---

### 4. Health Check

**Endpoint:** `GET /api/health`

**Description:** Check if the API is running

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-12-03T10:00:00.000Z",
  "service": "C2PA Signing & Reading API"
}
```

---

### 5. API Documentation

**Endpoint:** `GET /`

**Description:** Get API documentation

## Supported File Formats

- **Images:** JPEG, PNG, GIF, WebP
- **Video:** MP4, MOV, AVI
- **Audio:** MP3, WAV
- **Documents:** PDF

## Configuration

### Environment Variables

- `PORT` - Server port (default: 3000)
- `TSA_URL` - Timestamp Authority URL (optional)

### File Size Limits

Default maximum file size: 50MB

To change this, modify the multer configuration in `server.js`:

```javascript
const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});
```

## Custom Assertions

You can add custom assertions when signing assets. Pass them as a JSON string in the `assertions` field:

```javascript
const customAssertions = [
  {
    label: 'com.example.custom',
    data: {
      customField: 'value'
    }
  }
];

formData.append('assertions', JSON.stringify(customAssertions));
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (missing required fields)
- `404` - No C2PA manifest found
- `500` - Internal server error

Error response format:

```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Security Considerations

1. **Certificate Management:** Store certificates and private keys securely. Use environment variables or secret management services (AWS Secrets Manager, Azure Key Vault, etc.) in production.

2. **File Upload Validation:** The API validates file types based on extensions. Consider adding more robust validation for production use.

3. **Rate Limiting:** Consider adding rate limiting to prevent abuse.

4. **HTTPS:** Use HTTPS in production to encrypt data in transit.

5. **Authentication:** Add authentication/authorization for production deployments.

## Production Deployment

For production deployment:

1. Use a proper certificate from a trusted CA
2. Set up HTTPS with a reverse proxy (nginx, Apache)
3. Add authentication/authorization
4. Implement rate limiting
5. Use a process manager (PM2, systemd)
6. Set up logging and monitoring
7. Configure secure storage for certificates (e.g., AWS Secrets Manager)

Example PM2 configuration:

```bash
pm2 start server.js --name c2pa-api
```

## Troubleshooting

### "Certificate or private key not found"

Make sure you have `certificate.pem` and `private_key.pem` in the `keys` directory.

### "No C2PA manifest found"

The uploaded asset doesn't contain C2PA data. Make sure you're uploading a signed asset.

### Module import errors

Ensure you're using Node.js >= 18.0.0 and that the `package.json` has `"type": "module"`.

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.