interface IGateWayRepository {
  // data contain the data of the gateway to insert
  insertGateWay(data): any;

  // Used gateWayId to retrieve a GateWay
  detailGateWay(idGateWay);

  // Retrieve all Gateway
  allGateWay();

  // GateWay by serie number
  getGateWayBySerialNumber(serialNumber);

  // Number of devices associated to a gateway
  getNumberDevice(idGateWay);
}

export default IGateWayRepository;
