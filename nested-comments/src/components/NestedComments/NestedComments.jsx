import React from "react";
import { useState, useEffect } from "react";
import ReplyBox from "../ReplyBox/ReplyBox";
import "./NestedComments.css";
import { v4 as uuid } from "uuid";
import logo from "../../assets/reply-icon.svg";

export function NestedComments({
  data = [],
  commentAdded = () => {},
  userName,
  paginationSize = 2,
  userId,
}) {
  const PARENT_ROOT = "*";
  let [treeData, setTreeData] = useState({ children: [], id: PARENT_ROOT });
  let childSet = new Set();
  let [mapColors, setMapColors] = useState({});

  const getRandomColor = (userId) => {
    let mapColorsCopy = { ...mapColors };
    if (userId !== undefined && mapColorsCopy.userId !== undefined)
      return mapColors.userId;

    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    if (userId !== undefined) setMapColors({ ...mapColors, userId: color });

    return color;
  };

  const createTree = (src, mapRelations) => {
    if (!mapRelations.has(src.childId)) {
      let obj = {
        id: src.childId,
        name: src.name,
        comment: src.comment,
        color: src.color !== undefined ? src.color : getRandomColor(src.userId),
        children: [],
      };
      return obj;
    } else {
      let children = [];
      let obj = {
        id: src.childId,
        name: src.name,
        comment: src.comment,
        color: src.color !== undefined ? src.color : getRandomColor(src.userId),
        children,
      };

      mapRelations.get(src.childId).forEach((ele) => {
        children.push(createTree(ele, mapRelations));
      });

      return obj;
    }
  };

  const createMap = (data) => {
    let mapRelations = new Map();

    data.forEach((ele) => {
      childSet.add(ele.childId);
      if (mapRelations.has(ele.parentId)) {
        mapRelations.set(ele.parentId, [
          ...mapRelations.get(ele.parentId),
          ele,
        ]);
      } else {
        mapRelations.set(ele.parentId, [ele]);
      }
    });

    return mapRelations;
  };

  const getRootId = () => {
    let res = new Set();
    data.forEach((ele) => {
      if (!childSet.has(ele.parentId)) {
        res.add(ele.parentId);
      }
    });

    return [...res];
  };
  useEffect(() => {
    let mapRelations = createMap(data);
    let res = [];

    let rootIds = getRootId();
    if (rootIds.length > 0) {
      for (let rootId of rootIds) {
        mapRelations.get(rootId).forEach((ele, index) => {
          res.push(createTree(mapRelations.get(rootId)[index], mapRelations));
        });
      }
    }

    let nestedData = { children: [...res], id: PARENT_ROOT };
    setTreeData(nestedData);
  }, []);

  let Recurse = ({ root, commentAdded }) => {
    let [showComments, setShowComments] = useState(false);
    let [showTextBox, setShowTextBox] = useState(false);
    let [treeKey, setTreeKey] = useState("");
    let [currLimit, setCurrLimit] = useState(paginationSize);

    const cancel = () => {
      setShowTextBox(false);
    };

    const onReply = (reply) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      root.children.unshift({
        id: small_id,
        name: userName,
        comment: reply,
        color: getRandomColor(userId),
        children: [],
      });
      setShowComments(true);
      setShowTextBox(false);
      setTreeKey(small_id);
      commentAdded({
        parentId: root.id == "*" ? uuid().slice(0, 8) : root.id,
        childId: small_id,
        comment: reply,
        name: userName,
        userId: userId,
      });
    };

    return (
      <div>
        {root.id === PARENT_ROOT && (
          <ReplyBox onReply={(reply) => onReply(reply)} isRoot={true} />
        )}
        <div className={root.id !== PARENT_ROOT ? "recursive-align" : ""}>
          {root.id !== PARENT_ROOT && (
            <div style={{ display: "flex" }}>
              <div
                className="circle"
                style={{ backgroundColor: root.color }}
                title={root.name}
              >
                <p className="circle-inner">
                  {root && root.name && root.name.substring(0, 2)}
                </p>
              </div>{" "}
              <div className="nested-comment">{root && root.comment}</div>
            </div>
          )}
          {root.id !== PARENT_ROOT && (
            <div className="recursive-reply-button-div">
              <div className="reply-img-div">
                <img src={logo} alt="replyIcon" width={10} height={10} />
              </div>
              <div>
                <p
                  onClick={() => setShowTextBox(!showTextBox)}
                  className="recursive-reply-button"
                >
                  Reply
                </p>
              </div>
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

          {((showComments && root) || root.id === PARENT_ROOT) &&
            root.children.slice(0, currLimit).map((ele) => {
              return (
                <span key={ele.id}>
                  <div>
                    <Recurse root={ele} commentAdded={commentAdded} />
                  </div>
                </span>
              );
            })}
          {!showComments &&
            root.id !== PARENT_ROOT &&
            root.children &&
            root.children.length != 0 && (
              <p
                className="recursive-view-replies-button"
                onClick={() => setShowComments(true)}
              >
                view replies
              </p>
            )}
          {(showComments || root.id === PARENT_ROOT) &&
            root.children.length != PARENT_ROOT &&
            currLimit < root.children.length && (
              <p
                className="show-more-button"
                onClick={() => {
                  setCurrLimit(currLimit + paginationSize);
                }}
              >
                show more
              </p>
            )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Recurse root={treeData} commentAdded={commentAdded} />
    </div>
  );
}
