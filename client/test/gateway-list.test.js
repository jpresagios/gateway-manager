import GateWayList from "../src/components/GateWayList";

import React from "react";

import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { gateWayList } from "../src/api/gateway";
import gatewayData from "./fake-data/gateway";

jest.mock("../src/api/gateway");

gateWayList.mockResolvedValue(gatewayData);

afterEach(cleanup);

describe("GateWayList component tests", () => {
  test("Snapshot for GateWayList pass successfully", () => {
    const { asFragment } = render(
      <Router>
        <GateWayList />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Validate API to consume Gateway List is called once", () => {
    expect(gateWayList).toHaveBeenCalledTimes(1);
  });
});
