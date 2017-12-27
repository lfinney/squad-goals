import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome />
        <Navigation />
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
