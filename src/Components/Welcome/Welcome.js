import React, { Component } from 'react';
import firebase from 'firebase';
import { auth, provider } from '../../Utils/fire';

class Welcome extends Component {
  componentDidMount() {
    this.checkForUser();
  }

  checkForUser() {
    auth.onAuthStateChanged((user) => {
      console.log('user', user);
      if (user) {
        console.log('USERID', user.providerData[0].uid);

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

  firebaseLogin() {
    auth.signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
      })
      .catch(error => console.error(error));
  }

  // logout() {
  //   auth.signOut()
  //     .then(() => {
  //       this.props.activeUser({});
  //     });
  // }

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
            <input type="submit" value="Sign Up" />
          </div>
          <div className="welcome-img" />
        </div>
      </div>
    );
  }
}

export default Welcome;
