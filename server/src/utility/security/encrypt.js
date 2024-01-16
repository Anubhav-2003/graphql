const fs = require('fs');
const crypto = require('crypto');

function encryptFileWithMetadata(inputFilePath, originalFileName, originalMimeType) {
    return new Promise((resolve, reject) => {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const input = fs.createReadStream(inputFilePath);
        const chunks = [];

        input.on('data', (chunk) => {
        chunks.push(chunk);
        });

        input.on('end', () => {
        const fileBuffer = Buffer.concat(chunks);
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(fileBuffer);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        const metadata = JSON.stringify({
            originalFileName,
            originalMimeType,
        });

        const encryptedWithMetadata = Buffer.concat([Buffer.from(metadata), encrypted]);

        resolve({
            encryptedData: encryptedWithMetadata,
            key,
            iv,
        });
        });

        input.on('error', (err) => {
        reject(`Encryption failed: ${err}`);
        });
    });
  }

module.exports = encryptFileWithMetadata
