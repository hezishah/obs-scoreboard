import React, { Component } from "react";
import Button from "@material-ui/core/Button";
const BroadcastChannel = require("broadcast-channel");
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ColorPicker from "material-ui-color-picker";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import Edit from "@material-ui/icons/Edit";
var ls = require("local-storage");

class Controls extends Component {
  constructor() {
    super();
    this.details = window.localStorage.getItem("details")
      ? JSON.parse(window.localStorage.getItem("details"))
      : { timer: 10000 };
    this.minutes = Math.floor(this.details.timer / 1000 / 60);
    this.seconds = (this.details.timer / 1000) % 60;
    this.timerInstance = null;
    this.edit = { homeTeam: false, awayTeam: false, awayColor: false };
  }
  send = () => {
    ls.set("details", this.details);
    this.forceUpdate();
  };
  addScore = (pts, value) => {
    this.details = {
      ...this.details,
      [value]: parseInt(this.details[value]) + pts
    };
    this.send();
  };
  alert = (text, color) => {
    this.details = {
      ...this.details,
      alertText: text,
      alertColor: color
    };
    this.send();
    this.details = {
      ...this.details,
      alertText: "",
      alertColor: ""
    };
  };
  handleColorChange = (color, value) => {
    if (color) {
      this.details = {
        ...this.details,
        [value]: color
      };
      this.send();
    }
  };
  handleTimeChange = name => event => {
    if (name === "minutes") {
      this.minutes = event.target.value;
    } else if (name === "seconds") {
      this.seconds = event.target.value;
    }
    this.details = {
      ...this.details,
      timer: (parseInt(60 * this.minutes) + parseInt(this.seconds)) * 1000
    };
    if (this.details.timer >= 0) {
      this.send();
    } else {
      this.details.timer === 0;
      this.minutes === 0;
      this.seconds === 0;
    }
    this.forceUpdate();

    console.log(name, event.target.value);
  };
  handleChange = name => event => {
    this.details = { ...this.details, [name]: event.target.value };
    console.log(name);
    if (name === "quarter") this.forceUpdate();
    this.send();
  };
  stopTimer = () => {
    clearInterval(this.timerInstance);
    this.timerRunning = false;
  };
  toggleTimer = () => {
    if (this.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }

    this.forceUpdate();
  };
  resetClock = () => {
    this.minutes = 12;
    this.seconds = 0;
    this.details.timer = 720000;
    this.timerRunning = false;
    clearInterval(this.timerInstance);
    this.send();
    this.forceUpdate();
  };
  startTimer = () => {
    this.timerRunning = true;
    this.timerInstance = setInterval(() => {
      if (this.details.timer > 0) {
        this.details = {
          ...this.details,
          timer: this.details.timer - 1000
        };
        this.minutes = Math.floor(this.details.timer / 1000 / 60);
        this.seconds = (this.details.timer / 1000) % 60;
        this.send();
        this.forceUpdate();
      } else {
        this.timerRunning = false;
        clearInterval(this.timerInstance);
        this.forceUpdate();
      }
    }, 1000);
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    this.edit.awayTeam = !this.edit.awayTeam;
                    this.forceUpdate();
                  }}
                >
                  <Edit />
                </IconButton>
              </InputAdornment>
            )
          }}
          disabled={!this.edit.awayTeam}
          id="standard-name"
          label="Home team name"
          value={this.details.awayTeam}
          onChange={this.handleChange("awayTeam")}
          margin="normal"
        />
        <br />
        {this.edit.awayTeam ? (
          <div>
            <ColorPicker
              name="color"
              defaultValue="#000"
              value={this.details.awayColor} // for controlled component
              onChange={color => this.handleColorChange(color, "awayColor")}
              disabled={!this.details.awayColor}
            />
            <br />
          </div>
        ) : null}

        <TextField
          id="standard-name"
          label="Away Score"
          type="number"
          value={this.details.awayScore}
          onChange={this.handleChange("awayScore")}
          margin="normal"
        />
        <br />
        <Button
          variant="outlined"
          style={{ margin: 5 }}
          onClick={() => {
            this.addScore(3, "awayScore");
            this.alert(
              "Field Goal " + ("Glenwood" || ""),
              this.details.awayColor
            );
          }}
        >
          Field Goal
        </Button>
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => {
            this.addScore(6, "awayScore");
            this.alert(
              "Touchdown " + ("Glenwood" || ""),
              this.details.awayColor
            );
          }}
        >
          Touchdown
        </Button>
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => this.addScore(1, "awayScore")}
        >
          1pt
        </Button>
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => this.addScore(2, "awayScore")}
        >
          Safety
        </Button>
        <br />
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => {
            this.details.awayTimeouts -= 1;
            this.send();
            this.alert(
              // "Timeout " + (this.details.awayTeam || ""),
              "Timeout " + ("Glenwood" || ""),
              this.details.awayColor
            );
          }}
        >
          Timeout
        </Button>
        <br />
        <TextField
          id="standard-name"
          label="Away Timeouts"
          type="number"
          value={this.details.awayTimeouts}
          onChange={this.handleChange("awayTimeouts")}
          margin="normal"
        />
        <hr />
        <div>
          <div style={{ display: "inline-block" }} />
          <div style={{ display: "inline-block" }}>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => {
                        this.edit.homeTeam = !this.edit.homeTeam;
                        this.forceUpdate();
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              disabled={!this.edit.homeTeam}
              id="standard-name"
              label="Home team name"
              value={this.details.homeTeam}
              onChange={this.handleChange("homeTeam")}
              margin="normal"
            />
          </div>
        </div>
        <br />
        <ColorPicker
          name="color"
          defaultValue="#000"
          value={this.details.homeColor} // for controlled component
          onChange={color => this.handleColorChange(color, "homeColor")}
        />
        <br />
        <TextField
          id="standard-name"
          label="Home Score"
          type="number"
          value={this.details.homeScore}
          onChange={this.handleChange("homeScore")}
          margin="normal"
        />
        <br />
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => {
            this.addScore(3, "homeScore");
            this.alert(
              "Field Goal " + ("Heelan" || ""),
              this.details.homeColor
            );
          }}
        >
          Field Goal
        </Button>
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => {
            this.addScore(6, "homeScore");
            this.alert("Touchdown " + ("Heelan" || ""), this.details.homeColor);
          }}
        >
          Touchdown
        </Button>
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => this.addScore(1, "homeScore")}
        >
          1pt
        </Button>
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => this.addScore(2, "homeScore")}
        >
          Safety
        </Button>
        <br />
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => {
            this.details.homeTimeouts -= 1;
            this.send();
            this.alert(
              "Timeout " + (this.details.homeTeam || ""),
              this.details.homeColor
            );
          }}
        >
          Timeout
        </Button>
        <br />
        <TextField
          id="standard-name"
          label="Home Timeouts"
          type="number"
          value={this.details.homeTimeouts}
          onChange={this.handleChange("homeTimeouts")}
          margin="normal"
        />
        <hr />
        <FormControl style={{ width: 167, textAlign: "left" }}>
          <InputLabel htmlFor="age-simple">Quarter</InputLabel>
          <Select
            style={{ color: "black" }}
            value={this.details.quarter}
            onChange={this.handleChange("quarter")}
          >
            <MenuItem value={"1st"}>1st</MenuItem>
            <MenuItem value={"2nd"}>2nd</MenuItem>
            <MenuItem value={"Half"}>Halftime</MenuItem>
            <MenuItem value={"3rd"}>3rd</MenuItem>
            <MenuItem value={"4th"}>4th</MenuItem>
            <MenuItem value={"Final"}>Final</MenuItem>
            <MenuItem value={"OT"}>OT</MenuItem>
            <MenuItem value={"OT 2"}>OT 2</MenuItem>
            <MenuItem value={"OT 3"}>OT 3</MenuItem>
            <MenuItem value={"F/OT"}>F/OT</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          id="standard-name"
          label="Minutes"
          type="number"
          value={this.minutes}
          onChange={this.handleTimeChange("minutes")}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Seconds"
          type="number"
          value={this.seconds}
          onChange={this.handleTimeChange("seconds")}
          margin="normal"
        />
        <IconButton onClick={this.toggleTimer}>
          {this.timerRunning ? <Pause /> : <PlayArrow />}
        </IconButton>
        {/* <br /> <Button>Start</Button>
        <Button onClick={this.stopTimer}>Stop</Button> */}
        <br />
        <Button onClick={this.resetClock}>12:00</Button>
        <Button onClick={this.send}>Save</Button>
      </div>
    );
  }
}
export default Controls;
