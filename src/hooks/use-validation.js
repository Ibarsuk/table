import {useState} from "react";
import {ValidationType, emailRe, phoneRe} from '../const';

const checkValidity = (type, value) => {
  if (value === null) {return null};
  if (value === ``) {return `Shouldn't be empty`};
  switch (type) {
    case ValidationType.NUMBER:
      if (isNaN(value)) {return `Should be a number`};
      if (!Number.isInteger(Number(value))) {return `Should be integer number`}
      return null;

    case ValidationType.STRING:
      return /^[a-zA-Z]+$/.test(value) ? null : `Should be a string without numbers and symbols`;

    case ValidationType.EMAIL:
      return emailRe.test(value) ? null : `Invalid email`;

    case ValidationType.PHONE:
      return phoneRe.test(value) ? null : `invalid phone number`;

    default:
      return null;
  }
};

const useValidation = (inputTypes) => {
  const getDefaultValues = () => {
    const defaultValues = Object.keys(inputTypes)
    .reduce((acc, curr) => {
      acc[curr] = null;
      return acc;
    }, {});

    return defaultValues;
  };

  const createInputMessages = (values) => {
    const preparedValues = values ? values : getDefaultValues();
    const messages = {};

    for (const [name, value] of Object.entries(preparedValues)) {
      messages[name] = checkValidity(inputTypes[name], value);
    };

    return messages;
  };

  const [errorMessages, setErrorMessages] = useState(createInputMessages());

  const validate = (inputValues) => setErrorMessages(createInputMessages(inputValues));

  return {
    validate,
    isValid: Object.values(errorMessages).every((message) => message === null),
    errorMessages
  };
};

export default useValidation;
