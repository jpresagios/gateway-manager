import DIContainer from "../src/di-container";
import GateWayValidator from "../src/validations/gateway-validator";
import gateWayData from "./fake-data/gateway";
import {
  connect,
  clearDatabase,
  closeDatabase,
} from "./mongodb-test-enviroment";

let gateWayValidator: GateWayValidator;
beforeAll(async () => {
  await connect();
  gateWayValidator = DIContainer.resolve<GateWayValidator>(GateWayValidator);
});

// Clear all test data after every test to have insolation database conditions
afterEach(async () => await clearDatabase());

// Finished to in-memory and closed resource
afterAll(async () => await closeDatabase());

describe("GateWay Validator", () => {
  test("Validate the validator returned true when the data is correct", async () => {
    const result = await gateWayValidator.validate(gateWayData[0]);
    expect(result).toBeTruthy();
  });
});
