import React, { Component } from 'react';

class CreateGoals extends Component {
  constructor(props, context) {
    super(props, context);
    // this.showContent = this.showContent.bind(this);
    this.state = {
      // goalTitle: '',
      // description: '',
      // dateTime: '',
      // points: 0,
    };
  }

  render() {
    return (
      <div className="create-goals">
        <h1>CreateGoals</h1>
        <form>
          <input
            className="goal-input"
            type="text"
            placeholder="Goal Title"
            value={this.state.goalName}
          />
        </form>
      </div>
    );
  }
}

export default CreateGoals;
