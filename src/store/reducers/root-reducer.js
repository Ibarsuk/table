import {combineReducers} from "@reduxjs/toolkit";

import dataReducer from './data/data-reducer';
import workProcessReducer from './work-process/work-process-reducer';

export const reducerNameSpace = {
  DATA: `DATA`,
  WORK_PROCESS: `WORK_PROCESS`
};

export default combineReducers({
  [reducerNameSpace.DATA]: dataReducer,
  [reducerNameSpace.WORK_PROCESS]: workProcessReducer
})
