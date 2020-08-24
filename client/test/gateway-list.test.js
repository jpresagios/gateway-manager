import GateWayList from "../src/components/GateWayList";

import React from "react";

import { render, cleanup, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter as Router } from "react-router-dom";
import { gateWayList } from "../src/api/gateway";
import gatewayFakeData from "./fake-data/gateway";

jest.mock("../src/api/gateway");

gateWayList.mockResolvedValue(gatewayFakeData);

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

  test("Validate GateWayList Display Gateway information", async () => {
    const { asFragment } = render(
      <Router>
        <GateWayList />
      </Router>
    );

    const { data } = gatewayFakeData;

    await waitFor(() =>
      expect(screen.getByText(data[0].serialNumber)).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.getByText(data[1].serialNumber)).toBeInTheDocument()
    );
  });
});
