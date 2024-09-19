import { createServer } from "http";
import express from "express";
import { createBucket } from "../services/fileUpload";
import { logger } from "../util/logger";
import initializeDb from "./db";
import { env } from "../config/globals";
import initializeStatic from "./static";

import initializeApolloServer from "./apollo";


export default async function startServer() {
 const orm = await initializeDb();
  const app = express();

  const httpServer = createServer(app);

  
  await initializeApolloServer(httpServer, app, orm);
  
  await initializeStatic(app);

  await createBucket(env.OBJECT_STORE_BUCKET);



  // @ts-expect-error
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json(err);
  });

  return httpServer;
}
