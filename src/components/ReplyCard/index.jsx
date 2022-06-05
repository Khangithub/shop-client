import React, { useContext, useState } from "react";
import { repCmtReq, delRepReq } from "../../actions/comment";
import { Row, Modal, Button, Dropdown } from "react-bootstrap";
import ReactPlayer from "react-player";
import Linkify from "react-linkify";

import { sendSvg, mediaSvg } from "../../assets";
import { useDispatch } from "react-redux";
import { convertTimestamp } from "../../helpers/time";
import { UserCtx } from "../../context/user";

import "./_replyCard.scss";

function ReplyCard({ reply, comment }) {
  const { currentUser, token } = useContext(UserCtx);

  const dispatch = useDispatch();
  const [showRepModal, setShowRepModal] = useState(false);
  const [delRepModalShow, setDelRepModalShow] = useState(false);
  const [repMedia, setRepMedia] = useState({
    origin: [],
    preview: [],
  });
  const [content, setContent] = useState("");

  return (
    !!currentUser && (
      <div className="rep-card">
        <div className="rep-card-layout">
          <img
            src={reply.sender.avatar}
            alt="user-avatar"
            className="user-avatar"
          />

          <div className="rep-content">
            <b>{reply.sender.username}</b>
            <Linkify>
              <span>
                <small>
                  <b>@{reply.receiver.username}&nbsp;&nbsp;</b>
                </small>
                {reply.content}
              </span>
            </Linkify>
            <div className="rep-media-list-ct">
              {reply.mediaList.map(({ mimetype, filename }, index) =>
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
              {reply.edited && <small>Edited &nbsp;&nbsp;</small>}
              <small>{convertTimestamp(reply.published)}</small>
            </Row>
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
              {currentUser._id === reply.sender._id && (
                <>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => setDelRepModalShow(true)}>
                    Delete
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

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
                            receiver: reply.sender._id,
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
                        receiver: reply.sender._id,
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
                    repId: reply._id,
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
    )
  );
}

export default ReplyCard;
