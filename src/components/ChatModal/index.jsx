import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { closeSvg } from "../../assets";
import "./_chatModal.scss";

function ChatModal({ currentUser, productId, socket }) {
  const [showChatModal, setShowChatModal] = useState(false);
  const [msgList, setMsgList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("receive_message", (newMsg) => {
      console.log("newMsg", newMsg);
      setMsgList((list) => [...list, newMsg]);
    });
  }, [socket]);

  return (
    <div className="chat-modal">
      {showChatModal && (
        <div className="chat-modal-layout">
          <div className="chat-modal-header">
            <h2>Chat</h2>
            <img
              src={closeSvg}
              alt=""
              onClick={() => setShowChatModal(false)}
            />
          </div>
          <div className="chat-modal-ct">
            <div xs={8} className="current-chat">
              {JSON.stringify(msgList)}
              <textarea
                rows="10"
                placeholder="Aa"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyUp={async (e) => {
                  e.preventDefault();
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                  if (msg.trim() !== "" && e.keyCode === 13) {
                    const messageData = {
                      room: `${currentUser._id}-${productId}-buying`,
                      msg,
                      role: currentUser.role,
                    };
                    await socket.emit("send_message", messageData);
                    setMsg("");
                  }
                }}
              />
            </div>
            <div xs={4} className="chat-list">
              fdasnfdjska
            </div>
          </div>
        </div>
      )}
      {!showChatModal && (
        <Badge variant="danger" onClick={() => setShowChatModal(true)}>
          <h2>Chat</h2>
        </Badge>
      )}
    </div>
  );
}

export default ChatModal;
