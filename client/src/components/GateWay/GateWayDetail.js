import React, { useEffect, useState } from "react";
import { detailGateWay } from "../../api/gateway";
import { deleteDevice } from "../../api/devices";
import { Link } from "react-router-dom";

import {
  Collapse,
  CardBody,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import DeviceList from "../Device/DeviceList";

const GateWayDetail = (props) => {
  const [gateway, setGateWay] = useState({});

  useEffect(() => {
    handleFetchGateWay(props.match.params.id);
  }, []);

  const handleFetchGateWay = (idGateWay) => {
    detailGateWay(idGateWay).then((res) => {
      const { data } = res;
      setGateWay(data);
    });
  };

  const handleDelete = (idDevice) => {
    deleteDevice(idDevice).then((res) => {
      handleFetchGateWay(props.match.params.id);
    });
  };

  return (
    <Card style={{ marginBottom: "1rem" }} key={gateway._id}>
      <CardHeader data-event={gateway._id}>
        <h4>Gateway</h4>
        <ListGroup>
          <ListGroupItem>
            <b>Serial Number:</b> {gateway.serialNumber}
          </ListGroupItem>

          <ListGroupItem>
            <b>Name:</b> {gateway.name}
          </ListGroupItem>

          <ListGroupItem>
            <b>ipV4:</b> {gateway.ipV4}
          </ListGroupItem>
        </ListGroup>
      </CardHeader>
      <Collapse isOpen="true">
        <CardBody>
          <h4>Devices</h4>
          <Link
            to={"/device/add/" + gateway._id}
            className="btn btn-primary mb-3"
          >
            Add device
          </Link>
          <DeviceList
            devices={gateway.devices}
            key={gateway._id}
            showDelete={true}
            onDelete={(idDevice) => handleDelete(idDevice)}
          />
        </CardBody>
      </Collapse>
    </Card>
  );
};

export default GateWayDetail;
