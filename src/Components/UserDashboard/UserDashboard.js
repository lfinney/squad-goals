import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    this.createNewSquad = this.createNewSquad.bind(this);
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

  createNewSquad() {
    this.props.history.push('/CreateSquads');
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

  leaveGroup(path, id) {
    console.log(path);
    console.log(id);
    // return fetch(`api/v1/${path}/${id}`, {
    //   method: 'DELETE',
    // })
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
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
          <SquadsContainer
            leaveGroup={this.leaveGroup}
            createNewSquad={this.createNewSquad}
            squadData={this.state.squadData}
          />
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
  history: PropTypes.object,
};

export default withRouter(UserDashboard);
