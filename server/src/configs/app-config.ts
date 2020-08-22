import App from "../app";

import * as bodyParser from "body-parser";
import env from "../configs/env-config";

import MongoDB from "../services/database-service";

import * as cors from "cors";

const app = new App({
  host: env.HOST,
  httpPort: env.SERVER_PORT,
  database: new MongoDB(),
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors(),
  ],
});
export default app;
