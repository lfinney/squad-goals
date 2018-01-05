import React, { Component } from 'react';

class CreateGoals extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      description: '',
      dateTime: '',
      points: 0,
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, event) {
    event.preventDefault();
    this.setState({ [key]: event.target.value });
  }

  handleSubmit() {
    const goal = Object.assign({}, this.state);
    console.log(goal);
  };

  render() {
    return (
      <div className="create-goals">
        <h1>CreateGoals</h1>
        <form>
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
            value={this.state.dateTime}
            onChange={event => this.updateState('dateTime', event)}
          />
          <select className="sportDropDown" value={this.state.points} onChange={event => this.updateState('points', event)}>
            <option value="">-Select Point Total-</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="750">750</option>
            <option value="1000">1000</option>
          </select>
        </form>
      </div>
    );
  }
}

export default CreateGoals;
