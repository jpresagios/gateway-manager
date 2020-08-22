import GateWay, { IGateWay } from "../models/gateways.model";
import IGateWayRepository from "../interfaces/igateway-repository";

import "reflect-metadata";
import { injectable } from "inversify";
import logger from "../services/logger-service";

@injectable()
export default class GateWayRepository implements IGateWayRepository {
  /*
   * Insert a new GateWay
   *
   * gateWayData: Data of the gateway to insert
   */
  async insertGateWay(gateWayData): Promise<any> {
    try {
      const gateWay: IGateWay = new GateWay(gateWayData);
      const resulteFromDB = await gateWay.save();

      logger.info("GateWay successfully inserted");

      return resulteFromDB;
    } catch (error) {
      logger.error("Fails to insert gateway", error);
    }
  }

  /*
   * Retrieved all gateways
   */
  async allGateWay(): Promise<any> {
    try {
      const allGateWay = await GateWay.find().populate("devices");

      logger.info("Retrieve all gateWays");

      return allGateWay;
    } catch (error) {
      logger.error("Fails to retrieved gateways", error);
    }
  }

  /*
   * Delete a gatewaut
   *
   * idGateWay: id of the gateway to get detail
   */
  async detailGateWay(idGateWay): Promise<any> {
    try {
      const gateWay = await GateWay.findById(idGateWay).populate("devices");

      logger.info("Retrieved detail gateway");

      return gateWay;
    } catch (error) {
      logger.error("Fails to retrieve detail gateway", error);
    }
  }
}
