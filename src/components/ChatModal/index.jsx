import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { closeSvg } from "../../assets";
import { formatTime } from "../../helpers/time";
import { scrollToBottom } from "../../helpers/dom";
import { Loading } from "../";
import "./_chatModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { getChatListReq, getConversationReq } from "../../actions/chat";
import { isEmpty } from "lodash";

function ChatModal({ currentUser, product, token, socket }) {
  const dispatch = useDispatch();
  const [showChatModal, setShowChatModal] = useState(false);
  const [curMsg, setCurMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    dispatch(
      getChatListReq({
        roomId: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
        token,
      })
    );
    dispatch(
      getConversationReq({
        fromId: currentUser._id,
        token,
      })
    );
  }, [currentUser, currentUser._id, product._id, product, token, dispatch]);

  const { chatList, conversations, chatLoading, chatErr } = useSelector(
    ({ chat }) => chat
  );

  useEffect(() => {
    setMsgList(chatList);
  }, [chatList]);

  useEffect(() => {
    socket.on("receive_message", (newMsg) => {
      setMsgList((list) => [...list, newMsg]);
    });
  }, [socket]);

  if (chatLoading) return <Loading />;
  if (!isEmpty(chatErr)) return <Loading />;

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
                {msgList.map(({ msg, from, createdAt }, index, self) => {
                  let isFrom =
                    typeof from === "object"
                      ? currentUser._id === from._id
                      : currentUser._id === from;

                  // let isThisMsgFromSameSenderWithPreMsg =
                  //   index > 0 && self[index - 1].from === from;
                  return (
                    <div key={index}>
                      {/* {!isThisMsgFromSameSenderWithPreMsg && (
                        <HorizontalDivider line={1} />
                      )} */}
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
                      room: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
                      from: currentUser._id,
                      to: product.saler._id,
                      msg: curMsg,
                      createdAt: formatTime(new Date()),
                      product: product._id,
                    };
                    await socket.emit("send_message", msgData);
                    setMsgList((list) => [...list, msgData]);
                    setCurMsg("");
                    scrollToBottom(".chat-box");
                  }
                }}
              />
            </div>
            <div className="cvs-list-ct">
              {conversations
                .map((cvs, index) => (
                  <div className="cvs-ct" key={index}>
                    <div className="csv-msg-ct">
                      <img src={cvs.to.avatar} alt="" />

                      <div>
                        <b>{cvs.product.saler.username}</b>
                        <div>{cvs.msg}</div>
                      </div>
                    </div>

                    <div className="csv-product-ct">
                      <div>
                        <small>{cvs.createdAt.formatedDate}</small>
                      </div>
                      <img src={cvs.product.productImage} alt="" />
                    </div>
                  </div>
                ))
                .reverse()}
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
