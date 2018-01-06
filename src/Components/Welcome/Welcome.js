import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="dashboard-body">
          <h1 className="dashboard-body-title">Squad Goals</h1>
          <form className="welcome-form">
            <input type="submit" value="Log In" />
            <input type="submit" value="Sign Up" />
          </form>
          <div className="welcome-img" />
        </div>
      </div>
    );
  }
}

export default Welcome;
