/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getSettingsUI = state => state.ui.settings;

export const getSettingsUIState = createSelector(
  [getSettingsUI],
  ui => ui,
);
