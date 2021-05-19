import React from "react";
import {useDispatch} from "react-redux";
import {TableType} from "../../const";
import {changeTableType} from "../../store/action-creators";

import style from './buttons.style.scss';

const Buttons = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (tableType) => () => dispatch(changeTableType(tableType))

  return (
    <div className={style.wrapper}>
      <button type="button" onClick={handleButtonClick(TableType.SMALL)} className={style.mainButton}>Table</button>
      <button type="button" onClick={handleButtonClick(TableType.BIG)} className={style.mainButton}>Long Table</button>
    </div>
  );
};

export default Buttons;
