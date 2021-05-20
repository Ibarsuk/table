import React from "react";
import TableError from "./table-error";
import userEvent from "@testing-library/user-event"

import {render, screen} from "@testing-library/react";

describe(`Table-error component works correctly`, () => {
  it(`Correct render`, () => {
    render(<TableError onCloseButtonClick={jest.fn()}/>);

    expect(screen.getByText(`Havent managed to load users`)).toBeInTheDocument();
  });

  it(`onCloseButtonClick is called on click`, () => {
    const onCloseButtonClick = jest.fn();

    render(<TableError onCloseButtonClick={onCloseButtonClick}/>);

    userEvent.click(screen.getByText(`Close`));
    expect(onCloseButtonClick).toBeCalledTimes(1);
  });
});

