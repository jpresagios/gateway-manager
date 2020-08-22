import React, { useState } from "react";

import { ListGroup, ListGroupItem } from "reactstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = (props) => {
  const { devices } = props;

  return (
    <ListGroup>
      {devices.map((device) => {
        return (
          <ListGroupItem>
            <DeviceItem device={device} />
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default DeviceList;
