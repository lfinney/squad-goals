import React, { Component } from 'react';
import Challenges from '../Challenges/Challenges.js';
import Squads from '../Squads/Squads.js';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.showContent = this.showContent.bind(this);
    this.state = {
      displayComponent: 'squads',
      squadData: [],
      challengeData: [],
    };
  }

  getSquads() {
    const url = '/api/v1/squads';
    return this.contentFetch(url)
      .then(parsed => console.log(parsed))
      .catch(error => console.error(error));
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
            this.getSquads();
          }}
            type="button"
            value="Squads"
          />
          <input onClick={() => this.showContent('challenges')} type="button" value="Challenges" />
        </div>
        {
          this.state.displayComponent === 'squads' &&
          <Squads squadData={this.state.squadData} />
        }
        {
          this.state.displayComponent === 'challenges' &&
          <Challenges challengeData={this.state.challengeData} />
        }
      </div>

      // need a func that takes a url and makes a fetch call and bring back data for both
      // make api calls
      // wire each api call to get data to button that is clicked
    );
  }
}

export default Dashboard;
