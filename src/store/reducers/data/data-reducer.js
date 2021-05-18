import {createReducer} from "@reduxjs/toolkit";
import ActionType from './../../actions';

const initialState = {
  users: {
    data: [],
    loaded: false
  }
};

const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.LOAD_USERS, (state, action) => {
    state.users.data = action.payload;
    state.users.loaded = true;
  });

  builder.addCase(ActionType.ADD_USER, (state, action) => {
    state.users.data.unshift(action.payload);
  });
});

export default dataReducer;
