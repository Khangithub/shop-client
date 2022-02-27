import React, { useState } from "react";
import Linkify from "react-linkify";
import { useDispatch } from "react-redux";
import { delCmtReq, editCmtReq, repCmtReq } from "../../actions/comment";
import { Col, Row, Modal, Button, Dropdown } from "react-bootstrap";
import ReactPlayer from "react-player";

// import EditSubCommentForm from "./EditSubCommentForm";
// import DeleteSubCommentButton from "./DeleteSubCommentButton";
// import AddSubCommentForm from "./AddSubCommentForm";
import tickSvg from "../../assets/svgs/tick.svg";

import "./_commentCard.scss";
import { convertTimestamp } from "../../helpers";

function CommentCard({ comment, currentUser, token }) {
  const dispatch = useDispatch();
  const [showRepModal, setShowRepModal] = useState(false);
  const [isEditCmt, setIsEditCmt] = useState(false);
  const [editedCmt, setEditedCmt] = useState(comment.mainComment);
  const [editedCmtMedia, setEditedCmtMedia] = useState({
    preview: comment.mediaList,
    origin: comment.mediaList,
  });
  const [delModalShow, setDelModalShow] = useState(false);
  const [content, setContent] = useState("");

  return (
    <Col className="cmt-card">
      <Row className="cmt-card-ct">
        <img
          src={comment.commentator.avatar}
          alt="user-avatar"
          className="cmt-card-avatar"
        />
        <div className="cmt-card-content">
          <Row className="cmt-card-header">
            <b>{comment.commentator.username}</b>

            {isEditCmt && (
              <Row>
                <form encType="multipart/form-data">
                  <input
                    multiple
                    name="edit-cmt-media"
                    id="edit-cmt-media"
                    type="file"
                    accept="video/*,image/*"
                    onChange={(e) => {
                      const { files } = e.target;
                      if (files && files.length > 0) {
                        let editedPreviewList = [];
                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          const filename = URL.createObjectURL(file);
                          const mimetype = file.type;
                          editedPreviewList.push({ filename, mimetype });
                        }

                        setEditedCmtMedia((media) => ({
                          ...media,
                          preview: editedPreviewList,
                          origin: files,
                        }));
                      }
                    }}
                  />
                  <label htmlFor="edit-cmt-media">change images/videos</label>
                </form>

                <img
                  src={tickSvg}
                  alt="tick-btn"
                  onClick={() => {
                    dispatch(
                      editCmtReq({
                        commentId: comment._id,
                        mainComment: editedCmt,
                        mediaList: editedCmtMedia.origin,
                        token,
                      })
                    );
                    setIsEditCmt(false);
                  }}
                />
              </Row>
            )}
          </Row>
          {!isEditCmt && (
            <>
              <Linkify>
                <span>{comment.mainComment}</span>
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
                      />
                    );
                  }

                  return undefined;
                })}
              </Row>

              <Row className="cmt-card-footer">
                {comment.edited && <small>Edited &nbsp;&nbsp;</small>}
                <small>{convertTimestamp(comment.published)}</small>
              </Row>
            </>
          )}
          {isEditCmt && (
            <Col className="edit-cmt-ct">
              <Row>
                <textarea
                  value={editedCmt}
                  onKeyUp={(e) => {
                    e.preventDefault();
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                    if (editedCmt.trim() !== "" && e.keyCode === 13) {
                      dispatch(
                        editCmtReq({
                          commentId: comment._id,
                          mainComment: editedCmt,
                          mediaList: editedCmtMedia.origin,
                          token,
                        })
                      );
                      setIsEditCmt(false);
                    }
                  }}
                  onChange={(e) => {
                    setEditedCmt(e.target.value);
                  }}
                  autoFocus
                />
              </Row>
              <Row>
                {editedCmtMedia.preview.map(({ mimetype, filename }, index) => {
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
                      />
                    );
                  }

                  return undefined;
                })}
              </Row>
            </Col>
          )}
        </div>
        <Dropdown variant="none">
          <Dropdown.Toggle>
            <b>...</b>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setShowRepModal(!showRepModal);
              }}
            >
              Reply
            </Dropdown.Item>
            {currentUser._id === comment.commentator._id && (
              <>
                <Dropdown.Item onClick={() => setIsEditCmt(!isEditCmt)}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDelModalShow(true)}>
                  Delete
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      {token && (
        <div className="cmt-card-modal-list">
          <Modal
            show={delModalShow}
            onHide={() => setDelModalShow(false)}
            size="lg"
            centered
          >
            <Modal.Header>
              <h3>Delete Comment</h3>
              <Modal.Header
                closeButton
                onClick={() => setDelModalShow(false)}
              />
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure want to delete this comment?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => {
                  dispatch(delCmtReq({ commentId: comment._id, token }));
                  setDelModalShow(false);
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

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

          {/* 

        
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
