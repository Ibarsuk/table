import {createReducer} from "@reduxjs/toolkit";
import ActionType from './actions';

const initialState = {
  tableType: null,
  users: []
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.CHANGE_TABLE_TYPE, (state, action) => {
    state.tableType = action.payload;
  });

  builder.addCase(ActionType.LOAD_USERS, (state, action) => {
    state.users = action.payload;
  })

  builder.addCase(ActionType.ADD_USER, (state, action) => {
    state.users.unshift(action.payload);
  })
})

export default reducer;
