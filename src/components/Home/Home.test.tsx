import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";

describe("<Home />", () => {
  afterEach(cleanup);

  test("it should mount", () => {
    let tmpShowFavs = false;
    let tmpSetShouldLoginOpen = jest.fn();
    const { getByTestId } = render(
      <Home showOnlyFavs={false} setShouldLoginOpen={tmpSetShouldLoginOpen} />
    );
    const home = getByTestId("Home");

    expect(home).toBeInTheDocument();
  });
});
