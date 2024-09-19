
import { config as dotConfig } from "dotenv";


dotConfig();

// Environment variables & sensitive data imported from .env file
let envConfig = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  OBJECT_STORE_URL: process.env.OBJECT_STORE_URL || "",
  OBJECT_STORE_PORT: Number(process.env.OBJECT_STORE_PORT) || 9001,
  OBJECT_STORE_ACCESS_KEY: process.env.OBJECT_STORE_ACCESS_KEY || "",
  OBJECT_STORE_SECRET_KEY: process.env.OBJECT_STORE_SECRET_KEY || "",
  OBJECT_STORE_BUCKET: process.env.OBJECT_STORE_BUCKET || "",
  OBJECT_STORE_PUBLIC_HOST: process.env.OBJECT_STORE_PUBLIC_HOST || "",
};




export const env = envConfig;
