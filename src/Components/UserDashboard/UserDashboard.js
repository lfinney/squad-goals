import React, { Component } from 'react';
import GoalsContainer from '../GoalsContainer/GoalsContainer.js';
import SquadsContainer from '../SquadsContainer/SquadsContainer.js';

class UserDashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.showContent = this.showContent.bind(this);
    this.state = {
      displayComponent: 'squads',
      squadData: [],
      goalData: [],
    };
  }

  componentDidMount() {
    this.getSquads();
  }

  getSquads() {
    if (!this.state.squadData.length) {
      const url = '/api/v1/squads';
      return this.contentFetch(url)
        .then(parsedData => this.setState({
          squadData: parsedData,
        }))
        .catch(error => console.error(error));
    }
  }

  getGoals() {
    if (!this.state.goalData.length) {
      const url = '/api/v1/goals';
      return this.contentFetch(url)
        .then(parsedData => this.setState({
          goalData: parsedData,
        }))
        .catch(error => console.error(error));
    }
  }

  contentFetch(url) {
    return fetch(url)
      .then(result => result.json())
      .catch(error => console.error(error));
  }

  showContent(type) {
    this.setState({
      displayComponent: type,
    });
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Squad Goals</h1>
        <div className="dash-header">
          <input
            onClick={() => {
            this.showContent('squads');
          }}
            type="button"
            value="Squads"
          />
          <input
            onClick={() => {
            this.showContent('goals');
            this.getGoals();
          }}
            type="button"
            value="Goals"
          />
        </div>
        {
          this.state.displayComponent === 'squads' &&
          <SquadsContainer squadData={this.state.squadData} />
        }
        {
          this.state.displayComponent === 'goals' &&
          <GoalsContainer goalData={this.state.goalData} />
        }
      </div>
    );
  }
}

export default UserDashboard;
