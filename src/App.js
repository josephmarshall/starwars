import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import People from "./People";
import { Container } from "semantic-ui-react";

const App = () => (
  <Container style={{ background: "rgba(0,0,0,0.9)" }}>
    <Route exact path="/people" component={People} />
  </Container>
);

export default App;
