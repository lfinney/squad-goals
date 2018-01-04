import React, { Component } from 'react';

class Challenges extends Component {
  render() {
    return (
      <div className="challenge-body">
        <h2 className="challenge-body-title">Challenges</h2>
        <div className="challenge-body-info">
          <p>Challenge Title</p>
          <p>Challenge Description </p>
          <p>Challenge Time </p>
          <p>Challenge Points </p>
          <p>Challenge Creator </p>
        </div>
      </div>
    );
  }
}

export default Challenges;
