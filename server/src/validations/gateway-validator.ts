import Validator from "./validators";
import { TYPES } from "../types/types";
import { inject, injectable } from "inversify";
import IGateWayRepository from "../interfaces/igateway-repository";
import IValidator from "../interfaces/validators/ivalidator-interface";

@injectable()
export default class GateWayValidator extends Validator implements IValidator {
  private gateWayRepository: IGateWayRepository;

  constructor(
    @inject(TYPES.GateWayRepository)
    gateWayRepository: IGateWayRepository
  ) {
    super();
    this.gateWayRepository = gateWayRepository;
  }

  isUnique = async (value: string): Promise<boolean> => {
    const result = await this.gateWayRepository.getGateWayBySerialNumber(value);

    return result.length === 0;
  };

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  validate = async (data) => {
    const { serialNumber, name, ipV4 } = data;

    const errors = {};

    if (this.isEmpty(serialNumber)) {
      errors["serialNumber"] = "serialNumber field is required";
    } else {
      const isUniqueSerialNumber = await this.isUnique(serialNumber);

      if (!isUniqueSerialNumber)
        errors["serialNumber"] = "serialNumber must be unique";
    }

    if (this.isEmpty(name)) {
      errors["name"] = "name field is required";
    }

    if (this.isEmpty(ipV4)) {
      errors["ipV4"] = "ipV4 field is required";
    }

    if (ipV4 && !this.isIpV4(ipV4)) {
      errors["ipV4"] = "Required valid IpV4";
    }

    return {
      errors,
      isValid: this.isEmpty(errors),
    };
  };
}
