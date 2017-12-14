import { USER_UID_UPDATE } from '../types';
/* eslint-disable import/prefer-default-export */

export const doUpdateUID = ({ uid, email }) => (dispatch) => {
  dispatch({ type: USER_UID_UPDATE, payload: { uid, email } });
};
