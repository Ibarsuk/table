import React, {memo, useState} from "react";
import PropTypes from "prop-types";

const Search = ({onFilter}) => {
  const [textToSearch, setTextToSearch] = useState(``);

  const handleFindButtonClick = () => onFilter(textToSearch);
  const handleResetButtonClick = () => {
    setTextToSearch(``);
    onFilter(null);
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Find in table"
        onChange={(evt) => setTextToSearch(evt.target.value)}
        value={textToSearch}
      />
      <button type="button" onClick={handleFindButtonClick}>Find</button>
      <button type="button" onClick={handleResetButtonClick}>Reset</button>
    </div>
  );
};

Search.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default memo(Search);
