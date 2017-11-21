import firebase from 'firebase';
import 'firebase/firestore';
import config from './config';

const app = firebase;
if (!firebase.apps.length) {
  app.initializeApp(config);
}
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const db = firebase.firestore();

export { app, db, facebookProvider };
