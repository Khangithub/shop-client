import React, { useState } from "react";
import Linkify from "react-linkify";
import "./SubCommentCard.css";
import { Image } from "react-bootstrap";
// import AddSubCommentForm from './AddSubCommentForm';
import EditSubCommentForm from "./EditSubCommentForm";
import DeleteSubCommentButton from "./DeleteSubCommentButton";
import { convertTimestamp } from "../../helpers";

export default function SubCommentCard({
  currentUser,
  commentId,
  subcomment,
  productId,
  setProductCommentList,
}) {
  let [showRepModal, setShowRepModal] = useState(false);

  return (
    <div className="sub-cmt-card align-left">
      <div className="sub-cmt-ct">
        <Image src={subcomment.sender.avatar} roundedCircle />

        <div className="sub-cmt-content">
          <Linkify>
            <span>@{subcomment.receiver.username}&nbsp;&nbsp;&nbsp;</span>
            <span>{subcomment.content}</span>
          </Linkify>
        </div>
      </div>

      <div className="sub-cmt-action-btn-list">
        {currentUser && (
          <small
            onClick={() => {
              setShowRepModal(!showRepModal);
            }}
          >
            reply
          </small>
        )}

        {currentUser && currentUser._id === subcomment.sender._id && (
          <EditSubCommentForm
            subcomment={subcomment}
            productId={productId}
            setProductCommentList={setProductCommentList}
          />
        )}

        {currentUser && currentUser._id === subcomment.sender._id && (
          <DeleteSubCommentButton
            subcomment={subcomment}
            commentId={commentId}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        )}
        <small>{convertTimestamp(subcomment.published)}</small>
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
}
