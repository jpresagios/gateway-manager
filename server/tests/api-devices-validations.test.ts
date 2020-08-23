import * as request from "supertest";
import app from "../src/configs/app-config";

import {
  connect,
  clearDatabase,
  closeDatabase,
} from "./mongodb-test-enviroment";

import gatewayData from "./fake-data/gateway";
import deviceData from "./fake-data/device";

import Device from "../src/models/device.model";

import DIContainer from "../src/di-container";
import DeviceController from "../src/controllers/device-controller";

import GateWayRepository from "../src/repositories/gateway-repository";

const gateWayRepository = new GateWayRepository();

beforeAll(async () => {
  // Resolve controllers
  const deviceController: DeviceController = DIContainer.resolve<
    DeviceController
  >(DeviceController);

  app.routes([deviceController]);
  await connect();
});

// Clear all test data after every test to have insolation database conditions
afterEach(async () => await clearDatabase());

// Finished to in-memory and closed resource
afterAll(async () => await closeDatabase());

describe("API Testing Device Endpoints", () => {
  test("Endpoint device/add Successfully insert new Device and return status code === 200", async () => {
    const numberDeviceBefore = await Device.count({});
    expect(numberDeviceBefore).toEqual(0);

    const resultGateWay = await gateWayRepository.insertGateWay(gatewayData[0]);

    const device = {
      idGateWay: resultGateWay._id,
      uid: 1,
      vendor: "Vendor  1",
      status: "online",
    };

    const result = await request(app.getApp()).post("/device/add").send(device);

    const {
      data: { uid, vendor, status },
      success,
    } = JSON.parse(result.text);

    expect(result.status).toEqual(200);
    expect(success).toBeTruthy();

    const numberDevice = await Device.count({});
    expect(numberDevice).toEqual(1);

    expect(uid).toEqual(device.uid);
    expect(vendor).toEqual(device.vendor);
    expect(status).toEqual(device.status);
  });

  test("Endpoint device/add  return error message when status is empty or not present and status code === 400", async () => {
    const resultGateWay = await gateWayRepository.insertGateWay(gatewayData[0]);

    const device = {
      idGateWay: resultGateWay._id,
      uid: 1,
      vendor: "Vendor  1",
      status: "",
    };

    let result = await request(app.getApp()).post("/device/add").send(device);

    let { errors, success } = JSON.parse(result.text);

    expect(result.status).toEqual(400);
    expect(success).toBeFalsy();

    expect(errors["status"]).toEqual("status field is required");

    //Validate when status is not provide the condition are the same that when status is empty
    const deviceWithOutStatus = {
      idGateWay: resultGateWay._id,
      uid: 1,
      vendor: "Vendor  1",
    };

    result = await request(app.getApp())
      .post("/device/add")
      .send(deviceWithOutStatus);

    errors = JSON.parse(result.text).errors;
    success = JSON.parse(result.text).success;

    expect(result.status).toEqual(400);
    expect(success).toBeFalsy();

    expect(errors["status"]).toEqual("status field is required");
  });

  test("Endpoint device/add  return error message when uid is empty or not present and status code === 400", async () => {
    const resultGateWay = await gateWayRepository.insertGateWay(gatewayData[0]);

    const device = {
      idGateWay: resultGateWay._id,
      uid: "",
      vendor: "Vendor  1",
      status: "offline",
    };

    let result = await request(app.getApp()).post("/device/add").send(device);

    let { errors, success } = JSON.parse(result.text);

    expect(result.status).toEqual(400);
    expect(success).toBeFalsy();

    expect(errors["uid"]).toEqual("uid field is required");

    //Validate when uid is not provide the condition are the same that when status is empty
    const deviceWithOutUid = {
      idGateWay: resultGateWay._id,
      vendor: "Vendor  1",
      status: "offline",
    };

    result = await request(app.getApp())
      .post("/device/add")
      .send(deviceWithOutUid);

    errors = JSON.parse(result.text).errors;
    success = JSON.parse(result.text).success;

    expect(result.status).toEqual(400);
    expect(success).toBeFalsy();

    expect(errors["uid"]).toEqual("uid field is required");
  });

  test("Endpoint device/add return Correct message error when inserted more thant 10 peripheral devices", async () => {
    const resultGateWay = await gateWayRepository.insertGateWay(gatewayData[0]);

    expect(deviceData.length).toEqual(10);

    for (let i = 0; i < deviceData.length; i++) {
      const result = await request(app.getApp())
        .post("/device/add")
        .send({
          idGateWay: resultGateWay._id,
          ...deviceData[i],
        });

      expect(result.status).toEqual(200);
      const { success } = JSON.parse(result.text);
      expect(success).toBeTruthy();
    }

    const result = await request(app.getApp())
      .post("/device/add")
      .send({
        idGateWay: resultGateWay._id,
        ...deviceData[4],
      });

    expect(result.status).toEqual(400);
    const { errors, success } = JSON.parse(result.text);
    expect(success).toBeFalsy();

    expect(errors["deviceValidation"]).toEqual(
      "No more that 10 peripheral devices are allowed for a gateway"
    );
  });

  test("Endpoint device/remove successfully remove Device", async () => {
    const resultGateWay = await gateWayRepository.insertGateWay(gatewayData[0]);

    const device = {
      idGateWay: resultGateWay._id,
      uid: 1,
      vendor: "Vendor  1",
      status: "online",
    };

    let result = await request(app.getApp()).post("/device/add").send(device);

    const { data } = JSON.parse(result.text);
    let { success } = JSON.parse(result.text);

    expect(result.status).toEqual(200);
    expect(success).toBeTruthy();

    const numberDeviceBeforeRemove = await Device.count({});
    expect(numberDeviceBeforeRemove).toEqual(1);

    result = await request(app.getApp())
      .delete(`/device/remove/${data._id}`)
      .send(device);

    success = JSON.parse(result.text).success;
    expect(result.status).toEqual(200);
    expect(success).toBeTruthy();

    const numberDeviceAfterRemove = await Device.count({});
    expect(numberDeviceAfterRemove).toEqual(0);
  });
});
