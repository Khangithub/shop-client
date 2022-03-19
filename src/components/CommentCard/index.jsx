import React, { useState } from "react";
import Linkify from "react-linkify";
import { useDispatch } from "react-redux";
import { delCmtReq, editCmtReq, repCmtReq } from "../../actions/comment";
import { Col, Row, Modal, Button, Dropdown } from "react-bootstrap";
import ReactPlayer from "react-player";

import { tickSvg, sendSvg, mediaSvg } from "../../assets";

import { convertTimestamp } from "../../helpers/time";
import ReplyCard from "../ReplyCard";
import "./_commentCard.scss";

function CommentCard({ comment, currentUser, token }) {
  const dispatch = useDispatch();
  const [showRepModal, setShowRepModal] = useState(false);
  const [isEditCmt, setIsEditCmt] = useState(false);
  const [editedCmt, setEditedCmt] = useState(comment.mainComment);
  const [editedCmtMedia, setEditedCmtMedia] = useState({
    preview: comment.mediaList,
    origin: comment.mediaList,
  });
  const [delCmtModalShow, setDelCmtModalShow] = useState(false);
  const [repMedia, setRepMedia] = useState({
    origin: [],
    preview: [],
  });
  const [content, setContent] = useState("");

  return (
    <Col
      className="cmt-card"
      onClick={(e) => {
        const ignoreClickOnMeElement = document.getElementById(
          `modal-${comment._id}`
        );
        const isClickInsideElement = ignoreClickOnMeElement?.contains(e.target);
        if (isClickInsideElement === false) setShowRepModal(false);
      }}
    >
      <div className="cmt-card-ct">
        <img
          src={comment.commentator.avatar}
          alt="user-avatar"
          className="cmt-card-avatar"
        />
        <div className="cmt-card-layout">
          <div className="cmt-card-header">
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
                  <label htmlFor="edit-cmt-media">
                    <img src={mediaSvg} alt="media-btn" />
                  </label>
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
          </div>
          {!isEditCmt && (
            <>
              <Linkify>
                <span>{comment.mainComment}</span>
              </Linkify>

              <div className="cmt-media-ct">
                {comment.mediaList.map(({ mimetype, filename }, index) =>
                  mimetype.includes("image") ? (
                    <img
                      src={filename}
                      alt="cmt-media-preview-img"
                      className="cmt-card-media"
                      key={index}
                    />
                  ) : (
                    <ReactPlayer
                      url={[
                        { src: filename, type: "video/webm" },
                        { src: filename, type: "video/ogg" },
                      ]}
                      className="cmt-card-media"
                      key={index}
                      controls
                    />
                  )
                )}
              </div>

              <Row className="cmt-card-footer">
                {comment.edited && <small>Edited &nbsp;&nbsp;</small>}
                <small>{convertTimestamp(comment.published)}</small>
              </Row>
            </>
          )}
          {isEditCmt && (
            <Col className="edit-cmt-ct">
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
              <div>
                {editedCmtMedia.preview.map(({ mimetype, filename }, index) =>
                  mimetype.includes("image") ? (
                    <img
                      src={filename}
                      alt="cmt-media-preview-img"
                      className="cmt-card-media"
                      key={index}
                    />
                  ) : (
                    <ReactPlayer
                      url={[
                        { src: filename, type: "video/webm" },
                        { src: filename, type: "video/ogg" },
                      ]}
                      className="cmt-card-media"
                      key={index}
                      controls
                    />
                  )
                )}
              </div>
            </Col>
          )}
        </div>
        <Dropdown>
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
                <Dropdown.Item onClick={() => setDelCmtModalShow(true)}>
                  Delete
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {token && (
        <div className="cmt-card-modal-list">
          <Modal
            show={delCmtModalShow}
            onHide={() => setDelCmtModalShow(false)}
            size="lg"
            centered
          >
            <Modal.Header>
              <h3>Delete Comment</h3>
              <Modal.Header
                closeButton
                onClick={() => setDelCmtModalShow(false)}
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
                  setDelCmtModalShow(false);
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {showRepModal && (
            <div className="cmt-modal" id={`modal-${comment._id}`}>
              <img
                src={currentUser.avatar}
                alt="user-avatar"
                className="user-avatar"
              />

              <div className="cmt-modal-ct">
                <Row className="cmt-modal-header">
                  <small>
                    <b>@{comment.commentator.username}</b>
                  </small>

                  <Row>
                    <form encType="multipart/form-data">
                      <input
                        multiple
                        name="rep-media"
                        id="rep-media"
                        type="file"
                        accept="video/*,image/*"
                        onChange={(e) => {
                          const { files } = e.target;
                          if (files && files.length > 0) {
                            let repPreviewList = [];
                            for (let i = 0; i < files.length; i++) {
                              const file = files[i];
                              const filename = URL.createObjectURL(file);
                              const mimetype = file.type;
                              repPreviewList.push({ filename, mimetype });
                            }

                            setRepMedia((media) => ({
                              ...media,
                              preview: repPreviewList,
                              origin: files,
                            }));
                          }
                        }}
                      />
                      <label htmlFor="rep-media">
                        <img src={mediaSvg} alt="media-btn" />
                      </label>
                    </form>

                    {(content || repMedia.origin.length > 0) && (
                      <img
                        src={sendSvg}
                        alt="send-icon"
                        onClick={() => {
                          dispatch(
                            repCmtReq({
                              commentId: comment._id,
                              content,
                              token,
                              media: repMedia.origin,
                              receiver: comment.commentator._id,
                            })
                          );
                          setContent("");
                          setRepMedia({
                            origin: [],
                            preview: [],
                          });
                          setShowRepModal(false);
                        }}
                      />
                    )}
                  </Row>
                </Row>
                <textarea
                  type="text"
                  placeholder="reply this feedback"
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                  value={content}
                  onKeyUp={(e) => {
                    e.preventDefault();
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                    if (content.trim() !== "" && e.keyCode === 13) {
                      dispatch(
                        repCmtReq({
                          commentId: comment._id,
                          content,
                          token,
                          media: repMedia.origin,
                          receiver: comment.commentator._id,
                        })
                      );
                      setContent("");
                      setRepMedia({
                        origin: [],
                        preview: [],
                      });
                      setShowRepModal(false);
                    }
                  }}
                />
                <div className="rep-media-list-ct">
                  {repMedia.preview.map((media, index) =>
                    media.mimetype.includes("image") ? (
                      <img
                        src={media.filename}
                        alt="cmt-media-preview-img"
                        key={index}
                      />
                    ) : (
                      <ReactPlayer
                        url={[
                          { src: media.filename, type: "video/webm" },
                          { src: media.filename, type: "video/ogg" },
                        ]}
                        key={index}
                        controls
                        playing
                        loop
                      />
                    )
                  )}
                </div>
                <div className="cmt-modal-footer">
                  <small onClick={() => setShowRepModal(false)}>
                    <b>Cancel</b>
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {comment.subComment.map((rep) => {
        return (
          <ReplyCard
            key={rep._id}
            reply={rep}
            token={token}
            currentUser={currentUser}
            comment={comment}
          />
        );
      })}
    </Col>
  );
}

export default CommentCard;
