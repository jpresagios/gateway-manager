import React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = (props) => {
  const { devices, onDelete } = props;

  return (
    <ListGroup>
      {devices &&
        devices.map((device) => {
          return (
            <ListGroupItem>
              <DeviceItem device={device} onDelete={(e) => onDelete(e)} />
            </ListGroupItem>
          );
        })}
    </ListGroup>
  );
};

export default DeviceList;
