import React, {memo} from "react";
import PropTypes from "prop-types";

import style from './full-user-info.scss';

const FullUserInfo = ({
  firstName,
  lastName,
  description,
  address,
  onUserInfoClose
}) => {

  return (
    <div className={style.container}>
      <button type="button" className={style.closeButton} onClick={onUserInfoClose}>Close info</button>
      <p className={style.info}>Выбран пользователь <b>{firstName} {lastName}</b></p>
      <div className={style.info}>
        <p>Описание:</p>
        <p className={style.descriptionText}>{description}</p>
      </div>
      <p className={style.info}>Адрес проживания: <b>{address.streetAddress}</b></p>
      <p className={style.info}>Город: <b>{address.city}</b></p>
      <p className={style.info}>Провинция/штат: <b>{address.state}</b></p>
      <p className={style.info}>Индекс: <b>{address.zip}</b></p>
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

export default memo(FullUserInfo);
