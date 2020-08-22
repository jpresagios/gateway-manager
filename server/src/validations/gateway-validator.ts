import { isEmpty, isIpV4 } from "./validators";

const validateGateWay = (data) => {
  const { serialNumber, name, ipV4 } = data;

  const errors = {};

  if (isEmpty(serialNumber)) {
    errors["serialNumber"] = "serialNumber field is required";
  }

  if (isEmpty(name)) {
    errors["name"] = "name field is required";
  }

  if (isEmpty(ipV4)) {
    errors["ipV4"] = "ipV4 field is required";
  }

  if (ipV4 && !isIpV4(ipV4)) {
    errors["ipV4"] = "Required valid IpV4";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateGateWay;
