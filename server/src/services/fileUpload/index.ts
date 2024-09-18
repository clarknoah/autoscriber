import { Client } from 'minio';
import { env } from '../../config/globals';

// Initialize the MinIO client
export const fileUploadClient = new Client({
  endPoint: env.OBJECT_STORE_URL,
  port: env.OBJECT_STORE_PORT,
  useSSL: false, // Set to true if MinIO server uses SSL
  accessKey: env.OBJECT_STORE_ACCESS_KEY,
  secretKey: env.OBJECT_STORE_SECRET_KEY,
});

// Function to create a bucket
export async function createBucket(bucketName: string) {
  try {
    // Check if the bucket already exists
    const bucketExists = await fileUploadClient.bucketExists(bucketName);
    if (!bucketExists) {
      // Create the bucket if it does not exist
      await fileUploadClient.makeBucket(bucketName, 'us-east-1'); // Replace 'us-east-1' with your preferred region
      console.log(`Bucket '${bucketName}' created successfully.`);
    } else {
      console.log(`Bucket '${bucketName}' already exists.`);
    }
  } catch (error) {
    console.error('Error creating bucket:', error);
  }
}


export const generatePresignedUrl = async (objectName: string): Promise<string> => {
  try {
    // Generate a presigned URL valid for 15 minutes (900 seconds)
    const presignedUrl = await fileUploadClient.presignedPutObject(env.OBJECT_STORE_BUCKET, objectName, 900);
    return presignedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
};
