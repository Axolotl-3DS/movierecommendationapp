// import action types
import * as types from '../constants/actionTypes';

export const userLoggedInCreator = (username) => ({
  type: types.USER_LOGGED_IN,
  payload: username,
});

export const userLoggedOut = () => ({
  type: types.USER_LOGGED_OUT,
});
