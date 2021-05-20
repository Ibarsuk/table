import React from "react";
import PropTypes from "prop-types";

import style from './table-error.scss';

const TableError = ({onCloseButtonClick}) => (
  <div className={style.error}>
    <h2 className={style.errorText}>Havent managed to load users</h2>
    <button type="button" className={style.closeButton} onClick={onCloseButtonClick}>Close</button>
  </div>
);

TableError.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired
};

export default TableError;
