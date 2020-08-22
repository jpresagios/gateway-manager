import { Request, Response, Router } from "express";
import IControllerBase from "../interfaces/icontroller-base-interface";
import IGateWayRepository from "../interfaces/igateway-repository";
import logger from "../services/logger-service";
import { TYPES } from "../types/types";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import validateGateWay from "../validations/gateway-validator";

@injectable()
export default class GateWayController implements IControllerBase {
  private prefix = "/gateway/";
  private router: Router = Router();
  private gateWayRepository: IGateWayRepository;

  constructor(
    @inject(TYPES.GateWayRepository)
    gateWayRepository: IGateWayRepository
  ) {
    this.gateWayRepository = gateWayRepository;

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

    try {
      logger.info("Executing insert for gateWay", gateWayData);

      const { errors, isValid } = validateGateWay(gateWayData);

      if (isValid) {
        const gateWayResult = await this.gateWayRepository.insertGateWay(
          gateWayData
        );

        return res.status(200).json({
          errors: errors,
          data: gateWayResult,
          success: true,
        });
      } else {
        return res.status(400).json({
          data: errors,
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
