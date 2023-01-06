import React from "react";
import { storiesOf } from "@storybook/react";

import { NestedComments } from "../components/NestedComments";

const stories = storiesOf("App test", module);

const commentAdded = (reply) => {
  console.log("this is the reply");
  console.log(reply);
};

stories.add("App", () => {
  let data = [
    {
      parent: 0,
      child: 1,
      comment: "root comment",
      name: "Ali",
    },
    {
      parent: 1,
      child: 2,
      comment: "Hello",
      name: "Nikhil",
    },
    {
      parent: 2,
      child: 3,
      comment: "Hello",
      name: "Zeel",
    },
    {
      parent: 1,
      child: 4,
      comment: "Yet another comment!",
      name: "Varun",
    },
    {
      parent: -1,
      child: 5,
      comment: "root comment1111",
      name: "Ali",
    },
    {
      parent: 5,
      child: 6,
      comment: "mah comment!!!",
      name: "Dark Master",
    },
    {
      parent: -1,
      child: 10,
      comment: "mah commentzzzzzzzzz!!!111",
      name: "Dark Master",
    },
    {
      parent: 7,
      child: 11,
      comment: "mah commentzzzzzzzzz!!!222",
      name: "Dark Master",
    },
    {
      parent: 1551,
      child: 500,
      comment: "mah commentzzzzzzzzz!!!4444",
      name: "Dark Master",
    },
    {
      parent: 1552,
      child: 503,
      comment: "mah commentzzzzzzzzz!!!4444",
      name: "Dark Master",
    },
    {
      parent: 1557,
      child: 509,
      comment: "mah commentzzzzzzzzz!!!4444",
      name: "Dark Master",
    },
    {
      parent: 1559,
      child: 5113,
      comment: "mah commentzzzzzzzzz!!!4444",
      name: "Dark Master",
    },
  ];

  return (
    <NestedComments
      data={data}
      commentAdded={commentAdded}
      userName={"Ali"}
      // paginationSize={5}
    />
  );
});
