import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';
import UserDashboard from '../UserDashboard/UserDashboard';
import CreateGoals from '../CreateGoals/CreateGoals';
import CreateSquads from '../CreateSquads/CreateSquads';
import GoalDashboard from '../GoalDashboard/GoalDashboard';
import SquadDashboard from '../SquadDashboard/SquadDashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Welcome} />
        <Route
          name="UserDashboard"
          path="/UserDashboard/:id"
          component={UserDashboard}
        />
        <Route path="/CreateSquads" component={CreateSquads} />
        <Route
          name="Goal"
          path="/Goal/:id"
          component={GoalDashboard}
        />
        <Route path="/CreateGoals" component={CreateGoals} />
        <Route
          name="Squad"
          path="/Squad/:id"
          component={SquadDashboard}
        />
      </div>
    );
  }
}

export default App;
