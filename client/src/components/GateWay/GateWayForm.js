import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import { createGateWay } from "../../api/gateway";
import { AvForm, AvField } from "availity-reactstrap-validation";

const GateWayForm = (props) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [ipV4, setIpV4] = useState("");
  const [
    validationUniqueSerialNumber,
    setValidationUniqueSerialNumber,
  ] = useState("");

  const onSubmit = (e) => {
    const newGateWay = {
      serialNumber,
      name,
      ipV4,
    };

    createGateWay(newGateWay)
      .then((_) => {
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response.status === 400 && serialNumber) {
          const {
            data: {
              errors: { serialNumber },
            },
          } = error.response;

          setValidationUniqueSerialNumber(serialNumber);
        }
      });
  };

  return (
    <AvForm onSubmit={onSubmit}>
      <h1 className="mb-4">Create Gateway</h1>

      {validationUniqueSerialNumber && (
        <Alert color="danger">{validationUniqueSerialNumber}</Alert>
      )}
      <AvField
        name="serialNumber"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
        label="Serial Number"
        type="text"
        validate={{
          required: { value: true, errorMessage: "Serial Number is required" },
        }}
      />
      <AvField
        name="name"
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        validate={{
          required: { value: true, errorMessage: "Name is required" },
        }}
      />

      <AvField
        name="ipV4"
        label="IpV4"
        type="text"
        value={ipV4}
        onChange={(e) => setIpV4(e.target.value)}
        validate={{
          required: { value: true, errorMessage: "ipV4 is required" },
          pattern: {
            value:
              "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
            errorMessage: "Your ipV4 must be a valid IpV4 address",
          },
        }}
      />
      <Button color="primary">Submit</Button>
    </AvForm>
  );
};

export default GateWayForm;
