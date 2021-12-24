import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostThumbnail from "./PostThumbnail";
import { IPost } from "../../interfaces";

describe("<PostThumbnail />", () => {
  afterEach(cleanup);
  let tmpPost: IPost = {
    id: 1,
    title: "Post title",
    subtitle: "Post title",

    content: "Post content",
    isFavorite: false,
    image: "Post content",
    date: Date.now(),
    author: "author",
    price: "$49/mo",
    tagColor: "#DF4759",
  };
  let tmpSetShouldLoginOpen = jest.fn();
  test("it should mount", () => {
    const { getByTestId } = render(
      <PostThumbnail
        setShouldLoginOpen={tmpSetShouldLoginOpen}
        postData={tmpPost}
      />
    );
    const postThumbnail = getByTestId("PostThumbnail");

    expect(postThumbnail).toBeInTheDocument();
  });
});
