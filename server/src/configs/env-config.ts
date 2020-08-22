import * as dotenv from "dotenv";

dotenv.config({});

export default {
  HOST: process.env.HOST,
  SERVER_PORT: parseInt(process.env.SERVER_PORT),
  HOST_DATABASE_URL: process.env.HOST_DATABASE_URL,
};
