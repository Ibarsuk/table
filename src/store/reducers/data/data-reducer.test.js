import dataReducer from './data-reducer';
import ActionType from '../../actions';

const initialState = {
  users: {
    data: [],
    loaded: false,
    error: false
  }
};

describe(`Data reducer works correctly`, () => {
  it(`Reducer should set users and change loaded status`, () => {
    const users = [{id: 0, name: `name`}, {id: 44, name: `NAME`}];

    const action = {
      type: ActionType.LOAD_USERS,
      payload: users
    };

    const expectedState = {
      users: {
        data: users,
        loaded: true,
        error: false
      }
    };

    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer should add user`, () => {
    const user = {id: 0, name: `name`};

    const action = {
      type: ActionType.ADD_USER,
      payload: user
    };

    const expectedState = {
      users: {
        data: [user],
        loaded: false,
        error: false
      }
    };

    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer should set users fetch status`, () => {

    const action = {
      type: ActionType.SET_USERS_FETCH_STATUS,
      payload: true
    };

    const expectedState = {
      users: {
        data: [],
        loaded: false,
        error: true
      }
    };

    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });
});
