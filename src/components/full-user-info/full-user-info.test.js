import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {userInfo} from '../../test-mock';

import FullUserInfo from './full-user-info';

describe(`Loading component works correctly`, () => {
  it(`Correct render`, () => {

    render(
      <FullUserInfo {...userInfo} onUserInfoClose={jest.fn()}/>
    );

    expect(screen.getByText(userInfo.description)).toBeInTheDocument();
    expect(screen.getByText(userInfo.firstName, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(userInfo.address.city)).toBeInTheDocument();
    expect(screen.getByText(userInfo.address.zip)).toBeInTheDocument();
  });

  it(`Close button works correctly`, () => {
    const onCloseButtonClick = jest.fn();

    render(
      <FullUserInfo {...userInfo} onUserInfoClose={onCloseButtonClick}/>
    );

    userEvent.click(screen.getByText(`Close info`))
    expect(onCloseButtonClick).toHaveBeenCalled();
  });
});
