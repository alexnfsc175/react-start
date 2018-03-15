import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
// import logo from './logo_light_blue.png';
// import PropTypes from 'prop-types';


class App extends Component {
  // static propTypes = {
  //   logo: PropTypes.string.isRequired,
  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
