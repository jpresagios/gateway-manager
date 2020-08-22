import {
  connect,
  clearDatabase,
  closeDatabase,
} from "./mongodb-test-enviroment";
import gateWayData from "./fake-data/gateway";

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await connect());

// Clear all test data after every test to have insolation database conditions
afterEach(async () => await clearDatabase());

// Finished to in-memory and closed resource
afterAll(async () => await closeDatabase());

import GateWay from "../src/models/gateways.model";
import GateWayRepository from "../src/repositories/gateway-repository";

describe("GateWay Repository", () => {
  test("Method insertGateWay Successfully insert GateWays on Database", async () => {
    const gateWayRepository = new GateWayRepository();

    for (let i = 0; i < gateWayData.length; i++) {
      await gateWayRepository.insertGateWay(gateWayData[i]);
    }

    const countGateWays: number = await GateWay.count({});

    expect(countGateWays).toEqual(gateWayData.length);
  }, 9000);

  test("Method allGateWay successfully retrieved all GateWays", async () => {
    const gateWayRepository = new GateWayRepository();

    for (let i = 0; i < gateWayData.length; i++) {
      await gateWayRepository.insertGateWay(gateWayData[i]);
    }

    const countGateWays = await gateWayRepository.allGateWay();

    expect(countGateWays.length).toEqual(gateWayData.length);
  }, 9000);

  test("Compare allGateWay result with all GateWay inserted using deep comparation (field by field)", async () => {
    const gateWayRepository = new GateWayRepository();

    for (let i = 0; i < gateWayData.length; i++) {
      await gateWayRepository.insertGateWay(gateWayData[i]);
    }

    const countGateWays = await gateWayRepository.allGateWay();

    expect(countGateWays.length).toEqual(gateWayData.length);
  }, 9000);
});
