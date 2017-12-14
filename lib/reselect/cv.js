/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getCVSData = state => ({
  data: state.cv.data,
});

export const getCVSDataState = createSelector(
  [getCVSData],
  cv => cv,
);

const getSectionData = (state, props) => {
  const section = state.cv.editing.sections.find(b => b.id === props.id);
  const data = !section.data ? [] : section.data;
  return {
    id: section.id,
    data,
  };
};
export const makeGetSectionDataState = () => createSelector(
  getSectionData,
  cv => ({ cv }),
);

const getCVData = state => state.cv.editing;

export const getCVDataState = createSelector(
  [getCVData],
  cv => cv,
);

const getCVUI = state => state.ui.cv;

export const getCVUIState = createSelector(
  [getCVUI],
  ui => ui,
);
