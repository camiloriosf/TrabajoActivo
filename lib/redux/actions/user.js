/* eslint-disable no-use-before-define */
import Router from 'next/router';
import axios from 'axios';
import {
  USER_UID_UPDATE,
  USER_NAME_UPDATE,
  USER_USERNAME_UPDATE,
  SETTINGS_SNACK_CHANGE,
  SETTINGS_USERNAME_UPDATE,
  USER_USERNAME_ORIG_UPDATE,
} from '../types';

import { app, db } from '../../google/firebase';

// update user data
export const doUpdateUID = ({
  uid,
  email,
  name = null,
  username = null,
  plan = null,
}) => (dispatch) => {
  dispatch({
    type: USER_UID_UPDATE,
    payload: {
      uid,
      email,
      name,
      username,
      plan,
    },
  });
};
// change user name
export const doChangeUserName = ({ name }) => (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.settings;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  dispatch({ type: USER_NAME_UPDATE, payload: name });
};
// change user username
export const doChangeUserUserName = ({ username }) => (dispatch) => {
  dispatch({ type: SETTINGS_USERNAME_UPDATE, payload: 1 });
  dispatch({ type: USER_USERNAME_UPDATE, payload: username });
};
// change user password
export const doChangeUserPassword = ({
  oldPassword, newPassword,
}) => async (dispatch, getState) => {
  try {
    const { openSnackSaving } = getState().ui.settings;
    if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
    const user = app.auth().currentUser;
    const credential = app.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword,
    );
    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPassword);
    dispatch(doChangeSnack({ openSnackSaved: true }));
  } catch (error) {
    dispatch(doChangeSnack({ openSnackError: true }));
  }
};
// delete account
export const doDeleteAccount = () => async (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.settings;
  const { uid } = getState().user;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const response = await axios({
    method: 'post',
    url: 'https://us-central1-ecv-bittersweet-e17ad.cloudfunctions.net/disableUser',
    data: { uid },
  });
  if (response.status === 200) {
    dispatch(doChangeSnack({ openSnackSaved: true }));
    Router.push('/logout');
    return;
  }
  dispatch(doChangeSnack({ openSnackError: true }));
};
// save user name to DB
export const doSaveUserNameToDB = () => async (dispatch, getState) => {
  const { uid, name } = getState().user;
  const { openSnackSaving } = getState().ui.settings;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));

  db.collection('users').doc(uid)
    .update({
      name,
    })
    .then(() => {
      dispatch(doChangeSnack({ openSnackSaved: true }));
    })
    .catch(() => {
      dispatch(doChangeSnack({ openSnackError: true }));
    });
};
// save user username to DB
export const doSaveUserUserNameToDB = () => async (dispatch, getState) => {
  const { uid, username, usernameOrig } = getState().user;
  if (username === usernameOrig) {
    dispatch({ type: SETTINGS_USERNAME_UPDATE, payload: 3 });
    return;
  }
  const { openSnackSaving } = getState().ui.settings;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const response = await axios({
    method: 'post',
    url: 'https://us-central1-ecv-bittersweet-e17ad.cloudfunctions.net/checkUsername',
    data: { username },
  });
  const { available } = response.data;
  if (available && username) {
    dispatch({ type: SETTINGS_USERNAME_UPDATE, payload: 3 });
  } else {
    dispatch({ type: SETTINGS_USERNAME_UPDATE, payload: 2 });
    dispatch(doChangeSnack({ openSnackError: true }));
    return;
  }

  db.collection('users').doc(uid)
    .update({
      username,
    })
    .then(() => {
      dispatch(doChangeSnack({ openSnackSaved: true }));
      dispatch({ type: USER_USERNAME_ORIG_UPDATE, payload: username });
    })
    .catch(() => {
      dispatch(doChangeSnack({ openSnackError: true }));
    });
};
// show/hide snacks
export const doChangeSnack = ({
  openSnackSaving = false, openSnackSaved = false, openSnackError = false,
}) => async (dispatch) => {
  dispatch({
    type: SETTINGS_SNACK_CHANGE,
    payload: { openSnackSaving, openSnackSaved, openSnackError },
  });
};
