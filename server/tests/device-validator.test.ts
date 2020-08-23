import DIContainer from "../src/di-container";
import DeviceValidator from "../src/validations/device-validator";
import gateWayData from "./fake-data/gateway";
import deviceData from "./fake-data/device";

import {
  connect,
  clearDatabase,
  closeDatabase,
} from "./mongodb-test-enviroment";

import GateWay from "../src/models/gateways.model";
import GateWayRepository from "../src/repositories/gateway-repository";
import DeviceRepository from "../src/repositories/device-repository";
import { formatWithOptions } from "util";

let deviceValidator: DeviceValidator;
const gateWayRepository = new GateWayRepository();
const deviceRepository = new DeviceRepository();

beforeAll(async () => {
  await connect();
  deviceValidator = DIContainer.resolve<DeviceValidator>(DeviceValidator);
});

// Clear all test data after every test to have insolation database conditions
afterEach(async () => await clearDatabase());

// Finished to in-memory and closed resource
afterAll(async () => await closeDatabase());

describe("Device Validator", () => {
  test("Validate the validator returned true when the data is correct", async () => {
    const result = await deviceValidator.validate(deviceData[0]);
    expect(result).toBeTruthy();
  });

  test("Validate all error message are present when field are empty", async () => {
    const { errors, isValid } = await deviceValidator.validate({
      idGateWay: "",
      uid: "",
      status: "",
    });

    expect(isValid).toBeFalsy();
    expect(errors["idGateWay"]).toEqual("idGateWay field is required");
    expect(errors["uid"]).toEqual("uid field is required");
    expect(errors["status"]).toEqual("status field is required");
  });

  test("Validate field status  when is not provide", async () => {
    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    const { errors, isValid } = await deviceValidator.validate({
      idGateWay: gateWay._id,
      uid: 3,
      vendor: "Vendor  11",
    });

    expect(isValid).toBeFalsy();
    expect(errors["status"]).toEqual("status field is required");
  });

  test("Validate field status  when is empty", async () => {
    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    const { errors, isValid } = await deviceValidator.validate({
      idGateWay: gateWay._id,
      uid: 3,
      vendor: "Vendor  11",
      status: "",
    });

    expect(isValid).toBeFalsy();
    expect(errors["status"]).toEqual("status field is required");
  });

  test("Validate field uid  when is not provide", async () => {
    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    const { errors, isValid } = await deviceValidator.validate({
      idGateWay: gateWay._id,
      vendor: "Vendor  11",
    });

    expect(isValid).toBeFalsy();
    expect(errors["uid"]).toEqual("uid field is required");
  });

  test("Validate field uid  when is empty", async () => {
    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    const { errors, isValid } = await deviceValidator.validate({
      idGateWay: gateWay._id,
      uid: "",
      vendor: "Vendor  11",
    });

    expect(isValid).toBeFalsy();
    expect(errors["uid"]).toEqual("uid field is required");
  });

  test("Validate field idGateWay  when is not provide", async () => {
    const { errors, isValid } = await deviceValidator.validate({
      vendor: "Vendor  11",
    });

    expect(isValid).toBeFalsy();
    expect(errors["idGateWay"]).toEqual("idGateWay field is required");
  });

  test("Validate field idGateWay  when is empty", async () => {
    const { errors, isValid } = await deviceValidator.validate({
      idGateWay: "",
      uid: "",
      vendor: "Vendor  11",
    });

    expect(isValid).toBeFalsy();
    expect(errors["idGateWay"]).toEqual("idGateWay field is required");
  });

  test("Validate less equal 10 peripheral devices are allowed for a gateway", async () => {
    expect(deviceData.length).toEqual(10);

    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    for (let i = 0; i < deviceData.length; i++) {
      const device = {
        idGateWay: gateWay._id,
        ...deviceData[i],
      };

      const { isValid } = await deviceValidator.validate(device);

      expect(isValid).toBeTruthy();

      await deviceRepository.addDevice(gateWay._id, device);
    }
  });

  test("Validate no more that 10 peripheral devices are allowed for a gateway", async () => {
    const gateWayRepository = new GateWayRepository();

    expect(deviceData.length).toEqual(10);

    const gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

    for (let i = 0; i < deviceData.length; i++) {
      const device = {
        idGateWay: gateWay._id,
        ...deviceData[i],
      };

      const { isValid } = await deviceValidator.validate(device);

      expect(isValid).toBeTruthy();

      await deviceRepository.addDevice(gateWay._id, device);
    }

    const { errors, isValid } = await deviceValidator.validate({
      idGateWay: gateWay._id,
      uid: 3,
      vendor: "Vendor  11",
      status: "offline",
    });

    expect(isValid).toBeFalsy();
    expect(errors["deviceValidation"]).toEqual(
      "No more that 10 peripheral devices are allowed for a gateway"
    );
  });
});
