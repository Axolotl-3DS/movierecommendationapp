import * as types from "../constants/actionTypes";

const initialState = {
  listOfFavs: [],
};

const favsReducer = (state = initialState, action) => {
  let copy;
  switch (action.type) {
    case types.SAVE_ID_TO_FAVS:
      copy = state.listOfFavs.slice();
      copy.push(action.payload);
      return {
        ...state,
        listOfFavs: copy,
      };
    case types.REMOVE_ID_FROM_FAVS:
      copy = state.listOfFavs.slice();
      copy = copy.filter((id) => id === action.payload);
      return {
        ...state,
        listOfFavs: copy,
      };
    default: {
      return state;
    }
  }
};

export default favsReducer;
