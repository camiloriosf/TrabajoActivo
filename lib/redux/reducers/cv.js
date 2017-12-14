import update from 'immutability-helper';
import InitialState from '../initialState';
import {
  CV_LOAD_ALL,
  CV_LOAD,
  CV_RESET,
  CV_SECTIONS_UPDATE,
  CV_NAME_CHANGE,
  CV_SECTION_DATA_CHANGE,
  CV_ACTIVE_STATUS_CHANGE,
} from '../types';

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case CV_LOAD_ALL:
      return update(state, {
        data: { $set: payload },
      });
    case CV_ACTIVE_STATUS_CHANGE:
      return update(state, {
        data: {
          [payload.index]: {
            active: { $set: payload.value },
          },
        },
      });
    case CV_LOAD:
      return update(state, {
        editing: {
          id: { $set: payload.id },
          name: { $set: payload.name },
          sections: { $set: payload.sections },
        },
      });
    case CV_RESET:
      return update(state, {
        editing: {
          id: { $set: null },
          name: { $set: '' },
          sections: { $set: [] },
        },
      });
    case CV_SECTIONS_UPDATE:
      return update(state, {
        editing: {
          sections: { $set: payload },
        },
      });
    case CV_NAME_CHANGE:
      return update(state, {
        editing: {
          name: { $set: payload },
        },
      });
    case CV_SECTION_DATA_CHANGE:
      return update(state, {
        editing: {
          sections: { $set: payload },
        },
      });
    default: return state;
  }
};
