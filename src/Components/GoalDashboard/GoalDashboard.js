import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
          <div className="smack-talk">
            <h1>Smack Talk Board</h1>
          </div>
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
