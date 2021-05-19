import React from "react";
import PropTypes from "prop-types";

const FullUserInfo = ({
  firstName,
  lastName,
  description,
  address,
  onUserInfoClose
}) => {

  return (
    <div>
      <p>Выбран пользователь <b>{firstName} {lastName}</b></p>
      <p>Описание:</p>
      <textarea value={description} readOnly></textarea>
      <p>Адрес проживания: <b>{address.streetAddress}</b></p>
      <p>Город: <b>{address.city}</b></p>
      <p>Провинция/штат: <b>{address.state}</b></p>
      <p>Индекс: <b>{address.zip}</b></p>

      <button type="button" onClick={onUserInfoClose}>Close info</button>
    </div>
  );
};

FullUserInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.shape({
    streetAddress: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		zip: PropTypes.string.isRequired
  }),
  onUserInfoClose: PropTypes.func.isRequired
};

export default FullUserInfo;
