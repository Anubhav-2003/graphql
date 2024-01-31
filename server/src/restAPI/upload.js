const minioClient = require('../S3');
const express = require('express');
const multer = require('multer');
const StaticFile = require('../utility/database/models/staticfiles')
const User = require('../utility/database/models/user')
const generateUniqueIdentifier = require('../utility/uniqueIdentifier')

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.array('files', 10), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        //Finding user who uploaded the static files.
        const userId = req.headers.id;
        if (!userId) {
            return res.status(400).send('User ID not provided in headers.');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

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

            const fileStream = file.buffer; 
            const fileId = generateUniqueIdentifier();
            // Creating Reference for in-house, key management solution.
            const kmsOptions = {
                'Content-Type': fileMimeType,
                'x-amz-server-side-encryption': 'aws:kms',
                'x-amz-server-side-encryption-aws-kms-key-id': 'transit/upload-key',
                'x-amz-server-side-encryption-context': 'key1=value1,key2=value2',
            };

            await minioClient.putObject(bucketName, fileId, fileStream, fileStream.length, kmsOptions);

            const staticFile = new StaticFile({
                fileId: fileId,
                mimeType: fileMimeType,
            });

            await staticFile.save()

            //Adding reference of file added to user model
            user.uploadedFiles.push(staticFile._id);
            await user.save()
        });

        await Promise.all(uploadPromises);

        return res.status(200).send('Upload successfull.');
    } catch (error) {
        console.error('Error uploading files:', error);
        return res.status(500).send('Failed to upload files.');
    }
});

module.exports = router;
