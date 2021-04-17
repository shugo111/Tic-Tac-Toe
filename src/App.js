import React, { useEffect, useState, PureComponent } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import HomePage from "./Screen/HomePage";
import Demo2 from "./Screen/Demo2";
import Main from "./Screen/Main";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const io = require("socket.io-client");
const socket = io("http://localhost:5000", { transports: ["websocket"] });

function App() {
  // socket.on("connects", handleInit);
  // //socket.on("handleGame", handelGameState);
  // function handleInit(msg) {
  //   console.log(msg);
  // }
  // function handelGameState() {}
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/computer"
            exact
            render={(props) => <HomePage socket={socket} {...props} />}
          />
          <Route
            path="/play"
            render={(props) => <Demo2 socket={socket} {...props} />}
          />

          <Route
            path="/"
            exact
            render={(props) => <Main socket={socket} {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
