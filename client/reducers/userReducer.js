import * as types from '../constants/actionTypes';

const initialState = {
  currentUser: 'junie',
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  let username;
  switch (action.type) {
    case types.USER_LOGGED_IN:
      username = action.payload;
      return {
        ...state,
        currentUser: username,
        loggedIn: true,
      };
    case types.USER_LOGGED_OUT:
      return {
        ...state,
        currentUser: '',
        loggedIn: false,
      };
    default: {
      return state;
    }
  }
};

export default userReducer;
