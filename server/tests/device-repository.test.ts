import {
  connect,
  clearDatabase,
  closeDatabase,
} from "./mongodb-test-enviroment";

import gateWayData from "./fake-data/gateway";
import deviceData from "./fake-data/device";
import Device from "../src/models/device.model";
import GateWayRepository from "../src/repositories/gateway-repository";
import DeviceRepository from "../src/repositories/device-repository";

const gateWayRepository = new GateWayRepository();
const deviceRepository = new DeviceRepository();

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await connect());

// Clear all test data after every test to have insolation database conditions
afterEach(async () => await clearDatabase());

// Finished to in-memory and closed resource
afterAll(async () => await closeDatabase());

describe("Device repository", () => {
  test("Method addDevice inserted device successfully", async () => {
    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    for (let i = 0; i < deviceData.length; i++) {
      await deviceRepository.addDevice(gateWay._id, deviceData[i]);
    }

    const countDevice: number = await Device.count({});

    expect(countDevice).toEqual(deviceData.length);
  });

  test("Method removeDevice deleted device successfully", async () => {
    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    const device = await deviceRepository.addDevice(gateWay._id, deviceData[0]);

    const numberDeviceInserted = await Device.count({});
    expect(numberDeviceInserted).toEqual(1);

    await deviceRepository.removeDevice(device._id);
    const numberDeviceAfterDelete = await Device.count({});

    expect(numberDeviceAfterDelete).toEqual(0);
  });
});
