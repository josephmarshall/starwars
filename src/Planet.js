import React from "react";
import axios from "axios";
import { PlanetUrls } from "./PlanetImageUrls";
class Planet extends React.Component {
  state = { planet: [], image: "" };

  componentDidUpdate(prevProps, prevState) {
    prevProps.person !== this.props.person &&
      this.props.person &&
      this.getPlanetData(this.props.person.homeworld);
  }

  getPlanetData = planet => {
    axios.get(planet).then(res => {
      this.setState({ planet: res.data });
      this.getPlanetImage();
    });
  };

  getPlanetImage() {
    let image = PlanetUrls[Math.floor(Math.random() * PlanetUrls.length)];
    this.setState({ image });
  }

  render() {
    const { planet } = this.state;
    return (
      <div
        style={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: `url(${this.state.image})`,
          backgroundSize: "cover"
        }}
      >
        <div style={{ color: "white", padding: "10px" }}>
          <h1>Homeworld: {planet.name}</h1>
          <h4>Diameter: {planet.diameter}</h4>
          <div>Climate: {planet.climate}</div>
          <div>Gravity: {planet.gravity}</div>
          <div>Population: {planet.population}</div>
          <div>Rotation Period: {planet.rotation_period}</div>
        </div>
      </div>
    );
  }
}

export default Planet;
