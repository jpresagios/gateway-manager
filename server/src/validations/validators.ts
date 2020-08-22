import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export default class Validator {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  isEmpty = (value): boolean => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  isIpV4 = (value: string): boolean => {
    const ipV4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipV4Regex.test(value);
  };
}
