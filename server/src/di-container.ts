import { Container } from "inversify";
import { TYPES } from "./types/types";

//Contracts
import IGateWayRepository from "interfaces/igateway-repository";
import IDeviceRepository from "interfaces/idevice-repository";

//Repositories
import GateWayRepository from "./repositories/gateway-repository";
import DeviceRepository from "./repositories/device-repository";

//Controller
import GateWayController from "./controllers/gateway-controller";
import DeviceController from "./controllers/device-controller";

const DIContainer = new Container();

//Controllers
DIContainer.bind<GateWayController>(GateWayController).toSelf();

DIContainer.bind<DeviceController>(DeviceController).toSelf();

//Repositories
DIContainer.bind<IGateWayRepository>(TYPES.GateWayRepository).to(
  GateWayRepository
);

DIContainer.bind<IDeviceRepository>(TYPES.DeviceRepository).to(
  DeviceRepository
);

export default DIContainer;
