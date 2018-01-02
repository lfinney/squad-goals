import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Squads from '../Squads/Squads';
import Challenges from '../Challenges/Challenges';
import CreateChallenges from '../CreateChallenges/CreateChallenges';
import CreateSquads from '../CreateSquads/CreateSquads';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Welcome} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Squads" component={Squads} />
        <Route path="/CreateSquads" component={CreateSquads} />
        <Route path="/Challenges" component={Challenges} />
        <Route path="/CreateChallenges" component={CreateChallenges} />
      </div>
    );
  }
}

export default App;
