const minioClient = require('../S3');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.array('files', 10), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        const uploadedFiles = req.files;
        const uploadPromises = uploadedFiles.map(async (file) => {
            const fileMimeType = file.mimetype; 
            let bucketName;

            // Determining the bucket based on the file type (image or video)
            if (fileMimeType.startsWith('image/')) {
                bucketName = 'image-bucket';
            } else if (fileMimeType.startsWith('video/')) {
                bucketName = 'video-bucket';
            } else {
                return res.status(400).send('Unsupported file type.');
            }

            const imageStream = file.buffer; 
            const objectName = file.originalname;

            await minioClient.putObject(bucketName, objectName, imageStream, imageStream.length);
        });

        await Promise.all(uploadPromises);

        return res.status(200).send('Files uploaded successfully.');
    } catch (error) {
        console.error('Error uploading files:', error);
        return res.status(500).send('Failed to upload files.');
    }
});

module.exports = router;
