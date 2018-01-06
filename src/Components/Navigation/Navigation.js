import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { auth } from '../../Utils/fire';

class Navigation extends Component {
  logout() {
    auth.signOut()
      .then(() => console.log('signed out user'))
      .catch(error => console.error('log out error', error));
  }

  render() {
    return (
      <nav className="navigation">
        <ul className="">
          <li className="nav-links">
            <Link onClick={() => (this.logout())} to="/">Log Out</Link>
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
