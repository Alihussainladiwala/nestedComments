import React from "react";
import { useState } from "react";
import ReplyBox from "../ReplyBox/ReplyBox";
import "./NestedComments.css";
import { v4 as uuid } from "uuid";

export function NestedComments({data}) {
//   let data = { children: [], id: 0 };
  

  let [treeData, setTreeData] = useState(data);
  // let [treeKey, setTreeKey] = useState(0);

  let Recurse = ({ root, callBack }) => {
    let [showComments, setShowComments] = useState(false);
    let [showTextBox, setShowTextBox] = useState(false);
    let [reply, setReply] = useState("");
    let [treeKey, setTreeKey] = useState(root.id);
    let [loadLimit, setLoadLimit] = useState(2);

    // console.log(root)

    const cancel = () => {
      setShowTextBox(false);
    };

    const onReply = (reply) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);

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
    };

    return (
      <div>
        {/* <ReplyBox onReply={()=>onReply()}></ReplyBox> */}
        {root.id === 0 && (
          <ReplyBox onReply={(reply) => onReply(reply)}></ReplyBox>
        )}
        <div className={root.id !== 0 ? "recursive-align" : ""}>
          {root.id !== 0 && (
            
              <div style={{display: "flex"}}>
              
                <div className="circle">
                  <p className="circle-inner">
                    {root && root.name.substring(0, 2)}
                  </p>
                
              </div>{" "}
              <div style={{paddingTop: "10px"}}>
              : {root && root.comment}
              </div>
              </div>
           
          )}
          {root.id !== 0 && (
            <div className="recursive-reply-button-div">
              <p
                onClick={() => setShowTextBox(!showTextBox)}
                className="recursive-reply-button"
              >
                Reply
              </p>
            </div>
          )}
          {showTextBox && (
            <div className="recursive-reply-box-align">
              <ReplyBox
                onReply={(reply) => onReply(reply)}
                cancel={() => cancel()}
              ></ReplyBox>
            </div>
          )}

          {((showComments &&
            root) || root.id === 0) &&
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
          {(!showComments && root.id !== 0) && root.children && root.children.length != 0 && (
            <p
              className="recursive-view-replies-button"
              onClick={() => setShowComments(true)}
            >
              view replies
            </p>
          )}
          {(showComments || root.id === 0) &&
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


