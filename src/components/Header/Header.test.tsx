import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("<Header />", () => {
  afterEach(cleanup);
  let tmpFn = jest.fn();
  test("it should mount", () => {
    const { getByTestId } = render(
      <Header setShouldLoginOpen={tmpFn} handleToggleFavs={tmpFn} />
    );
    const header = getByTestId("Header");

    expect(header).toBeInTheDocument();
  });
});
