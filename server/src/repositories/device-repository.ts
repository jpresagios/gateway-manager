import Device, { IDevice } from "../models/device.model";
import GateWay from "../models/gateways.model";
import IDeviceRepository from "../interfaces/idevice-repository";

import "reflect-metadata";
import { injectable } from "inversify";
import logger from "../services/logger-service";

@injectable()
export default class DeviceRepository implements IDeviceRepository {
  /*
   * Add a device to a gateway
   *
   * idGateWay: Id of the Gateway
   * deviceData: Data of the device to added
   */
  async addDevice(idGateWay, deviceData: IDevice): Promise<any> {
    try {
      const device: IDevice = new Device(deviceData);
      const resultDeviceDB = await device.save();

      const gateWay = await GateWay.findById(idGateWay);
      gateWay.devices.push(resultDeviceDB);
      gateWay.save();

      logger.info("Device successfully added to gateway ", idGateWay);

      return resultDeviceDB;
    } catch (error) {
      logger.error("Fails to added device to gateway", idGateWay);
    }
  }

  /*
   * Remove a device
   *
   * idDevice: Id of device to remove
   */
  async removeDevice(idDevice): Promise<any> {
    try {
      const device = await Device.findById(idDevice);
      const result = await device.remove();

      logger.info("Device successfully remove");

      return result;
    } catch (error) {
      logger.error("Fails to remove device", error);
    }
  }
}
