import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conversation from '../Conversation/Conversation';
import SubmitComment from '../SubmitComment/SubmitComment';

class GoalDashboard extends Component {
  constructor() {
    super();
    this.state = {
      goal: {
        users: [],
      },
      activeUser: false,
    };
  }

  componentDidMount() {
    this.getGoalData();
  }

  getGoalData() {
    const url = `/api/v1/goals/${this.props.match.params.id}`;
    return this.contentFetch(url)
      .then((parsedData) => {
        this.setState({ goal: parsedData });
        this.checkForEnrolledUser();
      })
      .catch(error => console.error(error));
  }

  checkForEnrolledUser() {
    const { userId } = this.props.location.state;
    const goalId = parseInt(this.props.match.params.id);
    const url = `/api/v1/users/${userId}/goals/${goalId}`;
    return fetch(url)
      .then(result => result.json())
      .then((response) => {
        if (response.length === 1) {
          this.setState({ activeUser: true });
        }
      })
      .catch(error => console.error(error));
  }


  joinGoal() {
    const { userId } = this.props.location.state;
    const goalId = parseInt(this.props.match.params.id);
    const postBody = {
      user_id: userId,
      goal_id: goalId,
    };
    fetch(`/api/v1/users/${userId}/goals/${goalId}`, {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response)
      .catch(error => console.error(error));
  }

  leaveGoal(path1, id1) {
    const { userId } = this.props.location.state;
    const goalId = parseInt(this.props.match.params.id);
    fetch(`/api/v1/users/${userId}/goals/${goalId}`, {
      method: 'DELETE',
    })
      .then(response => response)
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
          <h1 className="dashboard-body-title goal-body-title">{this.state.goal.title}</h1>
          <div className="dashboard-body-info">
            <div className="squad-dashboard-body-titles">
              <p>{this.state.goal.description}</p>
            </div>
            <div className="goal-dash-content">
              <div>
                <h2>Starts at {this.state.goal.goal_time}</h2>
              </div>
              <div>
                <h2>{this.state.goal.goal_points}</h2>
              </div>
            </div>
            <div className="squad-dashboard-button">
              {
              this.state.activeUser ?
                <div className="single-button-container">
                  <input
                    className="nav-button"
                    onClick={() => this.leaveGoal()}
                    type="submit"
                    value="Leave"
                  />
                </div>
                :
                <div className="single-button-container">
                  <input
                    className="nav-button"
                    onClick={() => this.joinGoal()}
                    type="submit"
                    value="Join"
                  />
                </div>
              }
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
  location: PropTypes.object,
  state: PropTypes.object,
  id: PropTypes.string,
};

export default GoalDashboard;
