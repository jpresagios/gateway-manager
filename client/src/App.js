import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/commons/NavBar";
import GateWayList from "./components/GateWayList";
import GateWayForm from "./components/GateWay/GateWayForm";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-5">
        <Route exact path="/" component={GateWayList} />
        <Route exact path="/gateway/add" component={GateWayForm} />
      </div>
    </Router>
  );
}

export default App;
