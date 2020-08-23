import * as request from "supertest";
import app from "../src/configs/app-config";

import {
  connect,
  clearDatabase,
  closeDatabase,
} from "./mongodb-test-enviroment";

import gatewayData from "./fake-data/gateway";
import GateWay from "../src/models/gateways.model";

import DIContainer from "../src/di-container";
import GateWayController from "../src/controllers/gateway-controller";

beforeAll(async () => {
  // Resolve controllers
  const gateWayController: GateWayController = DIContainer.resolve<
    GateWayController
  >(GateWayController);

  app.routes([gateWayController]);
  await connect();
});

// Clear all test data after every test to have insolation database conditions
afterEach(async () => await clearDatabase());

// Finished to in-memory and closed resource
afterAll(async () => await closeDatabase());

describe("API Testing Gateway Endpoints", () => {
  test("Endpoint gateway/all return 0 Gateways when called before inserted Gateways", async () => {
    const result = await request(app.getApp()).get("/gateway/all");

    const { data } = JSON.parse(result.text);

    expect(data.length).toEqual(0);
  });

  test("Endpoint gateway/all returned all GateWay inserted", async () => {
    for (let i = 0; i < gatewayData.length; i++) {
      const result = await request(app.getApp())
        .post("/gateway/insert")
        .send(gatewayData[i]);

      expect(result.status).toBe(200);

      const { success } = JSON.parse(result.text);
      expect(success).toBeTruthy();
    }

    const result = await request(app.getApp()).get("/gateway/all");
    expect(result.status).toBe(200);

    const { success, data } = JSON.parse(result.text);

    expect(success).toBeTruthy();
    expect(data.length).toEqual(gatewayData.length);
  });

  test("Endpoint gateway/insert return required error when IpV4 is Invalid and status code === 400", async () => {
    const result = await request(app.getApp()).post("/gateway/insert").send({
      serialNumber: "",
      ipV4: "24.54.257.1",
    });

    expect(result.status).toBe(400);

    const { success, errors } = JSON.parse(result.text);
    expect(success).toBeFalsy();
    expect(errors["ipV4"]).toEqual("Required valid IpV4");
  });

  test("Endpoint gateway/insert return all required error message when serialNumber is not unique and status code === 400", async () => {
    let result = await request(app.getApp()).post("/gateway/insert").send({
      serialNumber: "AVGG1",
      name: "GateWay 1",
      ipV4: "2.89.31.4",
    });

    expect(result.status).toBe(200);

    const { success } = JSON.parse(result.text);
    expect(success).toBeTruthy();

    result = await request(app.getApp()).post("/gateway/insert").send({
      serialNumber: "AVGG1",
      name: "GateWay 122222",
      ipV4: "3.89.31.1",
    });

    expect(result.status).toBe(400);

    const { errors } = JSON.parse(result.text);

    expect(errors["serialNumber"]).toEqual("serialNumber must be unique");
  });

  test("Endpoint gateway/detail/:id return detail for GateWay and status code === 200", async () => {
    const gateWay = {
      serialNumber: "AVGG1",
      name: "GateWay 1",
      ipV4: "2.89.31.4",
    };

    let result = await request(app.getApp())
      .post("/gateway/insert")
      .send(gateWay);

    expect(result.status).toBe(200);

    const { success, data } = JSON.parse(result.text);
    expect(success).toBeTruthy();

    result = await request(app.getApp()).get(`/gateway/detail/${data._id}`);

    expect(result.status).toBe(200);

    const {
      data: { name, ipV4, serialNumber },
    } = JSON.parse(result.text);

    expect(name).toEqual(gateWay.name);
    expect(ipV4).toEqual(gateWay.ipV4);
    expect(serialNumber).toEqual(gateWay.serialNumber);
  });

  test("Endpoint gateway/all returned correct status code === 2000", async () => {
    const result = await request(app.getApp()).get("/gateway/all");
    expect(result.status).toBe(200);
  });

  test("Endpoint gateway/all returned correct success value", async () => {
    const result = await request(app.getApp()).get("/gateway/all");

    const { success } = JSON.parse(result.text);

    expect(success).toBeTruthy();
  });

  test("Endpoint gateway/insert inserted GateWays successfully and status code === 200", async () => {
    for (let i = 0; i < gatewayData.length; i++) {
      const result = await request(app.getApp())
        .post("/gateway/insert")
        .send(gatewayData[i]);

      expect(result.status).toBe(200);
      const { success } = JSON.parse(result.text);
      expect(success).toBeTruthy();
    }
    const numberGateWayOnDatabase = await GateWay.count({});
    expect(numberGateWayOnDatabase).toEqual(gatewayData.length);
  });

  test("Endpoint gateway/insert return required error when name is empty and status code === 400", async () => {
    const result = await request(app.getApp()).post("/gateway/insert").send({
      serialNumber: "AVGG1",
      name: "",
      ipV4: "69.89.31.226",
    });

    expect(result.status).toBe(400);

    const { success, errors } = JSON.parse(result.text);
    expect(success).toBeFalsy();
    expect(errors["name"]).toEqual("name field is required");
  });

  test("Endpoint gateway/insert return required error when ipV4 is empty and status code === 400", async () => {
    const result = await request(app.getApp()).post("/gateway/insert").send({
      serialNumber: "AVGG1",
      ipV4: "",
    });

    expect(result.status).toBe(400);

    const { success, errors } = JSON.parse(result.text);
    expect(success).toBeFalsy();
    expect(errors["ipV4"]).toEqual("ipV4 field is required");
  });

  test("Endpoint gateway/insert return required error when serialNumber is empty and status code === 400", async () => {
    const result = await request(app.getApp()).post("/gateway/insert").send({
      serialNumber: "",
    });

    expect(result.status).toBe(400);

    const { success, errors } = JSON.parse(result.text);
    expect(success).toBeFalsy();
    expect(errors["serialNumber"]).toEqual("serialNumber field is required");
  });
});
