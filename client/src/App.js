import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/commons/NavBar";
import GateWayList from "./components/GateWayList";
import GateWayForm from "./components/GateWay/GateWayForm";
import GateWayDetail from "./components/GateWay/GateWayDetail";
import DeviceForm from "./components/Device/DeviceForm";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-5">
        <Route exact path="/" component={GateWayList} />
        <Route exact path="/gateway/add" component={GateWayForm} />
        <Route exact path="/gateway/detail/:id" component={GateWayDetail} />
        <Route exact path="/device/add/:id" component={DeviceForm} />
      </div>
    </Router>
  );
}

export default App;
