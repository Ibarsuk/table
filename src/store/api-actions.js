import {loadUsers} from './action-creators';
import {ApiRoutes} from './../const';

export const fetchUsers = (tableType) => (dispatch, _state, passedApi) => {
  passedApi.get(ApiRoutes[tableType])
    .then(({data}) => dispatch((loadUsers(data))))
}
