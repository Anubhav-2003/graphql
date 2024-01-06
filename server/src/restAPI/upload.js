const createBucket = require('../../utility/images/storeImage');
const minioClient = require('../S3');
const express = require('express')
const multer = require('multer')

const router = express.Router()

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const bucketName = 'image-bucket';
    createBucket(bucketName)

    try {
      const imageStream = await convertToBlob(req.file.path); // Converting uploaded file to Blob
      const objectName = req.file.originalname;
  
      // Store the image in the MinIO bucket
      await minioClient.putObject(bucketName, objectName, imageStream, imageStream.length);
  
      return res.status(200).send('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).send('Failed to upload file.');
    }
  });
  
  // Function to convert file to Blob
  async function convertToBlob(filePath) {
    const fs = require('fs');
    const fileData = fs.readFileSync(filePath);
    return fileData;
  }

module.exports = router