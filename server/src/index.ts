import app from "./configs/app-config";

import DIContainer from "./di-container";

import GateWayController from "./controllers/gateway-controller";
import DeviceController from "./controllers/device-controller";

const gateWayController: GateWayController = DIContainer.resolve<
  GateWayController
>(GateWayController);

const deviceController: DeviceController = DIContainer.resolve<
  DeviceController
>(DeviceController);

(async function () {
  app.routes([gateWayController, deviceController]);
  await app.setupDatabase();
  app.listen();
})();
