import React from "react";
import {getByDisplayValue, getByText, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Search from "./search";

describe(`Loading component works correctly`, () => {
  it(`Correct render`, () => {
    render(<Search onFilter={jest.fn()}/>);

    expect(screen.getByText(`Find`)).toBeInTheDocument();
  });

  it(`onFilter callback is called`, () => {
    const onFilter = jest.fn();
    const text = `!h/cvf,b`;

    render(<Search onFilter={onFilter}/>);

    userEvent.type(screen.getByPlaceholderText(`Find in table`), text);
    userEvent.click(screen.getByText(`Find`));

    expect(onFilter).toHaveBeenCalledWith(text);
  });

  it(`Reset button works correctly`, () => {
    const text = `!h/cvf,b`;

    const {container} = render(<Search onFilter={jest.fn()}/>);

    userEvent.type(screen.getByPlaceholderText(`Find in table`), text);
    expect(screen.getByDisplayValue(text)).toBeInTheDocument();

    userEvent.click(screen.getByText(`Reset`));
    expect(container.querySelector(`#search-input`).value).toBe(``);
  });
});
