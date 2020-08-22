import { Request, Response, Router } from "express";
import IControllerBase from "../interfaces/icontroller-base-interface";
import IGateWayRepository from "../interfaces/igateway-repository";
import IValidator from "../interfaces/validators/ivalidator-interface";
import logger from "../services/logger-service";
import { TYPES } from "../types/types";
import "reflect-metadata";
import { inject, injectable } from "inversify";

@injectable()
export default class GateWayController implements IControllerBase {
  private prefix = "/gateway/";
  private router: Router = Router();
  private gateWayRepository: IGateWayRepository;
  private gateWayValidator: IValidator;

  constructor(
    @inject(TYPES.GateWayRepository)
    gateWayRepository: IGateWayRepository,
    @inject(TYPES.GateWayValidator)
    gateWayValidator: IValidator
  ) {
    this.gateWayRepository = gateWayRepository;
    this.gateWayValidator = gateWayValidator;

    this.initRoutes();
  }

  getRouter = (): Router => {
    return this.router;
  };

  getPrefixRoute = (): string => {
    return this.prefix;
  };

  initRoutes = (): void => {
    this.router.post("/insert", this.insertGateWay);

    this.router.get("/all", this.allGateWay);

    this.router.get("/detail/:id", this.detailGateway);
  };

  insertGateWay = async (req: Request, res: Response): Promise<Response> => {
    const gateWayData = req.body;

    logger.info("Executing insert for gateWay", gateWayData);

    try {
      const { errors, isValid } = await this.gateWayValidator.validate(
        gateWayData
      );

      if (isValid) {
        const gateWayResult = await this.gateWayRepository.insertGateWay(
          gateWayData
        );

        return res.status(200).json({
          data: gateWayResult,
          success: true,
        });
      } else {
        logger.error("Error executing insert for gateWay", errors);

        return res.status(400).json({
          errors,
          success: false,
        });
      }
    } catch (error) {
      logger.error("Fail to insert GateWay  ", error);

      return res.status(500).json({
        status: 500,
        success: false,
      });
    }
  };

  allGateWay = async (req: Request, res: Response): Promise<Response> => {
    try {
      logger.info("Retrieved all GateWay");
      const gateWayResult = await this.gateWayRepository.allGateWay();

      return res.status(200).json({
        data: gateWayResult,
        success: true,
      });
    } catch (error) {
      logger.error("Fail to insert GateWay  ", error);

      return res.status(500).json({
        success: false,
      });
    }
  };

  detailGateway = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const gateWayResult = await this.gateWayRepository.detailGateWay(id);

      return res.status(200).json({
        data: gateWayResult,
        success: true,
      });
    } catch (error) {
      logger.error("Fail to get details for GateWay", error);

      return res.status(500).json({
        success: false,
      });
    }
  };
}
