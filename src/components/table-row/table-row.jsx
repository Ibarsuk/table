import React from "react";
import PropTypes from "prop-types";

const TableRow = ({
  id,
  firstName,
  lastName,
  email,
  phone
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default TableRow;
