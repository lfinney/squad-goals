import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Conversation from '../Conversation/Conversation';
import SubmitComment from '../SubmitComment/SubmitComment';

class SquadDashboard extends Component {
  constructor() {
    super();
    this.state = {
      squad: {},
    };
  }

  componentDidMount() {
    this.getGoalData();
  }

  getGoalData() {
    const url = `/api/v1/squads/${this.props.match.params.id}`;
    return this.contentFetch(url)
      .then(parsedData => this.setState({ squad: parsedData }))
      .catch(error => console.error(error));
  }

  contentFetch(url) {
    return fetch(url)
      .then(result => result.json())
      .catch(error => console.error(error));
  }

  render() {
    console.log(this.state.squad);
    return (
      <div className="dashboard-container">
        <div className="dashboard-body">
          <h1 className="dashboard-body-title">{this.state.squad.squad_name}</h1>
          <div className="dashboard-body-info">
            <div>
              <h2>{this.state.squad.squad_name}</h2>
            </div>
            <div>
              <h2>Members</h2>
            </div>
            <div>
              <h2>Leaderboard</h2>
            </div>
            <div>
              <h2>Upcoming Goals</h2>
            </div>
            <Link to={{
              pathname: '/CreateGoals',
              state: { userId: this.props.location.state.userId },
            }}
            >
            New Goal
            </Link>
          </div>
          { this.state.squad.conversation !== undefined &&
            <div className="conversation-container">
              <Conversation comments={this.state.squad.conversation} />
              <SubmitComment conversationId={this.state.squad.conversation_id} />
            </div>
          }
        </div>
      </div>
    );
  }
}

SquadDashboard.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  state: PropTypes.object,
  id: PropTypes.string,
};

export default SquadDashboard;
