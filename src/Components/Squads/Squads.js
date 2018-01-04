import React, { Component } from 'react';

class Squads extends Component {
  render() {
    return (
      <div className="squads-body">
        <h2 className="squads-body-title">Squads</h2>
        <div className="squads-body-info">
          <p>Squad Title</p>
          <p>Competitors</p>
          <p>Squad Challenges</p>
          <input type="button" value="Leave" />
        </div>
      </div>
    );
  }
}

export default Squads;
