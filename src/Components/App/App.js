import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';
import UserDashboard from '../UserDashboard/UserDashboard';
import Squads from '../Squads/Squads';
import ChallengesContainer from '../ChallengesContainer/ChallengesContainer';
import CreateChallenges from '../CreateChallenges/CreateChallenges';
import CreateSquads from '../CreateSquads/CreateSquads';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Welcome} />
        <Route path="/UserDashboard" component={UserDashboard} />
        <Route path="/Squads" component={Squads} />
        <Route path="/CreateSquads" component={CreateSquads} />
        <Route path="/Challenges" component={ChallengesContainer} />
        <Route path="/CreateChallenges" component={CreateChallenges} />
      </div>
    );
  }
}

export default App;
