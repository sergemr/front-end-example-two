import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";

describe("<Login />", () => {
  afterEach(cleanup);

  test("it should mount", () => {
    let fn = jest.fn();
    let shouldLoginOpen = false;
    const { getByTestId } = render(
      <Login
        setShouldLoginOpen={fn}
        shouldLoginOpen={shouldLoginOpen}
        setUser={fn}
      />
    );
    const login = getByTestId("Login");

    expect(login).toBeInTheDocument();
  });
});
