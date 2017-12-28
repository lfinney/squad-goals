import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h1>Squad Goals</h1>
        <input type="submit" value="Log In" />
        <input type="submit" value="Sign Up" />
      </div>
    );
  }
}

export default Welcome;
