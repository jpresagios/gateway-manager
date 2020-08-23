import DIContainer from "./di-container";

import GateWayRepository from "./repositories/gateway-repository";
import DeviceRepository from "./repositories/device-repository";
import MongoDB from "./services/database-service";
import env from "./configs/env-config";
import Device from "./models/device.model";
import GateWay from "./models/gateways.model";

(async function () {
  const database = new MongoDB();
  await database.connectDatabase();

  await Device.deleteMany({});
  await GateWay.deleteMany({});

  const gateWayData = [
    {
      serialNumber: "ABCD",
      name: "GateWay 1",
      ipV4: "69.89.31.226",
    },
    {
      serialNumber: "zFe345",
      name: "GateWay 2",
      ipV4: "102.4.31.226",
    },
  ];
  const deviceData = [
    {
      uid: 1,
      vendor: "Vendor  1",
      status: "online",
    },
    {
      uid: 2,
      vendor: "Vendor  2",
      status: "offline",
    },
    {
      uid: 3,
      vendor: "Vendor  3",
      status: "offline",
    },
    {
      uid: 4,
      vendor: "Vendor  4",
      status: "online",
    },
    {
      uid: 5,
      vendor: "Vendor  5",
      status: "online",
    },
  ];

  const gateWayRepository = new GateWayRepository();
  const deviceRepository = new DeviceRepository();

  let gateWay = await gateWayRepository.insertGateWay(gateWayData[0]);

  for (let i = 0; i < 3; i++) {
    await deviceRepository.addDevice(gateWay._id, deviceData[i]);
  }

  gateWay = await gateWayRepository.insertGateWay(gateWayData[1]);

  for (let i = 0; i < gateWayData.length; i++) {
    await deviceRepository.addDevice(gateWay._id, deviceData[i]);
  }

  await database.disconnectDatabase();
})();
