import InitialState from '../initialState';
import { USER_UID_UPDATE } from '../types';

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case USER_UID_UPDATE:
      return Object.assign({}, state, { uid: payload.uid, email: payload.email });
    default: return state;
  }
};
