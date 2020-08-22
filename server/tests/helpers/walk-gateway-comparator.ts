import GateWay from "../../src/models/gateways.model";

export const gateWayComparator = async (
  gateWays: Array<any>
): Promise<boolean> => {
  for (const gateWay of gateWays) {
    const result = await GateWay.findOne({
      serialNumber: gateWay.serialNumber,
      name: gateWay.name,
      ipV4: gateWay.ipV4,
    });

    if (!result) return false;
  }

  return true;
};
