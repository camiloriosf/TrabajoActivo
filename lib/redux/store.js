import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import InitialState from './initialState';
import user from './reducers/user';
import cv from './reducers/cv';
import ui from './reducers/ui';

const loggerMiddleware = createLogger({
  collapsed: true,
});

export default (initialState = InitialState) =>
  createStore(
    combineReducers({
      user,
      cv,
      ui,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    )),
  );
