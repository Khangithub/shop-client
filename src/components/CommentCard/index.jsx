import React, { useState } from "react";
import Linkify from "react-linkify";
import { useDispatch } from "react-redux";
import {
  delCmtReq,
  delRepReq,
  editCmtReq,
  repCmtReq,
} from "../../actions/comment";
import { Col, Row, Modal, Button, Dropdown } from "react-bootstrap";
import ReactPlayer from "react-player";

import tickSvg from "../../assets/svgs/tick.svg";
import sendSvg from "../../assets/svgs/send.svg";
import mediaSvg from "../../assets/svgs/media.svg";

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
  const [delCmtModalShow, setDelCmtModalShow] = useState(false);
  const [repMedia, setRepMedia] = useState({
    origin: [],
    preview: [],
  });
  const [delRepModalShow, setDelRepModalShow] = useState(false);
  const [content, setContent] = useState("");
  const [repId, setRepId] = useState(currentUser._id);

  return (
    <Col className="cmt-card">
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
                setRepId(comment.commentator._id)
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
            <div className="rep-modal">
              <img
                src={currentUser.avatar}
                alt="user-avatar"
                className="user-avatar"
              />

              <div className="rep-modal-ct">
                <Row className="rep-modal-header">
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
                              receiver: repId,
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
                          receiver: repId,
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
                <div className="rep-modal-footer">
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
          <div className="rep-card" key={rep._id}>
            <div className="rep-card-layout">
              <img
                src={rep.sender.avatar}
                alt="user-avatar"
                className="user-avatar"
              />

              <div className="rep-content">
                <b>{rep.sender.username}</b>
                <Linkify>
                  <span>
                    <small>
                      <b>@{rep.receiver.username}&nbsp;&nbsp;</b>
                    </small>
                    {rep.content}
                  </span>
                </Linkify>
                <div className="rep-media-list-ct">
                  {rep.mediaList.map(({ mimetype, filename }, index) =>
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
                <Row className="rep-card-footer">
                  {rep.edited && <small>Edited &nbsp;&nbsp;</small>}
                  <small>{convertTimestamp(rep.published)}</small>
                </Row>
              </div>

              <Dropdown>
                <Dropdown.Toggle>
                  <b>...</b>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setRepId(rep.sender._id)
                      setShowRepModal(!showRepModal);
                    }}
                  >
                    Reply
                  </Dropdown.Item>
                  {currentUser._id === rep.sender._id && (
                    <>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => setDelRepModalShow(true)}>
                        Delete
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <Modal
                show={delRepModalShow}
                onHide={() => setDelRepModalShow(false)}
                size="lg"
                centered
              >
                <Modal.Header>
                  <h3>Delete Reply</h3>
                  <Modal.Header
                    closeButton
                    onClick={() => setDelRepModalShow(false)}
                  />
                </Modal.Header>
                <Modal.Body>
                  <p>Are you sure want to delete this reply?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(
                        delRepReq({
                          commentId: comment._id,
                          repId: rep._id,
                          token,
                        })
                      );
                      setDelRepModalShow(false);
                    }}
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        );
      })}
    </Col>
  );
}

export default CommentCard;
