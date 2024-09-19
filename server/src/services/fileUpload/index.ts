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
      console.info(`Bucket '${bucketName}' created successfully.`);
    }
  } catch (error) {
    console.error('Error creating bucket:', error);
  }
}


export const generatePresignedUrl = async (
  objectName: string,
  method: 'GET' | 'PUT' = 'PUT',
  expirySeconds: number = 3600 // Default to 1 hour
): Promise<string> => {
  try {
    if (method === 'PUT') {
      return await fileUploadClient.presignedPutObject(
        env.OBJECT_STORE_BUCKET,
        objectName,
        expirySeconds
      );
    } else if (method === 'GET') {
      return await fileUploadClient.presignedGetObject(
        env.OBJECT_STORE_BUCKET,
        objectName,
        expirySeconds
      );
    } else {
      throw new Error(`Unsupported method: ${method}`);
    }

    
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
};