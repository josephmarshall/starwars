import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import People from "./People";
import { Container } from "semantic-ui-react";
import Home from "./Home";

const App = () => (
  <Container style={{ background: "rgba(0,0,0,0.9)" }}>
    <Route exact path="/people" component={People} />
    <Route exact path="/" component={Home} />
  </Container>
);

export default App;
