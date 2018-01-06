import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAWVd2nhHmPdVii9zmiRfKlSlsR75G_lv0',
  authDomain: 'squad-goals-lf-jmb.firebaseapp.com',
  databaseURL: 'https://squad-goals-lf-jmb.firebaseio.com',
  projectId: 'squad-goals-lf-jmb',
  storageBucket: 'squad-goals-lf-jmb.appspot.com',
  messagingSenderId: '990288816747',
};

firebase.initializeApp(config);


export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
