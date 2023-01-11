import React, { useState } from "react";
import "./ReplyBox.css";

function ReplyBox({ onReply, cancel = () => {}, isRoot = false }) {
  const [reply, setReply] = useState("");

  const [focus, setOnFocus] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "32px 32px",
          maxWidth: "30px",
        }}
      >
        <div>
          <input
            placeholder="reply..."
            onFocus={() => setOnFocus(true)}
            className="reply-box-no-focus"
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></input>
        </div>

        {((isRoot && focus) || !isRoot) && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <div>
              {reply.length === 0 && (
                <button
                  style={{
                    borderRadius: "5px",
                    borderStyle: "none",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onReply(reply);
                    setReply("");
                  }}
                  disabled
                >
                  Reply
                </button>
              )}
              {reply.length !== 0 && (
                <button
                  style={{
                    borderRadius: "5px",
                    borderStyle: "none",
                    padding: "8px",
                    backgroundColor: "blue",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onReply(reply);
                    setReply("");
                  }}
                >
                  Reply
                </button>
              )}
            </div>
            <div style={{ paddingLeft: "5px" }}>
              <button
                style={{
                  borderRadius: "5px",
                  borderStyle: "none",
                  padding: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setReply("");

                  setOnFocus(false);

                  cancel();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReplyBox;
