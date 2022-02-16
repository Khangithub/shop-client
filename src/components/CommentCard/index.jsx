import React, { useState } from "react";
import Linkify from "react-linkify";
import { useDispatch } from "react-redux";
import { repCmtReq } from "../../actions/comment";
// import EditMainCommentButton from './EditMainCommentButton';
// import DeleteMainCommentButton from './DeleteMainCommentButton';
// import AddSubCommentForm from "./AddSubCommentForm";
// import SubCommentCard from './SubCommentCard';
// import {convertTimestamp} from '../../helpers';

import "./_commentCard.scss";

function CommentCard({
  comment,
  currentUser,
  setProductCommentList,
  productId,
  token,
}) {
  const dispatch = useDispatch();
  const [showRepModal, setShowRepModal] = useState(false);
  const [content, setContent] = useState("");

  return (
    <div className="cmt-card">
      <div className="cmt-card-content">
        <img src={comment.avatar} alt="user-avatar" />
        <div>
          <strong>{comment.username}</strong>
          <Linkify>
            <span>{comment.mainComment}</span>
          </Linkify>
        </div>
      </div>

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

          {/* {currentUser && currentUser._id === comment.commentator._id && (
          <EditMainCommentButton
            mainComment={comment.mainComment}
            commentator={comment.commentator}
            commentId={comment._id}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        )}

        {currentUser && currentUser._id === comment.commentator._id && (
          <DeleteMainCommentButton
            mainComment={comment.mainComment}
            commentator={comment.commentator}
            commentId={comment._id}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        )}
        <small>{convertTimestamp(comment.published)}</small>
      </div>

      {comment.subComment.map((subcomment, index) => {
        return (
          <SubCommentCard
            key={index}
            currentUser={currentUser}
            commentId={comment._id}
            subcomment={subcomment}
            productId={productId}
            setProductCommentList={setProductCommentList}
          />
        );
      })}*/}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
