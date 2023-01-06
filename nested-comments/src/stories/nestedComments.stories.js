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
      parent: 100,
      child: 0,
      comment: "Hey everyone Wassup!!",
      name: "Ali",
    },
    {
      parent: 99,
      child: 10,
      comment: "Blah Blah!!!",
      name: "Zeel",
    },
    {
      parent: 9,
      child: 1,
      comment: "Hello!!",
      name: "Nikhil",
    },
    {
      parent: 0,
      child: 11,
      comment: "Wassup!!!!",
      name: "Zeel",
    },
    {
      parent: 11,
      child: 12,
      comment: "What????!!!",
      name: "Nikhil",
    },
    {
      parent: 77,
      child: 55,
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
