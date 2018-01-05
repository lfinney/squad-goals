import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';
import UserDashboard from '../UserDashboard/UserDashboard';
import SquadsContainer from '../SquadsContainer/SquadsContainer';
import GoalsContainer from '../GoalsContainer/GoalsContainer';
import CreateGoals from '../CreateGoals/CreateGoals';
import CreateSquads from '../CreateSquads/CreateSquads';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Welcome} />
        <Route path="/UserDashboard" component={UserDashboard} />
        <Route path="/Squads" component={SquadsContainer} />
        <Route path="/CreateSquads" component={CreateSquads} />
        <Route path="/Goals" component={GoalsContainer} />
        <Route path="/CreateGoals" component={CreateGoals} />
      </div>
    );
  }
}

export default App;
