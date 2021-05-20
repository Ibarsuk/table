import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {users} from "../../test-mock";
import * as fetchers from '../../store/api-actions';

import Table from "./table";

describe(`Table component works correctly`, () => {
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => () => {});
  jest.spyOn(fetchers, `fetchUsers`);
  it(`Render table-error component when users fetch failed`, () => {
    const store = configureStore()({
      DATA: {
        users: {
          data: users,
          loaded: true,
          error: true
        }
      },
      WORK_PROCESS: {
        tableType: null
      }
    });

    render(
      <redux.Provider store={store}>
        <Table/>
      </redux.Provider>
    );

    expect(screen.getByText(`Havent managed to load users`)).toBeInTheDocument();
  });

  it(`Render loading component when fetching`, () => {
    const store = configureStore()({
      DATA: {
        users: {
          data: [],
          loaded: false,
          error: false
        }
      },
      WORK_PROCESS: {
        tableType: null
      }
    });

    render(
      <redux.Provider store={store}>
        <Table/>
      </redux.Provider>
    );

    expect(screen.getByText(`Loading`, {exact: false})).toBeInTheDocument();
  });

  it(`Correct table render`, () => {
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
        <Table/>
      </redux.Provider>
    );

    expect(screen.getByText(users[0].id)).toBeInTheDocument();
    expect(screen.getByText(users[1].email)).toBeInTheDocument();
  });

  it(`Filtering works correctly`, () => {
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
        <Table/>
      </redux.Provider>
    );

    userEvent.type(screen.getByPlaceholderText(`Find in table`), `!!&^%(@//??)/.`)
    userEvent.click(screen.getByText(`Find`));

    expect(screen.queryByText(users[0].id)).not.toBeInTheDocument();
    expect(screen.queryByText(users[1].email)).not.toBeInTheDocument();
  });
});
