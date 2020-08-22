import Validator from "./validators";
import { injectable } from "inversify";
import IValidator from "../interfaces/validators/ivalidator-interface";

@injectable()
export default class DeviceValidator extends Validator implements IValidator {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  validate = async (data) => {
    const { uid, status, idGateWay } = data;

    const errors = {};

    if (this.isEmpty(uid)) {
      errors["uid"] = "uid field is required";
    }

    if (this.isEmpty(status)) {
      errors["status"] = "status field is required";
    }

    if (this.isEmpty(idGateWay)) {
      errors["idGateWay"] = "idGateWay field is required";
    }

    return {
      errors,
      isValid: this.isEmpty(errors),
    };
  };
}
