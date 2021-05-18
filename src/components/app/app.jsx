import React from "react";
import {useSelector} from "react-redux";

import {getTableType} from '../../store/reducers/work-process/selectors';

import Buttons from '../buttons/buttons';
import Table from '../table/table';

const App = () => {
  const tableType = useSelector(getTableType)
  return (
    <>
      {
      tableType ?
      <Table/> :
      <Buttons/>
      }
    </>
  )
};

export default App;
