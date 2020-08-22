interface IDeviceRepository {
  /*
   * idGateWay is the id of the Gateway
   * device is the data that is added to the gateway
   */
  addDevice(idGateWay, device): any;

  //The Id of the device to remove
  removeDevice(idDevice): any;
}

export default IDeviceRepository;
