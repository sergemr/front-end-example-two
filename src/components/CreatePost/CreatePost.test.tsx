import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreatePost from "./CreatePost";

describe("<CreatePost />", () => {
  afterEach(cleanup);

  test("it should mount", () => {
    let tmpFn = jest.fn();
    const { getByTestId } = render(<CreatePost setShouldLoginOpen={tmpFn} />);
    const createPost = getByTestId("CreatePost");

    expect(createPost).toBeInTheDocument();
  });
});
