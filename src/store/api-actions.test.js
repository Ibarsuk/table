import {fetchUsers} from './api-actions';
import MockAdapter from "axios-mock-adapter";
import api from '../api';
import {users} from '../test-mock';
import {ApiRoutes, TableType} from '../const';
import ActionType from './actions';

describe(`Async operations work correctly`, () => {
  const apiMock = new MockAdapter(api);

  it(`Should make a correct API call to get users`, () => {
    const dispatch = jest.fn();
    const mockUsers = users;

    apiMock
    .onGet(ApiRoutes[TableType.SMALL])
    .reply(200, mockUsers);

    const usersLoader = fetchUsers(TableType.SMALL);

    return usersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USERS_FETCH_STATUS,
          payload: false
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_USERS,
          payload: mockUsers
        });
      });

  });

  it(`Should make a correct API call to get a big amount of users`, () => {
    const dispatch = jest.fn();
    const mockUsers = users;

    apiMock
    .onGet(ApiRoutes[TableType.BIG])
    .reply(200, mockUsers);

    const usersLoader = fetchUsers(TableType.BIG);

    return usersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USERS_FETCH_STATUS,
          payload: false
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_USERS,
          payload: mockUsers
        });
      });

  });
});
