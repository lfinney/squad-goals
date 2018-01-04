import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.showChallenges = this.showChallenges.bind(this);
    this.showSquads = this.showSquads.bind(this);
  }

  showSquads() {
    console.log('yello luke');
  }

  showChallenges() {
    console.log('yello again luke');
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Squad Goals</h1>
        <div className="dash-header">
          <input onClick={this.showSquads} type="button" value="Squads" />
          <input onClick={this.showChallenges} type="button" value="Challenges" />
        </div>
        <div className="dash-body">
          <h3>Squads and Challenges</h3>
        </div>
      </div>
    );
  }
}

export default Dashboard;
