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
      parentId: 100,
      userId: 1,
      childId: 0,
      comment: "Hey everyone Wassup!!",
      name: "Ali",
      color: "red",
    },
    {
      parentId: 99,
      childId: 10,
      userId: 2,
      comment: "Blah Blah!!!",
      name: "Zeel",
      color: "blue",
    },
    {
      parentId: 9,
      childId: 1,
      userId: 3,
      comment: "Hello!!",
      name: "Nikhil",
    },
    {
      parentId: 0,
      childId: 11,
      userId: 2,
      comment: "Wassup!!!!",
      name: "Zeel",
    },
    {
      parentId: 11,
      childId: 12,
      userId: 3,
      comment: "What????!!!",
      name: "Nikhil",
    },
    {
      parentId: 77,
      childId: 55,
      userId: 1,
      comment: ":)",
      name: "Ali",
    },
  ];

  return (
    <NestedComments
      data={data}
      commentAdded={commentAdded}
      userName={"Ali"}
      paginationSize={3}
    />
  );
});
