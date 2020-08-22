import React, { Component } from "react";
import { Collapse, CardBody, Card, CardHeader, Button } from "reactstrap";
import { gateWayList } from "../api/gateway";
import DeviceList from "./Device/DeviceList";

class GateWayList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: 0, gateways: [] };
  }

  componentDidMount() {
    gateWayList().then((res) => {
      const { data } = res;
      this.setState({
        gateways: data,
      });
    });
  }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({
      collapse: this.state.collapse === Number(event) ? 0 : Number(event),
    });
  }

  render() {
    const { gateways, collapse } = this.state;

    console.log(gateways);
    return (
      <div className="container">
        <h3 className="page-header">List gateways</h3>
        {gateways.map((gateway, index) => {
          return (
            <Card style={{ marginBottom: "1rem" }} key={index}>
              <CardHeader onClick={this.toggle} data-event={index}>
                {gateway.serialNumber}
              </CardHeader>
              <Collapse isOpen={collapse === index}>
                <CardBody>
                  <DeviceList devices={gateway.devices} key={gateway._id} />
                </CardBody>
              </Collapse>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default GateWayList;
