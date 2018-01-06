import React, { Component } from 'react';
import firebase from 'firebase';
import { auth, provider } from '../../Utils/fire';

class Welcome extends Component {
  componentDidMount() {
    this.checkForUser();
  }

  checkForUser() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user.providerData[0].uid;
        fetch(`/api/v1/users/${uid}`)
          .then(response => response.json())
          .then(parsedData => console.log('checkedUserData', parsedData))
          .catch(error => console.error(error));
        // const cleanedUser = this.cleanUserData(user);
      }
    });
  }

  cleanUserData(user) {
    return {
      userId: user.uid,
      displayName: user.displayName.split(' ')[0],
      email: user.email,
      competitions: [],
    };
  }

  signUp() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user.providerData[0].uid;
        fetch(`/api/v1/users/${uid}`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(parsedData => console.log('signUpData', parsedData))
          .catch(error => console.error(error));
      }
    });
  }

  firebaseLogin() {
    auth.signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
      })
      .catch(error => console.error(error));
  }

  logout(user) {
    auth.signOut()
      .then(() => console.log('use signed out'))
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

export default Welcome;
