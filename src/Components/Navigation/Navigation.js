import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <nav className="navigation">
        <ul className="">
          <li className="nav-links">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-links">
            <Link to="/UserDashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
