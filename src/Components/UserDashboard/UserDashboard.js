import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoalsContainer from '../GoalsContainer/GoalsContainer.js';
import SquadsContainer from '../SquadsContainer/SquadsContainer.js';


class UserDashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayComponent: 'squads',
      activeUser: '',
      activeUserId: 0,
      points: 0,
      squadData: [],
      goalData: [],
    };
    this.showContent = this.showContent.bind(this);
  }

  componentDidMount() {
    this.getUserData();
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
          squadData: parsedData.squads,
          goalData: parsedData.goals,
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

  leaveGroup(path1, id1, path2, id2) {
    return fetch(`/api/v1/${path1}/${id1}/${path2}/${id2}`, {
      method: 'DELETE',
    })
      .then(response => console.log(response))
      .catch(error => console.error(error));
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
          <Link to={{
            pathname: '/CreateSquads',
            state: { userId: this.state.activeUserId },
          }}
          >
          New Squad
          </Link>
        </div>
        {
          this.state.displayComponent === 'squads' &&
          <SquadsContainer
            userId={this.state.activeUserId}
            leaveGroup={this.leaveGroup}
            // createNewSquad={this.createNewSquad}
            squadData={this.state.squadData}
          />
        }
        {
          this.state.displayComponent === 'goals' &&
          <GoalsContainer
            userId={this.state.activeUserId}
            leaveGroup={this.leaveGroup}
            goalData={this.state.goalData}
          />
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
