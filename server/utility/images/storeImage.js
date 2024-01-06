const Minio = require('minio');
const minioClient = require('../../src/S3');

async function createBucket(bucketName) {

  try {
    // Checking if the bucket already exists
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      // Creating the bucket
      await minioClient.makeBucket(bucketName, 'us-east-1');
    } 
  } catch (error) {
    console.error('Error setting up bucket:', error);
  }

  // minioClient.listBuckets((err, buckets) => {
  //   if (err) {
  //     return console.error('Error listing buckets:', err);
  //   }
  //   console.log('Buckets:');
  //   buckets.forEach(bucket => console.log(bucket.name));
  // });
}

module.exports = createBucket
