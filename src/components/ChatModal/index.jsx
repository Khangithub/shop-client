import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserCtx } from "../../context/userCtx";
import { MouseCtx } from "../../context/mouse.context";
import { SocketCtx } from "../../context/socket.context";
import { getChatsAction, getMessagesAction, updateChatsAction, updateMessagesAction } from "../../actions/chat";
import { convertTimestamp } from "../../helpers/time";

import "./_chatModal.scss";

function ChatModal({ prod }) {
  const dispatch = useDispatch();
  const { currentUser, token } = useContext(UserCtx);
  const socket = useContext(SocketCtx);
  const { corr } = useContext(MouseCtx);
  const ref = useRef(null);
  const [product, setProduct] = useState(prod);
  const [showChatModal, setShowChatModal] = useState(false);
  const [msgContent, setMsgContent] = useState("");

  useEffect(() => {
    setProduct(prod);
  }, [prod]);

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
        getMessagesAction({
          roomId: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
          token,
        })
      );

      dispatch(
        getChatsAction({
          userId: currentUser._id,
          token,
        })
      );
    }
  }, [currentUser, product, token, dispatch, showChatModal, socket]);

  useEffect(() => {
    socket.on(
      "receive_message",
      ({
        isNewChat,
        room,
        productId,
        productImage,
        productName,
        salerId,
        salerUsername,
        content,
        fromId,
        type,
        createdAt,
        mediaList
      }) => {
        dispatch(
          updateMessagesAction({
            fromId,
            content,
            createdAt,
            type,
            mediaList,
          })
        );

        dispatch(
          updateChatsAction({
            isNewChat,
            room,
            productId,
            productImage,
            productName,
            salerId,
            salerUsername,
            content,
            fromId,
            type,
            createdAt,
            mediaList,
          })
        )
      }
    );
  }, [socket, dispatch]);

  const { msgs, chats } = useSelector(({ chat }) => chat);

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
                {msgs.map(({ content, from, createdAt, type }, index) => {
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

                  return null;
                })}
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
                    const msgData = {
                      room: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
                      productId: product._id,
                      productImage: product.productImage,
                      productName: product.name,
                      salerId: product.saler._id,
                      salerUsername: product.saler.username,
                      content: msgContent,
                      fromId: currentUser._id,
                      type: "text",
                      createdAt: new Date(),
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
            <div className="chats-ct">
              {chats.map((chat, index) => {
                return (
                  <div
                    className={
                      product._id === chat.product._id
                        ? "chat-active-prod chat-item-ct"
                        : "chat-item-ct"
                    }
                    onClick={() => setProduct(chat.product)}
                    key={index}
                  >
                    <img src={chat.product.productImage} alt="prod-img" />
                    <div className="chat-item-content">
                      <b>{chat.product.saler.username}</b>
                      <div>
                        <small>
                          {chat.messages[0].from._id === currentUser._id
                            ? "You: "
                            : "Shop: "}
                        </small>
                        <span> {chat.messages[0].content}</span>
                        <small>{convertTimestamp(chat.updatedAt)}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
