import React, { Component } from "react";
import Button from "@material-ui/core/Button";
const BroadcastChannel = require("broadcast-channel");
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
var ls = require("local-storage");

class Controls extends Component {
  constructor() {
    super();
    this.details = {};
  }
  send = () => {
    ls.set("details", this.details);
  };
  addScore = (pts, value) => {
    this.details = {
      ...this.details,
      [value]: parseInt(this.details[value]) + pts
    };
    this.send();
  };
  handleChange = name => event => {
    this.details = { ...this.details, [name]: event.target.value };
    this.send();
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <TextField
          id="standard-name"
          label="Away team name"
          value={this.details.awayTeam}
          onChange={this.handleChange("awayTeam")}
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Away Score"
          type="number"
          value={this.details.awayScore}
          onChange={this.handleChange("awayScore")}
          margin="normal"
        />
        <br />
        <Button onClick={() => this.addScore(3, "awayScore")}>
          Field Goal
        </Button>
        <Button onClick={() => this.addScore(6, "awayScore")}>Touchdown</Button>
        <Button onClick={() => this.addScore(1, "awayScore")}>1pt</Button>
        <Button onClick={() => this.addScore(2, "awayScore")}>Safety</Button>
        <br /> <hr />
        <TextField
          id="standard-name"
          label="Home team name"
          value={this.details.homeTeam}
          onChange={this.handleChange("homeTeam")}
          margin="normal"
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
        <Button onClick={() => this.addScore(3, "homeScore")}>
          Field Goal
        </Button>
        <Button onClick={() => this.addScore(6, "homeScore")}>Touchdown</Button>
        <Button onClick={() => this.addScore(1, "homeScore")}>1pt</Button>
        <Button onClick={() => this.addScore(2, "homeScore")}>Safety</Button>
        <br />
        <hr />
        <FormControl style={{ width: 167 }}>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
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
            <MenuItem value={"OT Final"}>OT Final</MenuItem>
            <MenuItem value={"OT 2 Final"}>OT 2 Final</MenuItem>
            <MenuItem value={"OT 3 Final"}>OT 3 Final</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button onClick={this.send}>Save</Button>
      </div>
    );
  }
}
export default Controls;
