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
  async addDevice(idGateWay, deviceData): Promise<any> {
    const device: IDevice = new Device(deviceData);
    const resultDeviceDB = await device.save();

    await GateWay.findOneAndUpdate(
      { _id: idGateWay },
      { $push: { devices: resultDeviceDB } }
    );

    return resultDeviceDB;
  }

  /*
   * Remove a device
   *
   * idDevice: Id of device to remove
   */
  async removeDevice(idDevice): Promise<any> {
    const device = await Device.findById(idDevice);
    const result = await device.remove();

    return result;
  }
}
