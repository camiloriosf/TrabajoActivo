/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getUserData = state => state.user;

export const getUserDataState = createSelector(
  [getUserData],
  user => user,
);
