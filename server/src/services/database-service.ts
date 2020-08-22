import { connect, connection } from "mongoose";
import env from "../configs/env-config";
import IDatabase from "../interfaces/idatabase-interface";
import logger from "../services/logger-service";

export default class MongoDB implements IDatabase {
  public async connectDatabase(): Promise<any> {
    await connect(env.HOST_DATABASE_URL)
      .then(() => {
        logger.info("Successfully database init");
      })
      .catch((error) => {
        logger.error("Database downo", error);
      });
  }

  public async disconnectDatabase(): Promise<any> {
    connection
      .close()
      .then(() => {
        logger.info("Successfully database close");
      })
      .catch((error) => {
        logger.error("Database error during close", error);
      });
  }
}
