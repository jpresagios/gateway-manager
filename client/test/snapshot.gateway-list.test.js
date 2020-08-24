import GateWayList from "../src/components/GateWayList";

import React from "react";

import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

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
});
