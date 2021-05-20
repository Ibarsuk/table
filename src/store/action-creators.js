import {createAction} from "@reduxjs/toolkit";
import ActionType from './actions';

export const changeTableType = createAction(ActionType.CHANGE_TABLE_TYPE, (payload) => ({
  payload
}));

export const loadUsers = createAction(ActionType.LOAD_USERS, (payload) => ({
  payload
}));

export const addUser = createAction(ActionType.ADD_USER, (payload) => ({
  payload
}));

export const setUsersFetchStatus = createAction(ActionType.SET_USERS_FETCH_STATUS, (payload) => ({
  payload
}));
