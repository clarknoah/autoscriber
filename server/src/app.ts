import "reflect-metadata";
import startServer from "./server/index";
import { env } from "config/globals";
import "module-alias/register";

// Startup
(async function main() {
  try {
    const port = +env.PORT;
    const app = await startServer();
    app.listen(port, "0.0.0.0", () => {
      console.info(`🚀 Server ready at ${port}`);
    });
    app.setTimeout(600000);
  } catch (err) {
    console.error(err);
  }
})();
