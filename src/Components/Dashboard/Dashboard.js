import React, { Component } from 'react';
import Challenges from '../Challenges/Challenges.js';
import Squads from '../Squads/Squads.js';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.showContent = this.showContent.bind(this);
    this.state = {
      displayComponent: 'squads',
    };
  }

  showContent(type) {
    console.log(type);
    this.setState({
      displayComponent: type,
    });
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Squad Goals</h1>
        <div className="dash-header">
          <input onClick={() => this.showContent('squads')} type="button" value="Squads" />
          <input onClick={() => this.showContent('challenges')} type="button" value="Challenges" />
        </div>
        {
          this.state.displayComponent === 'squads' &&
          <Squads />
        }
        {
          this.state.displayComponent === 'challenges' &&
          <Challenges />
        }
      </div>
    );
  }
}

export default Dashboard;
