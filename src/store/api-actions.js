import {loadUsers, setUsersFetchStatus} from './action-creators';
import {ApiRoutes} from './../const';

export const fetchUsers = (tableType) => (dispatch, _state, passedApi) => {
  dispatch(setUsersFetchStatus(false));
  return passedApi.get(ApiRoutes[tableType])
    .then(({data}) => dispatch(loadUsers(data)))
    .catch(() => dispatch(setUsersFetchStatus(true)));
};
