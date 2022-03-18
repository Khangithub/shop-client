import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { closeSvg } from "../../assets";
import { pretyTime } from "../../helpers/date";
import { scrollToBottom } from "../../helpers/dom";
import HorizontalDevider from "../HorizontalDivider";
import "./_chatModal.scss";

function ChatModal({ currentUser, product, socket }) {
  const [showChatModal, setShowChatModal] = useState(false);
  const [curMsg, setCurMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (newMsg) => {
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
            <div className="current-chat">
              <div className="chat-avatar">
                <img src={product.saler.avatar} alt="" />
                <b>{product.saler.username}</b>
              </div>
              <div className="chat-box">
                {msgList.map(({ msg, from, to, createdAt }, index, arr) => {
                  let isFrom = currentUser._id === from._id;
                  let isThisMsgFromSameSenderWithPreMsg =
                    index > 0 && arr[index - 1].from._id === from._id;

                  return (
                    <div key={index}>
                      {!isThisMsgFromSameSenderWithPreMsg && (
                        <HorizontalDevider line={1} />
                      )}
                      <div
                        key={index}
                        className={`msg-ct ${isFrom ? "msg-from" : "msg-to"}`}
                      >
                        <span>{msg}</span>
                        <small>&nbsp;{createdAt.formatedTime}&nbsp;</small>
                        <small>{isFrom ? "✅" : "✔"}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
              <textarea
                rows="2"
                placeholder="Aa"
                value={curMsg}
                onChange={({ target: { value } }) => {
                  setCurMsg(value);
                }}
                onKeyUp={async (e) => {
                  if (curMsg.trim() !== "" && e.keyCode === 13) {
                    const msgData = {
                      room: `${currentUser._id}-${product._id}-buying`,
                      from: currentUser,
                      to: product.saler,
                      msg: curMsg,
                      createdAt: pretyTime(new Date()),
                    };
                    await socket.emit("send_message", msgData);
                    setMsgList((list) => [...list, msgData]);
                    setCurMsg("");
                    scrollToBottom(".chat-box");
                  }
                }}
              />
            </div>
            <div className="chat-list-ct">
              <textarea
                rows="2"
                placeholder="Aa"
                value={curMsg}
                onChange={({ target: { value } }) => {
                  setCurMsg(value);
                }}
                onKeyUp={async (e) => {
                  if (curMsg.trim() !== "" && e.keyCode === 13) {
                    const msgData = {
                      room: `${currentUser._id}-${product._id}-buying`,
                      to: currentUser,
                      from: product.saler,
                      msg: curMsg,
                      createdAt: pretyTime(new Date()),
                    };
                    await socket.emit("send_message", msgData);
                    setMsgList((list) => [...list, msgData]);
                    setCurMsg("");
                    scrollToBottom(".chat-box");
                  }
                }}
              />
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
