import { Request, Response, Router } from "express";
import IControllerBase from "../interfaces/icontroller-base-interface";
import IDeviceRepository from "../interfaces/idevice-repository";
import logger from "../services/logger-service";
import { TYPES } from "../types/types";
import "reflect-metadata";
import { inject, injectable } from "inversify";

@injectable()
export default class DeviceController implements IControllerBase {
  private prefix = "/device/";
  private router: Router = Router();
  private deviceRepository: IDeviceRepository;

  constructor(
    @inject(TYPES.DeviceRepository)
    deviceRepository: IDeviceRepository
  ) {
    this.deviceRepository = deviceRepository;

    this.initRoutes();
  }

  getRouter = (): Router => {
    return this.router;
  };

  getPrefixRoute = (): string => {
    return this.prefix;
  };

  initRoutes = (): void => {
    this.router.post("/add", this.addDevice);

    this.router.delete("/remove/:id", this.removeDevice);
  };

  addDevice = async (req: Request, res: Response): Promise<Response> => {
    const { idGateWay, ...rest } = req.body;

    try {
      logger.info("Executing add device", req.body);

      const deviceResult = await this.deviceRepository.addDevice(
        idGateWay,
        rest
      );

      return res.status(200).json({
        status: 200,
        data: deviceResult,
        success: true,
      });
    } catch (error) {
      logger.error("Fail to insert Device  ", error);

      return res.status(500).json({
        status: 500,
        success: false,
      });
    }
  };

  removeDevice = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const deviceResult = await this.deviceRepository.removeDevice(id);

      return res.status(200).json({
        status: 200,
        success: true,
        data: deviceResult,
      });
    } catch (error) {
      logger.error("Fail to insert Device  ", error);

      return res.status(500).json({
        status: 500,
        success: false,
      });
    }
  };
}
