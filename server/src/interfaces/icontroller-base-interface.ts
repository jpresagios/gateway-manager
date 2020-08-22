import { Router } from "express";

export default interface IControllerBase {
  initRoutes(): void; //Used to register all routes of controller.
  getRouter(): Router; //Return the router express for a controller
  getPrefixRoute(): string; //Return the prefix url for all endpoint in a controller
}
