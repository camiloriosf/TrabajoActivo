import update from 'immutability-helper';
import InitialState from '../initialState';
import {
  CV_UPDATE_DATA, CV_CHANGE_ACTIVE, CV_BLOCK_BUTTONS,
  CV_CREATE_GET_DATA, CV_CREATE_RESET_DATA, CV_CREATE_CHANGE_SELECTED,
  CV_CREATE_UPDATE_DATA, CV_CREATE_CHANGE_NAV,
  CV_CREATE_SNACKS, CV_CREATE_CHANGE_NAME,
} from '../types';

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case CV_UPDATE_DATA:
      return update(state, {
        data: { $set: payload },
      });
    case CV_CHANGE_ACTIVE:
      return update(state, {
        data: {
          [payload.index]: {
            active: { $set: payload.value },
          },
        },
      });
    case CV_BLOCK_BUTTONS:
      return update(state, {
        buttonsBlocked: { $set: payload },
      });
    case CV_CREATE_GET_DATA:
      return update(state, {
        create: {
          id: { $set: payload.id },
          name: { $set: payload.name },
          sections: { $set: payload.sections },
        },
      });
    case CV_CREATE_RESET_DATA:
      return update(state, {
        create: {
          id: { $set: null },
          name: { $set: '' },
          sections: { $set: [] },
        },
      });
    case CV_CREATE_CHANGE_SELECTED:
      return update(state, {
        create: {
          selected: { $set: payload },
        },
      });
    case CV_CREATE_UPDATE_DATA:
      return update(state, {
        create: {
          sections: { $set: payload },
        },
      });
    case CV_CREATE_CHANGE_NAV:
      return update(state, {
        create: {
          first: { $set: payload.first },
          last: { $set: payload.last },
        },
      });
    case CV_CREATE_SNACKS:
      return update(state, {
        create: {
          openSnackSaving: { $set: payload.openSnackSaving },
          openSnackSaved: { $set: payload.openSnackSaved },
          openSnackError: { $set: payload.openSnackError },
        },
      });
    case CV_CREATE_CHANGE_NAME:
      return update(state, {
        create: {
          name: { $set: payload },
        },
      });
    default: return state;
  }
};
