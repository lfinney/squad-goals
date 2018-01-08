import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Utils/fire';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      showMyComponent: false,
    };
  }

  componentWillMount() {
    this.checkForUser();
  }

  checkForUser() {
    auth.onAuthStateChanged((user) => {
      user ?
        this.setState({ showMyComponent: true })
        :
        this.setState({ showMyComponent: false });
    });
  }

  logout() {
    auth.signOut()
      .then(res => res)
      .catch(error => console.error('log out error', error));
  }

  render() {
    return (
      <nav className="navigation">
        <ul className="">
          <li className="nav-links">
            <Link
              style={this.state.showMyComponent ? { display: 'block' } : { display: 'none' }}
              onClick={() => {
              this.logout();
              this.checkForUser();
            }}
              to="/"
            >Log Out
            </Link>
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
