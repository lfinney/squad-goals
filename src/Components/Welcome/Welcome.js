import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth, provider } from '../../Utils/fire';

class Welcome extends Component {
  componentDidMount() {
    this.checkForUser();
  }

  nextPath(path) {
    this.props.history.push(`/UserDashboard/${path}`);
  }

  checkForUser() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const fireId = user.providerData[0].uid;
        fetch(`/api/v1/users/${fireId}`)
          .then(response => response.json())
          .then(userId => this.nextPath(userId.user))
          .catch(error => console.error(error));
      }
    });
  }

  signUp() {
    auth.signInWithPopup(provider)
      .then((newUser) => {
        const postBody = {
          'user_name': newUser.user.providerData[0].displayName,
          'firebase_id': newUser.user.providerData[0].uid,
          'points': 50,
        };
        fetch('/api/v1/users', {
          method: 'POST',
          body: JSON.stringify(postBody),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(userId => this.nextPath(userId[0].id))
          .catch(error => console.error(error));
      });
  }

  firebaseLogin() {
    auth.signInWithPopup(provider)
      .then(user => fetch(`/api/v1/users/${user.user.providerData[0].uid}`)
        .then(result => result.json()))
      .then(userId => this.nextPath(userId.user))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="welcome">
        <div className="dashboard-body">
          <h1 className="dashboard-body-title">Squad Goals</h1>
          <div className="welcome-form">
            <input
              onClick={() => this.firebaseLogin()}
              type="submit"
              value="Log In"
            />
            <input
              onClick={() => this.signUp()}
              type="submit"
              value="Sign Up"
            />
          </div>
          <div className="welcome-img" />
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  history: PropTypes.object,
  push: PropTypes.func,
};

export default withRouter(Welcome);
