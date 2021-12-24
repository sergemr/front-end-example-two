import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Post from "./Post";
import { IPost } from "../../interfaces";

describe("<Post />", () => {
  afterEach(cleanup);

  test("it should mount", () => {
    const { getByTestId } = render(<Post />);
    const post = getByTestId("Post");

    expect(post).toBeInTheDocument();
  });
});
