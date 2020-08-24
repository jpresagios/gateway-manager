import React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = (props) => {
  const { devices, onDelete, showDelete } = props;

  return (
    <ListGroup>
      {devices &&
        devices.map((device) => {
          return (
            <ListGroupItem key={device._id}>
              <DeviceItem
                showDelete={showDelete}
                device={device}
                onDelete={(e) => onDelete(e)}
              />
            </ListGroupItem>
          );
        })}
    </ListGroup>
  );
};

export default DeviceList;
