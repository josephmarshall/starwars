import React from "react";
import axios from "axios";
import { Image, Header } from "semantic-ui-react";
import Planet from "./Planet";
import Person from "./Person";
import "./people.css";
import starwars from "./starwars.png";
import headerPic from "./headerPic.png";

class People extends React.Component {
  state = { people: [] };

  componentDidMount() {
    window.localStorage.getItem("state")
      ? this.setState({
          people: JSON.parse(window.localStorage.getItem("state")).people
        })
      : axios.get("https://swapi.co/api/people/").then(res => {
          console.log(res.data);
          this.setState({
            people: [...this.state.people, ...res.data.results],
            count: res.data.count
          });
          res.data.next && this.getNext(res.data.next);
        });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state)
      window.localStorage.setItem("state", JSON.stringify(this.state));
  }

  getNext = next => {
    console.log(next);
    axios.get(next).then(res => {
      this.setState(
        { people: [...this.state.people, ...res.data.results] },
        () => {
          if (this.state.people.length === this.state.count) {
            this.loadImages();
          }
        }
      );
      if (res.data.next) this.getNext(res.data.next);
    });
  };

  loadImages = () => {
    this.state.people.map((p, i) => this.getImage(p.name, i));
  };

  getImage = (keyword, id) => {
    let parser = new DOMParser();
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://www.flickr.com/search/?text=" +
          keyword
      )
      .then(res => {
        let htmlDoc = parser.parseFromString(res.data, "text/html");
        let elementsArray = htmlDoc.getElementsByClassName(
          "view photo-list-photo-view requiredToShowOnServer awake"
        );
        let randElement =
          elementsArray[Math.floor(Math.random() * elementsArray.length)];
        if (randElement) {
          let urlNoQuotes = randElement.style.backgroundImage.split(/"/)[1];
          let urlComplete = urlNoQuotes;
          console.log(urlComplete);
          let people = this.state.people.map((p, i) => {
            if (id === i) return { ...p, image: urlComplete };
            return p;
          });
          this.setState({ people: people });
        }
      });
  };

  selectPerson = person => {
    this.setState({ selectedPerson: person });
  };

  render() {
    return (
      <div style={{ minHeight: "100vh" }}>
        <h1
          style={{
            background: "black",
            color: "white",
            fontSize: "4em",
            margin: 0
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={starwars}
              style={{
                marginLeft: "30px",
                height: "100px",
                objectFit: "cover"
              }}
            />
            <img
              src={headerPic}
              style={{ height: "100px", objcetFit: "cover" }}
            />
          </div>
        </h1>
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: "80vh",
              width: "30%",
              overflowY: "scroll",
              border: "solid black 1px",
              background: "black",
              color: "white"
            }}
          >
            {this.state.people.map(p => (
              <div
                className="personList"
                onClick={() => this.selectPerson(p)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  borderBottom: "solid lightgray 1px",
                  alignItems: "center",
                  padding: "5px"
                }}
                key={p.name}
              >
                <Image
                  circular
                  src={p.image}
                  style={{ height: "30px", width: "30px", objectFit: "cover" }}
                />
                <Header
                  style={{
                    margin: "0 0 0 5px",
                    color: "white"
                  }}
                >
                  {p.name}
                </Header>
              </div>
            ))}
          </div>
          <div style={{ width: "100%", height: "80vh" }}>
            <Person person={this.state.selectedPerson} />
            <Planet person={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}

export default People;
