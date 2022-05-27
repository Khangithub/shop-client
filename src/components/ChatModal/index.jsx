import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserCtx } from "../../context/user.context";
import { MouseCtx } from "../../context/mouse.context";
import { SocketCtx } from "../../context/socket.context";
import { getChatListReq, updateChatList } from "../../actions/chat";

import "./_chatModal.scss";
import { convertTimestamp } from "../../helpers/time";

function ChatModal({ product }) {
  const dispatch = useDispatch();
  const { currentUser, token } = useContext(UserCtx);
  const socket = useContext(SocketCtx);
  const { corr } = useContext(MouseCtx);
  const ref = useRef(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [msgContent, setMsgContent] = useState("");

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    let { top, left, bottom, right } = ref.current.getBoundingClientRect();
    if (
      !(
        top <= corr.yCorr &&
        corr.yCorr <= bottom &&
        left <= corr.xCorr &&
        corr.xCorr <= right
      )
    ) {
      //if mouse click out of the modal
      setShowChatModal(false);
    }
  }, [corr]);

  useEffect(() => {
    if (showChatModal) {
      socket.emit(
        "join_room",
        `${currentUser._id}-${product.saler._id}-${product._id}-buying`
      );

      dispatch(
        getChatListReq({
          roomId: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
          token,
        })
      );
    }
  }, [currentUser, product, token, dispatch, showChatModal, socket]);

  useEffect(() => {
    socket.on(
      "receive_message",
      ({ from, content, createdAt, type, mediaList }) => {
        dispatch(
          updateChatList({
            from,
            content,
            createdAt,
            type,
            mediaList,
          })
        );
      }
    );
  }, [socket, dispatch]);

  const { chatList, chatErr } = useSelector(({ chat }) => chat);

  return ReactDOM.createPortal(
    <div className="chat-modal">
      {showChatModal && (
        <div className="chat-modal-ct" ref={ref}>
          <div className="chat-modal-header">
            <h2>Chat</h2>
            <span onClick={() => setShowChatModal(false)}>X</span>
          </div>
          <div className="chat-modal-body">
            <div className="current-chat-ct">
              <div className="current-chat-header">
                <img src={product.saler.avatar} alt="" />
                <b>{product.saler.username}</b>
              </div>
              <div className="current-chat-body">
                {chatList.map(
                  ({ content, from, createdAt, type }, index) => {
                    let isMyMsg =
                      typeof from === "string"
                        ? from === currentUser._id
                        : from._id === currentUser._id;

                    if (type === "text") {
                      return (
                        <div
                          key={index}
                          className={isMyMsg ? "my-msg-ct" : "shop-msg-ct"}
                        >
                          <span className="msg-content">{content}</span>
                          <span>{convertTimestamp(createdAt)}</span>
                          <span role="img" aria-label="">
                            ✅
                          </span>
                        </div>
                      );
                    }
                  }
                )}
              </div>
              <textarea
                rows="2"
                placeholder="Aa"
                value={msgContent}
                onChange={({ target: { value } }) => {
                  setMsgContent(value);
                }}
                onKeyUp={async (e) => {
                  if (msgContent.trim() !== "" && e.keyCode === 13) {
                    const d = new Date();
                    const msgData = {
                      room: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
                      product: product._id,
                      content: msgContent,
                      from: currentUser._id,
                      type: "text",
                      createdAt: d.toString(),
                    };
                    await socket.emit("send_message", msgData);
                    setMsgContent("");
                  }
                }}
              />
              <div className="chat-opt-btn-list">
                <span>media</span>
                <span>package</span>
              </div>
            </div>
            <div className="cvs-list-ct"></div>
          </div>
        </div>
      )}
      {!showChatModal && (
        <Badge variant="danger" onClick={() => setShowChatModal(true)}>
          <h2>Chat</h2>
        </Badge>
      )}
    </div>,
    document.getElementById("chat-modal-root")
  );
}

export default React.memo(ChatModal);
