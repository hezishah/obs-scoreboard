import React, { Component } from "react";
import Collapse from "@material-ui/core/Collapse";

var ls = require("local-storage");

class Scoreboard extends Component {
  constructor() {
    super();
    this.details = {};
    this.checked = true;
  }
  componentDidMount() {
    this.set(ls.get("details"));
    ls.on("details", this.set);
    console.log(this.details);
  }
  componentDidUpdate() {
    if (this.details.alertText)
      setTimeout(() => {
        ls.set("details", {
          ...this.details,
          alertColor: null,
          alertText: null
        });
        this.details = {
          ...this.details,
          alertColor: null,
          alertText: null
        };
        this.forceUpdate();
      }, 3000);
  }
  // setDetails(window.localStorage.getItem('details'))
  set = value => {
    this.details = value;
    this.forceUpdate();
  };
  render() {
    return (
      <div>
        <Collapse
          style={{
            zIndex: 1000,
            position: "fixed",
            width: 945,
            top: 0,
            left: 0
          }}
          in={this.details ? this.details.alertText : false}
        >
          <div
            style={{
              width: "100%",
              height: 60,
              margin: "auto",
              textAlign: "center",
              backgroundColor: this.details.alertColor || "grey",
              zIndex: 1000
            }}
          >
            <div style={{ fontSize: 45, color: "white", paddingTop: 5 }}>
              {this.details.alertText}
            </div>
          </div>
        </Collapse>
        <div
          style={{
            width: "100%",
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 99,
            height: 58,
            fontFamily: "roboto"
          }}
        >
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
            <div style={{ paddingLeft: 5, display: "inline-block" }}>
              {this.details.awayTeamShort || "\u00A0"}
            </div>
            <div
              style={{
                position: "relative",
                top: -5,
                left: 38,
                width: 48,
                height: 5,
                backgroundColor:
                  this.details.awayTimeouts >= 1
                    ? "white"
                    : this.details.awayColor
              }}
            />
            <div
              style={{
                position: "relative",
                top: -10,
                left: 98,
                width: 48,
                height: 5,
                backgroundColor:
                  this.details.awayTimeouts >= 2
                    ? "white"
                    : this.details.awayColor
              }}
            />
            <div
              style={{
                position: "relative",
                top: -15,
                left: 158,
                width: 48,
                height: 5,
                backgroundColor:
                  this.details.awayTimeouts >= 3
                    ? "white"
                    : this.details.awayColor
              }}
            />
            <div
              style={{
                position: "relative",
                top: -20,
                left: 378,
                width: 48,
                height: 5,
                backgroundColor:
                  this.details.homeTimeouts >= 1
                    ? "white"
                    : this.details.homeColor
              }}
            />
            <div
              style={{
                position: "relative",
                top: -25,
                left: 438,
                width: 48,
                height: 5,
                backgroundColor:
                  this.details.homeTimeouts >= 2
                    ? "white"
                    : this.details.homeColor
              }}
            />
            <div
              style={{
                position: "relative",
                top: -30,
                left: 498,
                width: 48,
                height: 5,
                backgroundColor:
                  this.details.homeTimeouts >= 3
                    ? "white"
                    : this.details.homeColor
              }}
            />
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
              {this.details.homeTeamShort || "\u00A0"}
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
            {this.details.timer
              ? Math.floor(this.details.timer / 1000 / 60) +
                ":" +
                ("0" + ((this.details.timer / 1000) % 60)).slice(-2)
              : "0:00"}
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
      </div>
    );
  }
}
export default Scoreboard;
