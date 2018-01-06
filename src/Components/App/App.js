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
        <Route path="/UserDashboard" component={UserDashboard} />
        <Route path="/CreateSquads" component={CreateSquads} />
        <Route
          name="Goal"
          path="/Goal/:id"
          render={props => <GoalDashboard goal={props.location.state.goal} />}
        />
        <Route path="/CreateGoals" component={CreateGoals} />
        <Route
          name="Squad"
          path="/Squad/:id"
          render={props => <SquadDashboard squad={props.location.state.squad} />
        }
        />
      </div>
    );
  }
}

export default App;
