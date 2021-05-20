import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {userInfo} from '../../test-mock';

import TableRow from './table-row';

describe(`TableRow component works correctly`, () => {
  it(`Correct render`, () => {

    render(
      <TableRow {...userInfo} onRowClick={jest.fn()}/>
    );

    expect(screen.getByText(userInfo.id)).toBeInTheDocument();
    expect(screen.getByText(userInfo.firstName, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(userInfo.email)).toBeInTheDocument();
    expect(screen.getByText(userInfo.phone)).toBeInTheDocument();
  });

  it(`onRowClick callback is called`, () => {
    const onRowClick = jest.fn();

    render(
      <TableRow {...userInfo} onRowClick={onRowClick}/>
    );

    userEvent.click(screen.getByText(userInfo.id))
    expect(onRowClick).toHaveBeenCalled();
  });
});
