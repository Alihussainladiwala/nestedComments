import React, {useState} from 'react'

function ReplyBox({onReply}) {

  const [reply, setReply] = useState("")
  const [showTextBox, setShowTextBox] = useState(false);
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
        style={{
          marginLeft: "10px",
          borderStyle: "none none solid none",
        }}
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></input>
    </div>

    <div 
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <div>
        <button
          style={{
            borderRadius: "5px",
            borderStyle: "none",
            padding: "8px",
          }}
          onClick={() => {
            onReply(reply);
            setReply("");
          }}
        >
          Reply
        </button>
      </div>
      <div style={{ paddingLeft: "5px" }}>
        <button
          style={{
            borderRadius: "5px",
            borderStyle: "none",
            padding: "8px",
          }}
          onClick={() => {
            setShowTextBox(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div></div>
  )
}

export default ReplyBox