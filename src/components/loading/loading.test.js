import React from "react";
import {render, screen} from "@testing-library/react";

import Loading from "./loading";

it(`Loading component renders correctly`, () => {
  render(<Loading/>);

  expect(screen.getByText(`Loading`, {exact: false})).toBeInTheDocument();
});
