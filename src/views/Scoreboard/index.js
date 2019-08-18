import React, { useEffect, Component } from "react";
var ls = require("local-storage");

class Scoreboard extends Component {
  constructor() {
    super();
    this.details = {};
  }
  componentDidMount() {
    this.set(ls.get("details"));
    ls.on("details", this.set);
  }
  // setDetails(window.localStorage.getItem('details'))
  set = value => {
    this.details = value;
    this.forceUpdate();
  };

  render() {
    return (
      <div style={{ width: "100%", height: 58, fontFamily: "roboto" }}>
        <div
          style={{
            width: 250,
            height: "100%",
            display: "inline-block",
            color: "white",
            fontSize: 50,
            backgroundColor: this.details.awayColor || "grey",
            border: "1px solid black",
            textTransform: "uppercase"
          }}
        >
          <span style={{ paddingLeft: 5 }}>
            {this.details.awayTeam || "\u00A0"}
          </span>
        </div>
        <div
          style={{
            width: 80,
            height: "100%",
            display: "inline-block",
            color: "white",
            fontSize: 50,
            textAlign: "center",
            backgroundColor: this.details.awayColor || "grey",
            border: "1px solid black"
          }}
        >
          <span>{this.details.awayScore || "\u00A0"}</span>
        </div>
        <div
          style={{
            width: 250,
            height: "100%",
            top: "50%",
            display: "inline-block",
            color: "white",
            fontSize: 50,
            backgroundColor: this.details.homeColor || "grey",
            border: "1px solid black",
            textTransform: "uppercase"
          }}
        >
          <span style={{ paddingLeft: 5 }}>
            {this.details.homeTeam || "\u00A0"}
          </span>
        </div>
        <div
          style={{
            width: 80,
            height: "100%",
            display: "inline-block",
            color: "white",
            fontSize: 50,
            textAlign: "center",
            backgroundColor: this.details.homeColor || "grey",
            border: "1px solid black"
          }}
        >
          <span>{this.details.homeScore || "\u00A0"}</span>
        </div>
        <div
          style={{
            width: 150,
            height: "100%",
            display: "inline-block",
            color: "grey",
            fontSize: 50,
            textAlign: "center",
            border: "1px solid black"
          }}
        >
          Time
        </div>
        <div
          style={{
            width: 120,
            height: "100%",
            display: "inline-block",
            color: "grey",
            fontSize: 50,
            textAlign: "center",
            border: "1px solid black"
          }}
        >
          {this.details.quarter || "\u00A0"}
        </div>
      </div>
    );
  }
}
export default Scoreboard;
