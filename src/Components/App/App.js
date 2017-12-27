import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Welcome} />
        <Route path="/Navigation" component={Navigation} />
      </div>
    );
  }
}

export default App;
