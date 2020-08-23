import Validator from "../src/validations/validators";
import ipV4InvalidAddress from "./fake-data/invalidIPV4-address";
import ipV4validAddress from "./fake-data/validIPV4-address";
const validator = new Validator();

describe("Device Validator", () => {
  test("Validate Method isIpV4 returned true for valid IpV4 address", async () => {
    for (let i = 0; i < ipV4validAddress.length; i++) {
      const address = ipV4validAddress[i];
      expect(validator.isIpV4(address)).toBeTruthy();
    }
  });

  test("Validate Method isIpV4 returned false for invalid IpV4 address", async () => {
    for (let i = 0; i < ipV4InvalidAddress.length; i++) {
      const address = ipV4InvalidAddress[i];
      expect(validator.isIpV4(address)).toBeFalsy();
    }
  });

  test("Validate Method isEmpty returned true for empty values", async () => {
    expect(validator.isEmpty("")).toBeTruthy();

    expect(validator.isEmpty({})).toBeTruthy();
  });

  test("Validate Method isEmpty returned false when value is provided", async () => {
    expect(validator.isEmpty("test")).toBeFalsy();

    expect(validator.isEmpty(23)).toBeFalsy();
  });
});
