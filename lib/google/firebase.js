import firebase from 'firebase';
import config from './config';

const app = firebase;
if (!firebase.apps.length) {
  app.initializeApp(config);
}
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app, facebookProvider };
