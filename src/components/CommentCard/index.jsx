import React, { useState } from "react";
import Linkify from "react-linkify";
import { useDispatch } from "react-redux";
import { repCmtReq } from "../../actions/comment";
import { Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";

// import EditSubCommentForm from "./EditSubCommentForm";
// import DeleteSubCommentButton from "./DeleteSubCommentButton";
// import EditMainCommentButton from './EditMainCommentButton';
import DeleteMainCommentButton from './DeleteMainCommentButton';
// import AddSubCommentForm from "./AddSubCommentForm";

import "./_commentCard.scss";
import { convertTimestamp } from "../../helpers";

function CommentCard({ comment, currentUser, token }) {
  const dispatch = useDispatch();
  const [showRepModal, setShowRepModal] = useState(false);
  const [content, setContent] = useState("");

  return (
    <Col className="cmt-card">
      <Row className="cmt-card-ct">
        <Col>
          <img
            src={comment.commentator.avatar}
            alt="user-avatar"
            className="cmt-cart-avatar"
          />
        </Col>
        <Col>
          <Col className="cmt-card-content">
            <b>{comment.commentator.username}</b>
            <Linkify>
              <p>{comment.mainComment}</p>
            </Linkify>
            <Row>
              {comment.mediaList.map(({ mimetype, filename }, index) => {
                if (mimetype.includes("image")) {
                  return (
                    <img
                      src={filename}
                      alt="cmt-media-preview-img"
                      className="cmt-card-media"
                      key={index}
                    />
                  );
                }

                if (mimetype.includes("video")) {
                  return (
                    <ReactPlayer
                      url={[
                        { src: filename, type: "video/webm" },
                        { src: filename, type: "video/ogg" },
                      ]}
                      className="cmt-card-media"
                      key={index}
                      controls
                      playing
                      loop
                    />
                  );
                }

                return undefined;
              })}
            </Row>
          </Col>
        </Col>
      </Row>

      {token && (
        <div className="cmt-action-btn-list">
          <span
            onClick={() => {
              setShowRepModal(!showRepModal);
            }}
          >
            reply
          </span>

          {showRepModal && (
            <div className="reply-modal">
              <img src={currentUser.avatar} alt="user-avatar" />

              <textarea
                type="text"
                placeholder="Reply this feedback"
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                value={content}
                onKeyUp={(e) => {
                  e.preventDefault();
                  if (content.trim() !== "" && e.keyCode === 13) {
                    dispatch(
                      repCmtReq({
                        commentId: comment._id,
                        content,
                        token,
                        sender: currentUser._id,
                        receiver: comment.commentator._id,
                      })
                    );
                    setContent("");
                    setShowRepModal(false);
                  }
                }}
              />
            </div>
          )}

          {currentUser._id === comment.commentator._id && (
            <DeleteMainCommentButton
              mainComment={comment.mainComment}
              commentator={comment.commentator}
              commentId={comment._id}
            />
          )}

          {/* {currentUser && currentUser._id === comment.commentator._id && (
          <EditMainCommentButton
            mainComment={comment.mainComment}
            commentator={comment.commentator}
            commentId={comment._id}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        )}

        
        <span>{convertTimestamp(comment.published)}</span>
      </div>*/}

          {comment.subComment.map((subcomment) => {
            return (
              <div className="rep-card" key={subcomment._id}>
                <div className="rep-ct">
                  <img src={subcomment.sender.avatar} alt="user-avatar" />

                  <div className="rep-content">
                    <b>{subcomment.sender.username}</b>
                    <Linkify>
                      <span>
                        <b>@{subcomment.receiver.username}&nbsp;</b>
                        {subcomment.content}
                      </span>
                    </Linkify>
                  </div>
                </div>

                <div className="rep-action-btn-list">
                  {currentUser && (
                    <span
                      onClick={() => {
                        setShowRepModal(!showRepModal);
                      }}
                    >
                      reply
                    </span>
                  )}

                  {/* {currentUser && currentUser._id === subcomment.sender._id && (
                    <EditSubCommentForm
                      subcomment={subcomment}
                      productId={productId}
                      setProductCommentList={setProductCommentList}
                    />
                  )}

                  {currentUser && currentUser._id === subcomment.sender._id && (
                    <DeleteSubCommentButton
                      subcomment={subcomment}
                      commentId={comment._id}
                      setProductCommentList={setProductCommentList}
                      productId={productId}
                    />
                  )} */}
                  <span>{convertTimestamp(subcomment.published)}</span>
                </div>

                {/* {showRepModal && (
                <AddSubCommentForm
                  commentId={commentId}
                  receiver={subcomment.sender._id}
                  setProductCommentList={setProductCommentList}
                  productId={productId}
                  setShowRepModal={setShowRepModal}
                />
              )} */}
              </div>
            );
          })}
        </div>
      )}
    </Col>
  );
}

export default CommentCard;
