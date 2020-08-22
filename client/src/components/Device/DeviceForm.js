import React, { useState } from "react";
import { Button } from "reactstrap";
import { createDevice } from "../../api/devices";
import { AvForm, AvField } from "availity-reactstrap-validation";

const DeviceForm = (props) => {
  const [uid, setUid] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = (e) => {
    const idGateWay = props.match.params.id;

    const newGateWay = {
      uid,
      vendor,
      status,
      idGateWay,
    };

    createDevice(newGateWay).then((_) => {
      props.history.push("/gateway/detail/" + idGateWay);
    });
  };

  return (
    <AvForm onSubmit={onSubmit}>
      <h1 className="mb-4">Create Devkce</h1>
      <AvField
        name="uid"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        label="Uid"
        type="number"
        validate={{
          required: { value: true, errorMessage: "Uid is required" },
        }}
      />
      <AvField
        name="vendor"
        label="Vendor"
        type="text"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
        validate={{
          required: { value: true, errorMessage: "Vendor is required" },
        }}
      />

      <AvField
        name="status"
        label="Status"
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        validate={{
          required: { value: true, errorMessage: "Status is required" },
        }}
      />
      <Button color="primary">Save</Button>
    </AvForm>
  );
};

export default DeviceForm;
