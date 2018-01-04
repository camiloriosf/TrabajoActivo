import update from 'immutability-helper';
import InitialState from '../initialState';
import {
  CV_SECTION_SELECTED_CHANGE,
  CV_NAV_CHANGE,
  CV_SNACK_CHANGE,
  CV_ACTION_DIALOG_OPEN,
  CV_BUTTONS_BLOCKED,
  CV_EDIT_DIALOG_OPEN,
  SETTINGS_SNACK_CHANGE,
  SETTINGS_USERNAME_UPDATE,
} from '../types';

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case CV_SECTION_SELECTED_CHANGE:
      return update(state, {
        cv: {
          selected: { $set: payload },
        },
      });
    case CV_NAV_CHANGE:
      return update(state, {
        cv: {
          first: { $set: payload.first },
          last: { $set: payload.last },
        },
      });
    case CV_SNACK_CHANGE:
      return update(state, {
        cv: {
          openSnackSaving: { $set: payload.openSnackSaving },
          openSnackSaved: { $set: payload.openSnackSaved },
          openSnackError: { $set: payload.openSnackError },
        },
      });
    case CV_ACTION_DIALOG_OPEN:
      return update(state, {
        cv: {
          dialog: {
            open: { $set: payload },
          },
        },
      });
    case CV_BUTTONS_BLOCKED:
      return update(state, {
        cv: {
          buttonsBlocked: { $set: payload },
        },
      });
    case CV_EDIT_DIALOG_OPEN:
      return update(state, {
        cv: {
          editDialog: { $set: payload },
        },
      });
    case SETTINGS_SNACK_CHANGE:
      return update(state, {
        settings: {
          openSnackSaving: { $set: payload.openSnackSaving },
          openSnackSaved: { $set: payload.openSnackSaved },
          openSnackError: { $set: payload.openSnackError },
        },
      });
    case SETTINGS_USERNAME_UPDATE:
      return update(state, {
        settings: {
          username: { $set: payload },
        },
      });
    default: return state;
  }
};
