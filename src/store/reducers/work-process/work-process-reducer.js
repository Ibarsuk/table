import {createReducer} from "@reduxjs/toolkit";
import ActionType from './../../actions';

const initialState = {
  tableType: null
};

const workProcessReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.CHANGE_TABLE_TYPE, (state, action) => {
    state.tableType = action.payload;
  });
});

export default workProcessReducer;
