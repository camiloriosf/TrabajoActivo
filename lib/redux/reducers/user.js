import update from 'immutability-helper';
import InitialState from '../initialState';
import {
  USER_UID_UPDATE,
  USER_NAME_UPDATE,
  USER_USERNAME_UPDATE,
  USER_USERNAME_ORIG_UPDATE,
} from '../types';

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case USER_UID_UPDATE:
      return update(state, {
        uid: { $set: payload.uid },
        email: { $set: payload.email },
        name: { $set: payload.name },
        username: { $set: payload.username },
        usernameOrig: { $set: payload.username },
        plan: { $set: payload.plan },
      });
    case USER_NAME_UPDATE:
      return update(state, {
        name: { $set: payload },
      });
    case USER_USERNAME_UPDATE:
      return update(state, {
        username: { $set: payload },
      });
    case USER_USERNAME_ORIG_UPDATE:
      return update(state, {
        usernameOrig: { $set: payload },
      });
    default:
      return state;
  }
};
