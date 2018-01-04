import firebase, { firestore } from 'firebase';
import 'firebase/firestore';
import config from './config';

const app = firebase;
if (!firebase.apps.length) {
  app.initializeApp(config);
}
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

const db = firebase.firestore();

export { app, db, googleProvider, facebookProvider, twitterProvider };
