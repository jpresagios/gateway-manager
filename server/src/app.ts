import * as express from "express";
import { Application } from "express";
import IControllerBase from "./interfaces/icontroller-base-interface";
import logger from "./services/logger-service";
import IDatabase from "./interfaces/idatabase-interface";

import * as http from "http";

//Represent the App API and their dependencies
class App {
  public app: Application;
  public host: string;
  public httpPort: number;
  public database: IDatabase;

  constructor(appInit: {
    host: string;
    httpPort: number;
    middleWares: Array<any>;
    controllers?: Array<IControllerBase>;
    database: IDatabase;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.httpPort = appInit.httpPort;
    this.database = appInit.database;

    this.middlewares(appInit.middleWares);
    if (appInit.controllers) this.routes(appInit.controllers);
  }

  public async setupDatabase(): Promise<any> {
    await this.database.connectDatabase();
  }

  private middlewares(middleWares: Array<any>): void {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  public routes(controllers: Array<IControllerBase>): void {
    controllers.forEach((controller) => {
      this.app.use(controller.getPrefixRoute(), controller.getRouter());
    });
  }

  public listen(): void {
    const httpServer = http.createServer(this.app);

    httpServer.listen(this.httpPort, () =>
      logger.info(
        `Gateway Service listening on  http://${this.host}:${this.httpPort}`
      )
    );
  }

  public getApp(): Application {
    return this.app;
  }
}

export default App;
