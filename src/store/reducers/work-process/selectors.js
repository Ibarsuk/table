import {reducerNameSpace} from '../root-reducer';

const currentReducerName = reducerNameSpace.WORK_PROCESS;

export const getTableType = (state) => state[currentReducerName].tableType;
