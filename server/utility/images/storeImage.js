const Minio = require('minio');

async function setupMinioAndBucket() {
  // Creating a MinIO client
  const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: 'password',
  });

  // Bucket name for storing images
  const bucketName = 'image-bucket';

  try {
    // Checking if the bucket already exists
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      // Creating the bucket
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`Bucket "${bucketName}" created successfully.`);
    } else {
      console.log(`Bucket "${bucketName}" already exists.`);
    }
  } catch (error) {
    console.error('Error setting up bucket:', error);
  }

  minioClient.listBuckets((err, buckets) => {
    if (err) {
      return console.error('Error listing buckets:', err);
    }
    console.log('Buckets:');
    buckets.forEach(bucket => console.log(bucket.name));
  });
}

setupMinioAndBucket();
