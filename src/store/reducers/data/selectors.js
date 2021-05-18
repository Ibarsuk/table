import {reducerNameSpace} from '../root-reducer';

const currentReducerName = reducerNameSpace.DATA;

export const getUsers = (state) => state[currentReducerName].users.data;

export const getIfUsersLoaded = (state) => state[currentReducerName].users.loaded;
