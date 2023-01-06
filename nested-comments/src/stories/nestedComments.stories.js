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
      parent: -1,
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
      comment: "mah commentzzzzzzzzz!!!",
      name: "Dark Master",
    },
  ];

  return (
    <NestedComments
      data={data}
      commentAdded={commentAdded}
      userName={"Ali"}
      rootId={-1}
      paginationSize={5}
    />
  );
});
