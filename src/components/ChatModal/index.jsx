import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Badge } from "react-bootstrap";
import { closeSvg } from "../../assets";
// import { formatTime } from "../../helpers/time";
// import { scrollToBottom } from "../../helpers/dom";
// import { Loading } from "../";
import { useSelector } from "react-redux";
// import { getChatListReq, getConversationReq } from "../../actions/chat";
// import { isEmpty } from "lodash";
import { UserCtx } from "../../context/user.context";
import { MouseCtx } from "../../context/mouse.context";

import "./_chatModal.scss";

function ChatModal({ product }) {
  const { currentUser } = useContext(UserCtx);
  const { corr } = useContext(MouseCtx);
  const ref = useRef(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [curMsg, setCurMsg] = useState("");
  const [msgList] = useState([]);

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

  // useEffect(() => {
  //   dispatch(
  //     getChatListReq({
  //       roomId: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
  //       token,
  //     })
  //   );
  //   dispatch(
  //     getConversationReq({
  //       fromId: currentUser._id,
  //       token,
  //     })
  //   );
  // }, [currentUser, currentUser._id, product._id, product, token, dispatch]);

  const { conversations } = useSelector(({ chat }) => chat);

  // useEffect(() => {
  //   setMsgList(chatList);
  // }, [chatList]);

  // useEffect(() => {
  //   socket.on("receive_message", (newMsg) => {
  //     setMsgList((list) => [...list, newMsg]);
  //   });
  // }, [socket]);

  // if (chatLoading) return <Loading />;
  // if (!isEmpty(chatErr)) return <Loading />;

  return ReactDOM.createPortal(
    <div className="chat-modal">
      {showChatModal && (
        <div className="chat-modal-ct" ref={ref}>
          <div className="chat-modal-header">
            <h2>Chat</h2>
            <img
              src={closeSvg}
              alt=""
              onClick={() => setShowChatModal(false)}
            />
          </div>
          <div className="chat-modal-body">
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
                // onKeyUp={async (e) => {
                //   if (curMsg.trim() !== "" && e.keyCode === 13) {
                //     const msgData = {
                //       room: `${currentUser._id}-${product.saler._id}-${product._id}-buying`,
                //       from: currentUser._id,
                //       to: product.saler._id,
                //       msg: curMsg,
                //       createdAt: formatTime(new Date()),
                //       product: product._id,
                //     };
                //     await socket.emit("send_message", msgData);
                //     setMsgList((list) => [...list, msgData]);
                //     setCurMsg("");
                //     scrollToBottom(".chat-box");
                //   }
                // }}
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
    </div>,
    document.getElementById("chat-modal-root")
  );
}

export default ChatModal;
