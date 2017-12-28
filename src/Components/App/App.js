import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Squads from '../Squads/Squads';
import Challenges from '../Challenges/Challenges';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Welcome} />
        <Route path="/Navigation" component={Navigation} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Squads" component={Squads} />
        <Route path="/Challenges" component={Challenges} />
      </div>
    );
  }
}

export default App;