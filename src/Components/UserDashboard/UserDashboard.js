import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoalsContainer from '../GoalsContainer/GoalsContainer.js';
import SquadsContainer from '../SquadsContainer/SquadsContainer.js';


class UserDashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayComponent: 'squads',
      activeUser: '',
      points: 0,
      squadData: [],
      goalData: [],
    };
    this.showContent = this.showContent.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    if (!this.state.activeUser) {
      const url = `/api/v1/dashboard/${this.props.match.params.id}`;
      return this.contentFetch(url)
        .then(parsedData => this.setState({
          activeUser: parsedData.user_name,
          points: parsedData.points,
          squadData: parsedData.squads,
          goalData: parsedData.goals,
        }))
        .catch(error => console.error(error));
    }
  }

  // getSquads() {
  //   if (!this.state.squadData.length) {
  //     const url = '/api/v1/users/1/squads';
  //     return this.contentFetch(url)
  //       .then(parsedData => this.setState({
  //         squadData: parsedData,
  //       }))
  //       .catch(error => console.error(error));
  //   }
  // }
  //
  // getGoals() {
  //   if (!this.state.goalData.length) {
  //     const url = '/api/v1/users/1/goals';
  //     return this.contentFetch(url)
  //       .then(parsedData => this.setState({
  //         goalData: parsedData,
  //       }))
  //       .catch(error => console.error(error));
  //   }
  // }

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
      <div className="dashboard-container">
        <h1>Squad Goals</h1>
        <div className="dashboard-header">
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
          }}
            type="button"
            value="Goals"
          />
          <h2>{this.state.activeUser}</h2>
          <h2>{this.state.points}</h2>
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

UserDashboard.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
};

export default UserDashboard;
