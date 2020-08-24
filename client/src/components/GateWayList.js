import React, { Component } from "react";
import { Collapse, CardBody, Card, CardHeader } from "reactstrap";
import { gateWayList } from "../api/gateway";
import DeviceList from "./Device/DeviceList";
import { Link } from "react-router-dom";

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

    return (
      <>
        <Link to="/gateway/add" className="btn btn-primary mb-3">
          Create GateWay
        </Link>

        {gateways.map((gateway, index) => {
          return (
            <Card style={{ marginBottom: "1rem" }} key={index}>
              <CardHeader onClick={this.toggle} data-event={index}>
                {gateway.serialNumber}

                <Link
                  to={"/gateway/detail/" + gateway._id}
                  className="float-right"
                >
                  Detail
                </Link>
              </CardHeader>
              <Collapse isOpen={collapse === index}>
                <CardBody>
                  <DeviceList devices={gateway.devices} key={gateway._id} />
                </CardBody>
              </Collapse>
            </Card>
          );
        })}
      </>
    );
  }
}

export default GateWayList;
