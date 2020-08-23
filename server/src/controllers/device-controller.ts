import { Request, Response, Router } from "express";
import IControllerBase from "../interfaces/icontroller-base-interface";
import IDeviceRepository from "../interfaces/idevice-repository";
import IValidator from "../interfaces/validators/ivalidator-interface";
import logger from "../services/logger-service";
import { TYPES } from "../types/types";
import "reflect-metadata";
import { inject, injectable } from "inversify";

@injectable()
export default class DeviceController implements IControllerBase {
  private prefix = "/device/";
  private router: Router = Router();
  private deviceRepository: IDeviceRepository;
  private deviceValidator: IValidator;

  constructor(
    @inject(TYPES.DeviceRepository)
    deviceRepository: IDeviceRepository,
    @inject(TYPES.DeviceValidator)
    deviceValidator: IValidator
  ) {
    this.deviceRepository = deviceRepository;
    this.deviceValidator = deviceValidator;

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

      const { errors, isValid } = await this.deviceValidator.validate({
        idGateWay,
        ...rest,
      });

      if (isValid) {
        const deviceResult = await this.deviceRepository.addDevice(
          idGateWay,
          rest
        );

        return res.status(200).json({
          data: deviceResult,
          success: true,
        });
      } else {
        logger.info("Error executing insert for device", errors);

        return res.status(400).json({
          errors,
          success: false,
        });
      }
    } catch (error) {
      logger.info("Fail to insert Device  ", error);

      return res.status(500).json({
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
