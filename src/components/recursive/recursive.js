import React from "react";
import { useState } from "react";
import ReplyBox from "../replyBox/ReplyBox";
import "./recursive.css"
import { v4 as uuid } from 'uuid';



function Recursive() {
  let data = {children: [], id: 0}
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

  let [treeData, setTreeData] = useState(data);
  // let [treeKey, setTreeKey] = useState(0);

  let Recurse = ({ root, callBack }) => {
    let [showComments, setShowComments] = useState(false);
    let [showTextBox, setShowTextBox] = useState(false);
    let [reply, setReply] = useState("");
    let [treeKey, setTreeKey] = useState(root.id);
    let [loadLimit, setLoadLimit] = useState(2);

    // console.log(root)

    const onReply = (reply) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0,8)

      root.children.unshift({
        id: small_id,
        name: "Ali",
        comment: reply,
        children: [],
      });
      setReply("");
      setShowComments(true);
      setShowTextBox(false);
      setTreeKey(small_id);

      console.log(root)
    };


    

    return (
      <div>
        {/* <ReplyBox onReply={()=>onReply()}></ReplyBox> */}
        {root.id === 0 && <ReplyBox onReply={(reply)=>onReply(reply)} ></ReplyBox>}
        <div className={root.id !== 0 ? "recursive-align": ""}>
        {root.id !== 0 && <p>
          <span style={{ fontWeight: "500" }}>{root && root.name}</span> :{" "}
          {root && root.comment}
        </p>}
        {root.id !== 0 && <p
          style={{ marginLeft: "10px" }}
          onClick={() => setShowTextBox(!showTextBox)}
        >
          reply
        </p>}
        {showTextBox && (
          <div
            style={{
              display: "grid",
              gridTemplateRows: "32px 32px",
              maxWidth: "30px",
            }}
          >
            <ReplyBox onReply={(reply)=>onReply(reply)}></ReplyBox>
          </div>
        )}
        

        {showComments &&
          root &&
          root.children.slice(0, loadLimit).map((ele) => {
            return (
              <span key={ele.id}>
                {console.log(ele)}
                <div>
                  <Recurse root={ele} callBack={callBack} key={treeKey} />
                </div>
              </span>
            );
          })}
        {!showComments && root.children && root.children.length != 0 && (
          <p
            style={{ marginLeft: "10px", color: "gray" }}
            onClick={() => setShowComments(true)}
          >
            view replies
          </p>
        )}
        {showComments &&
          root.children.length != 0 &&
          loadLimit < root.children.length && (
            <p
              style={{ marginLeft: "10px", color: "gray" }}
              onClick={() => {
                setLoadLimit(loadLimit + loadLimit);
              }}
            >
              show more
            </p>
          )}
          </div>
      </div>
    );
  };

  let appendChild = (root, node, data) => {
    if (node === undefined) {
      return;
    }

    if (node.id === root.id) {
      root.children.unshift(data);
    } else {
      for (let ele of root.children) {
        appendChild(ele, node, data);
      }
    }

    return root;
  };

  let updateData = (node, data) => {
    let root = treeData;
    let updatedRoot = appendChild(root, node, data);
    console.log(updatedRoot);
    setTreeData(updatedRoot);
    //setTreeKey(data.id)
  };

  return (
    <div>
      <Recurse root={treeData} callBack={updateData} />
    </div>
  );
}

export default Recursive;