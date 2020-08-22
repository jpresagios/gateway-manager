import React, { useState } from "react";

import { ListGroup, ListGroupItem } from "reactstrap";

const DeviceItem = (props) => {
  const { device } = props;
  return (
    <div>
      <ul>
        <li>uid: {device.uid}</li>
        <li>vendor: {device.vendor}</li>
        <li>createAt: {device.createAt}</li>
        <li>status: {device.status}</li>
      </ul>
    </div>
  );
};

export default DeviceItem;
