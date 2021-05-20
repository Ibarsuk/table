import React, {memo, useState} from "react";
import PropTypes from "prop-types";

import style from './search.scss';

const Search = ({onFilter}) => {
  const [textToSearch, setTextToSearch] = useState(``);

  const handleFindButtonClick = () => onFilter(textToSearch);
  const handleResetButtonClick = () => {
    setTextToSearch(``);
    onFilter(null);
  };

  return (
    <div className={style.search}>
      <input
        type="text"
        name="search"
        className={style.searchInput}
        placeholder="Find in table"
        onChange={(evt) => setTextToSearch(evt.target.value)}
        value={textToSearch}
      />
      <button type="button" onClick={handleFindButtonClick} className={`${style.searchButton} ${style.searchButtonAccent}`}>Find</button>
      <button type="button" onClick={handleResetButtonClick} className={style.searchButton}>Reset</button>
    </div>
  );
};

Search.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default memo(Search);
