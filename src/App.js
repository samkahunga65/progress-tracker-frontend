import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store from "./Store";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import AddGoal from "./components/AddGoal";
import CustomizedMenus from "./components/Add";
import Kard from "./components/Card";
import Trackers from "./components/trackers";
import SimpleMenu from "./components/simpleMenu";

function App() {
  //
  return (
    <div className="App">
      <Store>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/menu" exact component={CustomizedMenus} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/addgoal" exact component={AddGoal} />
            <Route path="/lotsabs" exact component={Kard} />
            <Route path="/trackers" exact component={Trackers} />
            <Route path="/simpleMenu" exact component={SimpleMenu} />
          </Switch>
        </Router>
      </Store>
    </div>
  );
}

export default App;
