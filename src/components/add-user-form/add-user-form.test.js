import React from "react";
import userEvent from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import * as useValidation from '../../hooks/use-validation';

import AddUserForm from "./add-user-form";

describe(`AddUserForm component works correctly`, () => {
  const store = configureStore()({});
  it(`correct render`, () => {
    jest.spyOn(redux, `useDispatch`);
    render(
      <redux.Provider store={store}>
        <AddUserForm/>
      </redux.Provider>
    );

    expect(screen.getByText(`Add user`)).toBeInTheDocument();
  });

  it(`Form opens`, () => {

    render(
      <redux.Provider store={store}>
        <AddUserForm/>
      </redux.Provider>
    );

    userEvent.click(screen.getByText(`Add user`));
    expect(screen.getByText(`Add to table`)).toBeInTheDocument();
  });

  it(`Correct submit`, () => {
    const validate = jest.fn().mockImplementation(() => true);
    const dispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => dispatch);
    jest.spyOn(useValidation, `default`).mockImplementation(() => ({
      validate,
      errorMessages: {}
    }))

    render(
      <redux.Provider store={store}>
        <AddUserForm/>
      </redux.Provider>
    );

    userEvent.click(screen.getByText(`Add user`));

    userEvent.type(screen.getByPlaceholderText(`id`), `123`);
    userEvent.type(screen.getByPlaceholderText(`First name`), `test-text`);
    userEvent.type(screen.getByPlaceholderText(`Last name`), `test-text`);
    userEvent.type(screen.getByPlaceholderText(`Email`), `test-text`);
    userEvent.type(screen.getByPlaceholderText(`Phone number`), `test-text`);

    userEvent.click(screen.getByText(`Add to table`));
    expect(validate).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
