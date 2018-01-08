import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateGoals extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      description: '',
      goal_time: '',
      goal_points: 0,
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, event) {
    event.preventDefault();
    this.setState({ [key]: event.target.value });
  }

  postGoal(goal) {
    console.log(goal);
    fetch('/api/v1/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  handleSubmit() {
    const goal = Object.assign({}, this.state, { user_id: this.props.userId });
    this.postGoal(goal);
  }

  render() {
    return (
      <div className="dashboard-container">
        <h1>CreateGoals</h1>
        <form className="dashboard-body create-goals-body">
          <input
            className="goal-input"
            type="text"
            placeholder="Goal Title"
            value={this.state.title}
            onChange={event => this.updateState('title', event)}
          />
          <input
            className="goal-input"
            type="textarea"
            placeholder="Goal Description"
            value={this.state.description}
            onChange={event => this.updateState('description', event)}
          />
          <input
            className="date-input"
            type="datetime-local"
            value={this.state.goal_time}
            onChange={event => this.updateState('goal_time', event)}
          />
          <select className="goal-point-option" value={this.state.goal_points} onChange={event => this.updateState('goal_points', event)}>
            <option value="">-Select Point Total-</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="750">750</option>
            <option value="1000">1000</option>
          </select>
          <input
            className="create-goals-button"
            type="button"
            value="Set Goal"
            onClick={() => this.handleSubmit()}
          />
        </form>
      </div>
    );
  }
}

CreateGoals.propTypes = {
  userId: PropTypes.number,
};

export default CreateGoals;
