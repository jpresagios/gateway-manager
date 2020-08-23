import Validator from "./validators";
import { TYPES } from "../types/types";
import { injectable, inject } from "inversify";
import IValidator from "../interfaces/validators/ivalidator-interface";
import IGateWayRepository from "../interfaces/igateway-repository";

@injectable()
export default class DeviceValidator extends Validator implements IValidator {
  private gateWayRepository: IGateWayRepository;

  constructor(
    @inject(TYPES.GateWayRepository)
    gateWayRepository: IGateWayRepository
  ) {
    super();
    this.gateWayRepository = gateWayRepository;
  }

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  validate = async (data) => {
    const { uid, status, idGateWay } = data;

    let numberDevice = 0;

    if (idGateWay) {
      numberDevice = await this.gateWayRepository.getNumberDevice(idGateWay);
    }

    const errors = {};

    if (this.isEmpty(uid)) {
      errors["uid"] = "uid field is required";
    }

    if (this.isEmpty(status)) {
      errors["status"] = "status field is required";
    }

    if (this.isEmpty(idGateWay)) {
      errors["idGateWay"] = "idGateWay field is required";
    } else {
      if (numberDevice === 10) {
        errors["deviceValidation"] =
          "No more that 10 peripheral devices are allowed for a gateway";
      }
    }

    return {
      errors,
      isValid: this.isEmpty(errors),
    };
  };
}
