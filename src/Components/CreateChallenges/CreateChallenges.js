import React, { Component } from 'react';

class CreateChallenges extends Component {
  constructor(props, context) {
    super(props, context);
    // this.showContent = this.showContent.bind(this);
    this.state = {
      // challengeTitle: '',
      // description: '',
      // dateTime: '',
      // points: 0,
    };
  }

  render() {
    return (
      <div className="create-challenges">
        <h1>CreateChallenges</h1>
        <form>
          <input
            className="challenge-input"
            type="text"
            placeholder="Challenge Title"
            value={this.state.goalName}
          />
        </form>
      </div>
    );
  }
}

export default CreateChallenges;
