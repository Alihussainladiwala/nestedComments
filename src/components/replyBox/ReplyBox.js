import React, {useState} from 'react'
import "./ReplyBox.css"

function ReplyBox({onReply, cancel}) {

  const [reply, setReply] = useState("")
  const [showTextBox, setShowTextBox] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  return (
    <div><div
    style={{
      display: "grid",
      gridTemplateRows: "32px 32px",
      maxWidth: "30px",
    }}
  >
    <div>
      <input
        placeholder="reply..."
        onFocus={()=>setOnFocus(true)}
        onBlur={()=>setOnFocus(false)}
        className="reply-box-no-focus"
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></input>
    </div>

    {(onFocus || reply.length !== 0) && <div 
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <div>
      {reply.length === 0 && <button
          style={{
            borderRadius: "5px",
            borderStyle: "none",
            padding: "8px",
          }}
          onClick={() => {
            onReply(reply);
            setReply("");
          }}
          disabled
        >
          Reply
        </button> }
        {reply.length !== 0 && <button
          style={{
            borderRadius: "5px",
            borderStyle: "none",
            padding: "8px",
            backgroundColor: "blue",
            color: "white"
          }}
          onClick={() => {
            onReply(reply);
            setReply("");
          }}
        >
          Reply
        </button>}
      </div>
      <div style={{ paddingLeft: "5px" }}>
        <button
          style={{
            borderRadius: "5px",
            borderStyle: "none",
            padding: "8px",
          }}
          onClick={() => {
            cancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>}
  </div></div>
  )
}

export default ReplyBox