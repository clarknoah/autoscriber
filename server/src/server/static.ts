import { Express } from "express";
import serveStatic from "express-static-gzip";
import { join } from "path";

export const clientBuildPath = join(__dirname, "../../../client/build");

export default function initializeStatic(app: Express) {
  app.use(
    serveStatic(clientBuildPath, {
      enableBrotli: true,
      orderPreference: ["br"],
    })
  );
}
