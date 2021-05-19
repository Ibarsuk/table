import {createReducer} from "@reduxjs/toolkit";
import ActionType from './../../actions';

const initialState = {
  users: {
    data: [],
    loaded: false,
    error: false
  }
};

const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.LOAD_USERS, (state, action) => {
    state.users.data = action.payload;
    state.users.loaded = true;
    state.users.error = false;
  });

  builder.addCase(ActionType.ADD_USER, (state, action) => {
    state.users.data.unshift(action.payload);
  });

  builder.addCase(ActionType.SET_USERS_FETCH_FAIL, (state) => {
    state.users.error = true;
  })
});

export default dataReducer;
