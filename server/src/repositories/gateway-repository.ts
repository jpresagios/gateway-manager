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
    const gateWay: IGateWay = new GateWay(gateWayData);
    const resulteFromDB = await gateWay.save();

    logger.info("GateWay successfully inserted");

    return resulteFromDB;
  }

  /*
   * Retrieved all gateways
   */
  async allGateWay(): Promise<any> {
    const allGateWay = await GateWay.find().populate("devices");

    logger.info("Retrieve all gateWays");

    return allGateWay;
  }

  /*
   * Delete a gatewaut
   *
   * idGateWay: id of the gateway to get detail
   */
  async detailGateWay(idGateWay): Promise<any> {
    const gateWay = await GateWay.findById(idGateWay).populate("devices");

    logger.info("Retrieved detail gateway");

    return gateWay;
  }

  async getGateWayBySerialNumber(serialNumber): Promise<any> {
    const gateWay = await GateWay.find({ serialNumber });

    return gateWay;
  }
}
