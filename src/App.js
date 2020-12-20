import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scoreboard from './views/Scoreboard/';
import Controls from './views/Controls/';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const BroadcastChannel = require('broadcast-channel')

// import firebase from 'firebase';
// var config = {
//   apiKey: "AIzaSyCKNnq3N8tLNRBvWajKme1jSGqdphp_7wg",
//   authDomain: "coreboard-22bea.firebaseapp.com",
//   databaseURL: "https://scoreboard-22bea.firebaseio.com"
// };
// firebase.initializeApp(config);

// Get a reference to the database service
// var database = firebase.database();
// firebase.database().ref('/scoreboard/').on('value', (newData) => {
//   console.log(newData.val());
// });
const channel = new BroadcastChannel.BroadcastChannel('scoreboard');
const App = props => {
  // firebase.database().ref('/scoreboard/scoreboard');
  // channel.postMessage(details);
  return (
    <Router>
      <Route path="/scoreboard" component={Scoreboard} />
      <Route path="/" exact render={(props) => <Controls />} />
    </Router>
  );
}

export default App;
