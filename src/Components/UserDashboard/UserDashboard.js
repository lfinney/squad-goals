import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../../Utils/fire';
import GoalsContainer from '../GoalsContainer/GoalsContainer.js';
import SquadsContainer from '../SquadsContainer/SquadsContainer.js';


class UserDashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayComponent: 'user-squads',
      activeUser: '',
      activeUserId: 0,
      points: 0,
      userSquadData: [],
      userGoalData: [],
      allSquadData: [],
      allGoalData: [],
    };
    this.showContent = this.showContent.bind(this);
  }

  componentDidMount() {
    this.getUserData();
    this.getSquadData();
    this.getGoalsData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  getUserData() {
    if (!this.state.activeUser) {
      const url = `/api/v1/dashboard/${this.props.match.params.id}`;
      return this.contentFetch(url)
        .then(parsedData => this.setState({
          activeUser: parsedData.user_name,
          activeUserId: parsedData.id,
          points: parsedData.points,
          userSquadData: parsedData.squads,
          userGoalData: parsedData.goals,
        }))
        .catch(error => console.error(error));
    }
  }

  getSquadData() {
    if (!this.state.activeUser) {
      const url = '/api/v1/squads';
      return this.contentFetch(url)
        .then(parsedData => this.setState({
          allSquadData: parsedData,
        }))
        .catch(error => console.error(error));
    }
  }

  getGoalsData() {
    if (!this.state.activeUser) {
      const url = '/api/v1/goals';
      return this.contentFetch(url)
        .then(parsedData => this.setState({
          allGoalData: parsedData,
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

  deleteAccount(id) {
    fetch(`/api/v1/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => console.log(response))
      .catch(error => console.error(error));

    auth.signOut()
      .then(() => console.log('signed out user'))
      .catch(error => console.error('log out error', error));

    this.props.history.push('/');
  }

  leaveGroup(path1, id1, path2, id2) {
    return fetch(`/api/v1/${path1}/${id1}/${path2}/${id2}`, {
      method: 'DELETE',
    })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  render() {
    console.log(this.state);
    return (
      <div className="dashboard-container">
        <h1>Squad Goals</h1>
        <div className="user-info">
          <h2 className="user-name">{this.state.activeUser}</h2>
          <h2 className="user-points">{this.state.points}</h2>
          <input
            onClick={() => {
            this.deleteAccount(this.state.activeUserId);
          }}
            type="button"
            value="Delete Account"
          />
        </div>
        <div className="dashboard-header">
          <input
            onClick={() => {
            this.showContent('user-squads');
          }}
            type="button"
            value="My Squads"
          />
          <input
            onClick={() => {
            this.showContent('user-goals');
          }}
            type="button"
            value="My Goals"
          />
          <input
            onClick={() => {
            this.showContent('all-squads');
          }}
            type="button"
            value="All Squads"
          />
          <input
            onClick={() => {
            this.showContent('all-goals');
          }}
            type="button"
            value="All Goals"
          />
          <Link to={{
            pathname: '/CreateSquads',
            state: { userId: this.state.activeUserId },
          }}
          >
          New Squad
          </Link>
        </div>
        {
          this.state.displayComponent === 'user-squads' &&
          <SquadsContainer
            userId={this.state.activeUserId}
            leaveGroup={this.leaveGroup}
            squadData={this.state.userSquadData}
          />
        }
        {
          this.state.displayComponent === 'all-squads' &&
          <SquadsContainer
            userId={this.state.activeUserId}
            leaveGroup={this.leaveGroup}
            squadData={this.state.allSquadData}
          />
        }
        {
          this.state.displayComponent === 'user-goals' &&
          <GoalsContainer
            userId={this.state.activeUserId}
            leaveGroup={this.leaveGroup}
            goalData={this.state.userGoalData}
          />
        }
        {
          this.state.displayComponent === 'all-goals' &&
          <GoalsContainer
            userId={this.state.activeUserId}
            leaveGroup={this.leaveGroup}
            goalData={this.state.allGoalData}
          />
        }
      </div>
    );
  }
}

UserDashboard.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  history: PropTypes.object,
  push: PropTypes.func,
  id: PropTypes.string,
};

export default withRouter(UserDashboard);
