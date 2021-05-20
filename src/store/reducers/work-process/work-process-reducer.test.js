import workProcessReducer from './work-process-reducer';
import ActionType from '../../actions';
import {TableType} from '../../../const';

const initialState = {
  tableType: null
};

describe(`Work process reducer works correctly`, () => {
  it(`Reducer should set table type`, () => {

    const action = {
      type: ActionType.CHANGE_TABLE_TYPE,
      payload: TableType.SMALL
    };

    const expectedState = {
      tableType: TableType.SMALL
    };

    expect(workProcessReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(workProcessReducer(undefined, {})).toEqual(initialState);
  });
});
