import React from "react";

const Person = ({ person }) => (
  <div
    style={{
      display: "flex",
      padding: "10px",
      alignItems: "center",
      width: "100%",
      height: "20%",
      backgroundImage:
        "url('https://upload.wikimedia.org/wikipedia/en/7/74/Star_Wars_Planet_Yavin_with_Moon.jpg')",
      backgroundSize: "cover"
    }}
  >
    <img
      src={person && person.image}
      style={{
        borderRadius: "60px",
        height: "120px",
        width: "120px",
        objectFit: "cover"
      }}
    />
    <h1 style={{ margin: 0, padding: "10px", color: "white", fontSize: "3em" }}>
      {person && person.name}
    </h1>
  </div>
);

export default Person;
