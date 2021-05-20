import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {TableType} from "../../const";
import {changeTableType} from "../../store/action-creators";

import Buttons from "./buttons";

describe(`Loading component works correctly`, () => {
  it(`Correct render`, () => {
    const store = configureStore()({});

    render(
      <redux.Provider store={store}>
        <Buttons/>
      </redux.Provider>
    );

    expect(screen.getByText(`Long Table`)).toBeInTheDocument();
  });

  it(`Buttons work correctly`, () => {
    const store = configureStore()({});
    const dispatch = jest.fn();
    jest.spyOn(redux, `useDispatch`).mockImplementation(() => dispatch);

    render(
      <redux.Provider store={store}>
        <Buttons/>
      </redux.Provider>
    );

    userEvent.click(screen.getByText(`Long Table`))
    expect(dispatch).toHaveBeenNthCalledWith(1, changeTableType(TableType.BIG))

    userEvent.click(screen.getByText(`Table`))
    expect(dispatch).toHaveBeenNthCalledWith(2, changeTableType(TableType.SMALL))
  });
});
