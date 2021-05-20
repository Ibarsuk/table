import React from "react";
import {render, screen} from "@testing-library/react";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {users} from '../../test-mock';
import * as fetchers from '../../store/api-actions';
import {TableType} from "../../const";

import App from "./app";

describe(`App component works correctly`, () => {
  it(`Render buttons when tableType is null`, () => {
    const store = configureStore()({
      DATA: {
        users: {
          data: users,
          loaded: true,
          error: false
        }
      },
      WORK_PROCESS: {
        tableType: null
      }
    });

    render(
      <redux.Provider store={store}>
        <App/>
      </redux.Provider>
    );

    expect(screen.getByText(`Long Table`)).toBeInTheDocument();
  });

  it(`Render Table when tableType is defined`, () => {
    const store = configureStore()({
      DATA: {
        users: {
          data: users,
          loaded: true,
          error: false
        }
      },
      WORK_PROCESS: {
        tableType: TableType.SMALL
      }
    });

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => () => {})
    jest.spyOn(fetchers, `fetchUsers`);

    render(
      <redux.Provider store={store}>
        <App/>
      </redux.Provider>
    );

    expect(screen.getByText(`id`)).toBeInTheDocument();
  });
});

