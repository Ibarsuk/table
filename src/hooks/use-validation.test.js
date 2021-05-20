import useValidation from './use-validation';
import {act, renderHook} from "@testing-library/react-hooks";

import {ValidationType} from '../const';

const inputTypes = {
  id: ValidationType.NUMBER,
  firstName: ValidationType.STRING,
  lastName: ValidationType.STRING,
  email: ValidationType.EMAIL,
  phone: ValidationType.PHONE
};

const validMessages = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
};

const invalidMessages = {
  email: "Invalid email",
  firstName: "Should be a string without numbers and symbols",
  id: "Should be integer number",
  lastName: "Should be a string without numbers and symbols",
  phone: "Invalid phone number"
};

const invalidData = {
  email: "qwe@a.",
  firstName: "12!!3",
  id: "0.5",
  lastName: "456",
  phone: "800a55"
};

const validData = {
  email: "user@imail.com",
  firstName: "Iggy",
  id: "55",
  lastName: "ValidLastName",
  phone: "1234567890"
};

it(`Hook useValidation works correctly`, () => {
  const {result} = renderHook(() => useValidation(inputTypes));
  const {validate} = result.current;

  expect(result.current.errorMessages).toEqual(validMessages);

  let isValid;
  act(() => {
    isValid = validate(invalidData);
  });

  expect(isValid).toBe(false);
  expect(result.current.errorMessages).toEqual(invalidMessages);

  act(() => {
    isValid = validate(validData);
  });

  expect(isValid).toBe(true);
  expect(result.current.errorMessages).toEqual(validMessages);
});
