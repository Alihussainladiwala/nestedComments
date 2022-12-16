import React from "react";
import { storiesOf } from "@storybook/react";

import {NestedComments}  from "../components/NestedComments";

const stories = storiesOf('App test', module)



stories.add('App', ()=>{
     let data1 = {
          id: 0,
          comment: "Hello everyone",
          name: "Ali",
          children: [
            {
              id: 1,
              name: "Varun",
              comment: "Wassup!",
              children: [],
            },
            {
              id: 2,
              name: "Zeel",
              comment: "I am cooool",
              children: [],
            },
            {
              id: 3,
              name: "Jagtap",
              comment: "cool cool",
              children: [
                {
                  id: 4,
                  name: "Sai",
                  comment: "coolzzz",
                  children: [],
                },
              ],
            },
          ],
        };

     return (<NestedComments data={data1}/>);
})