import {createReducer} from "@reduxjs/toolkit";
import ActionType from './../../actions';

const initialState = {
  users: []
};

const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.LOAD_USERS, (state, action) => {
    state.users = action.payload;
  });

  builder.addCase(ActionType.ADD_USER, (state, action) => {
    state.users.unshift(action.payload);
  });
});

export default dataReducer;
