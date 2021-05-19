import React from "react";
import {useDispatch} from "react-redux";
import {TableType} from "../../const";
import {changeTableType} from "../../store/action-creators";

const Buttons = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (tableType) => () => dispatch(changeTableType(tableType))

  return (
    <div>
      <button type="button" onClick={handleButtonClick(TableType.SMALL)}>Table</button>
      <button type="button" onClick={handleButtonClick(TableType.BIG)}>Long Table</button>
    </div>
  );
};

export default Buttons;
