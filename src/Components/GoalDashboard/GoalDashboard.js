import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conversation from '../Conversation/Conversation';
import SubmitComment from '../SubmitComment/SubmitComment';

class GoalDashboard extends Component {
  constructor() {
    super();
    this.state = {
      goal: {},
    };
  }

  componentDidMount() {
    this.getGoalData();
  }

  getGoalData() {
    const url = `/api/v1/goals/${this.props.match.params.id}`;
    return this.contentFetch(url)
      .then(parsedData => this.setState({
        goal: parsedData,
      }))
      .catch(error => console.error(error));
  }

  contentFetch(url) {
    return fetch(url)
      .then(result => result.json())
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-body">
          <h1 className="dashboard-body-title">Goal Name</h1>
          <div className="dashboard-body-info">
            <div>
              <h2>{this.state.goal.title}</h2>
            </div>
            <div>
              <h2>{this.state.goal.description}</h2>
            </div>
            <div>
              <h2>{this.state.goal.goal_time}</h2>
            </div>
            <div>
              <h2>{this.state.goal.goal_points}</h2>
            </div>
          </div>
          { this.state.goal.conversation !== undefined &&
            <div className="conversation-container">
              <Conversation comments={this.state.goal.conversation} />
              <SubmitComment conversationId={this.state.goal.conversation_id} />
            </div>
          }
        </div>
      </div>
    );
  }
}

GoalDashboard.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
};

export default GoalDashboard;
