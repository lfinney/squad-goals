import React, { Component } from 'react';
import ChallengesContainer from '../ChallengesContainer/ChallengesContainer.js';
import SquadsContainer from '../SquadsContainer/SquadsContainer.js';

class UserDashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.showContent = this.showContent.bind(this);
    this.state = {
      displayComponent: 'squads',
      squadData: [],
      challengeData: [],
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

  getChallenges() {
    if (!this.state.challengeData.length) {
      const url = '/api/v1/challenges';
      return this.contentFetch(url)
        .then(parsedData => this.setState({
          challengeData: parsedData,
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
            this.showContent('challenges');
            this.getChallenges();
          }}
            type="button"
            value="Challenges"
          />
        </div>
        {
          this.state.displayComponent === 'squads' &&
          <SquadsContainer squadData={this.state.squadData} />
        }
        {
          this.state.displayComponent === 'challenges' &&
          <ChallengesContainer challengeData={this.state.challengeData} />
        }
      </div>
    );
  }
}

export default UserDashboard;
