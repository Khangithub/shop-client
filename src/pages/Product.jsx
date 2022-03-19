import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Row, Col, Badge, Carousel, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
  getProductRequest,
  getProductsByCategoryRequest,
} from "../actions/product";
import { isEmpty } from "lodash";
import { getUnitPrice } from "../helpers/number";
import {
  NavBar,
  Loading,
  Footer,
  HorizontalDivider,
  ProductCard,
  CommentCard,
  Title,
} from "../components";
import {
  shippingBanner4,
  shippingBanner1,
  shippingBanner2,
  shippingBanner3,
  mediaSvg,
  sendSvg,
  closeSvg,
} from "../assets";

import "./_product.scss";
import { addCmtReq, getCmtListFromProductReq } from "../actions/comment";

import ReactPlayer from "react-player";
import { addOrderReq } from "../actions/order";
import ChatModal from "../components/ChatModal";

const socket = io.connect(process.env.REACT_APP_BASE_URL);

function Product({ currentUser, token }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useRouteMatch().params;
  const [didAddOrder, setAddOrder] = useState(false);
  const [mainComment, setMainComment] = useState("");
  const [cmtMedia, setCmtMedia] = useState({
    origin: [],
    preview: [],
  });

  const { product, productLoading, productErr } = useSelector(
    ({product}) => product
  );

  const { cmtList, cmtLoading, cmtErr } = useSelector(({comment}) => comment);

  useEffect(() => {
    socket.emit("join_room", `${currentUser._id}-${productId}-buying`);
    setQuantity(1);
    dispatch(getProductRequest({ productId }));
    dispatch(getCmtListFromProductReq({ productId, batch: 0, limit: 0 }));
  }, [productId, currentUser, dispatch]);

  const { productsByCategory } = useSelector(({product}) => product);

  useEffect(() => {
    if (product && product.hasOwnProperty("category")) {
      dispatch(
        getProductsByCategoryRequest({
          category: product.category,
          pageIndex: 1,
          limit: 6,
        })
      );
    }
  }, [productId, dispatch, product]);

  let [quantity, setQuantity] = useState(1);
  let [seeMoreText, setSeeMore] = useState(true);

  if (isEmpty(product)) return <Loading />;
  if (productLoading || cmtLoading) return <Loading />;
  if (!isEmpty(productErr) || !isEmpty(cmtErr))
    return <Loading />;

  const truncatDes = (des) => {
    let copiedDes = "".concat(des);
    let firstPart = copiedDes.slice(0, 700);
    let text = seeMoreText ? firstPart : copiedDes;

    return (
      <>
        <span>{text}</span>
        <b onClick={() => setSeeMore(!seeMoreText)}>
          &nbsp;...&nbsp;{seeMoreText ? "see more" : "see less"}
        </b>
      </>
    );
  };

  return (
    <>
      <NavBar currentUser={currentUser} token={token} />
      <div className="product">
        <Row className="product-info-ct">
          <Col sm={12} md={4} lg={4}>
            <img
              src={product.productImage}
              draggable={false}
              alt="product-img"
              className="product-info-img"
            />
          </Col>
          <Col sm={12} md={4} lg={5} className="product-info-content">
            <h1>{product.name}</h1>

            <p className="product-manufacturer">
              Visit the {product.manufacturer} Store
            </p>

            <Row>
              {Array(product.rating)
                .fill()
                .map((_, index) => (
                  <span role="img" key={index} aria-label="">
                    ⭐
                  </span>
                ))}
              <span>&nbsp; 145 sold products, 189 answered questions</span>
            </Row>

            <HorizontalDivider line={1} />

            <Row className="product-price">
              <h3>${getUnitPrice(product)} &nbsp;</h3>
              {product.discount > 0 && (
                <Badge variant="danger" className="product-discount">
                  -{product.discount}%
                </Badge>
              )}
            </Row>

            <HorizontalDivider line={1} />

            <Row className="product-description">
              <h5>About this item</h5>
              <p>{truncatDes(product.description)}</p>
            </Row>
          </Col>
          {!isEmpty(token) ? (
            <Col sm={12} md={4} lg={3} className="product-qty-container">
              <div>
                <h5>In Stock: {product.inStock} products available</h5>
                <HorizontalDivider line={1} />

                <Row className="product-qty-input">
                  <label htmlFor="quantity">Quantity: &nbsp;</label>
                  <div>
                    <button
                      onClick={() =>
                        setQuantity((preVal) =>
                          preVal - 1 < 1 ? 1 : preVal - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button
                      onClick={() =>
                        setQuantity((preVal) =>
                          preVal + 1 > product.inStock
                            ? product.inStock
                            : preVal + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </Row>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    dispatch(
                      addOrderReq({ product: productId, token, quantity })
                    );
                    setAddOrder(true);
                    setTimeout(() => {
                      setAddOrder(false);
                    }, 3500);
                  }}
                >
                  Add to card
                </button>
                <HorizontalDivider />

                <table>
                  <tbody>
                    <tr>
                      <td>
                        <small>
                          Ships from&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </small>
                      </td>
                      <td>
                        <small>Amazon.com</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small>
                          Sold by&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </small>
                      </td>
                      <td>
                        <small>Amazon.com</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small>
                          Packaging&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </small>
                      </td>
                      <td>
                        <small>Shows what’s inside. T…</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          ) : (
            <Col sm={12} md={4} lg={3} className="product-signin-ct">
              <h5>Sign in for the best experience</h5>
              <HorizontalDivider line={1} />
              <button onClick={() => history.push("/login")}>
                Sign in securely
              </button>
              <HorizontalDivider line={1} />
              <div className="shipping-img">
                <Carousel>
                  {[
                    shippingBanner1,
                    shippingBanner2,
                    shippingBanner3,
                    shippingBanner4,
                  ].map((image, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className="banner-img d-block w-100"
                          src={image}
                          alt="slide"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </Col>
          )}
        </Row>

        <HorizontalDivider />

        <Title>productList of the same category</Title>
        <Row>
          {productsByCategory.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Row>

        <HorizontalDivider />

        <Title>comments about this product</Title>
        {token && (
          <Row className="cmt-box-ct">
            <Col>
              <img
                className="avatar"
                src={currentUser.avatar}
                alt="user-avatar"
              />
            </Col>
            <Col className="cmt-box-content">
              <Row className="cmt-box-header">
                <b>{currentUser.username}</b>
                <div>
                  {cmtMedia.preview.length > 0 && (
                    <img
                      src={closeSvg}
                      alt="close-icon"
                      onClick={() => {
                        setCmtMedia((media) => ({
                          ...media,
                          origin: [],
                          preview: [],
                        }));
                      }}
                    />
                  )}
                  {cmtMedia.preview.length === 0 && (
                    <form encType="multipart/form-data">
                      <input
                        multiple
                        name="cmt-media"
                        id="cmt-media"
                        type="file"
                        accept="video/*,image/*"
                        onChange={(e) => {
                          const { files } = e.target;
                          if (files && files.length > 0) {
                            let previewList = [];
                            for (let i = 0; i < files.length; i++) {
                              const file = files[i];
                              const url = URL.createObjectURL(file);
                              const type = file.type;
                              previewList.push({ url, type });
                            }

                            setCmtMedia((media) => ({
                              ...media,
                              preview: previewList,
                              origin: files,
                            }));
                          }
                        }}
                      />
                      <label htmlFor="cmt-media">
                        <img
                          src={mediaSvg}
                          alt="media-icon"
                          htmlFor="cmt-media"
                        />
                      </label>
                    </form>
                  )}
                  {(mainComment || cmtMedia.origin.length > 0) && (
                    <img
                      src={sendSvg}
                      alt="send-icon"
                      onClick={() => {
                        dispatch(
                          addCmtReq({
                            productId,
                            mainComment,
                            media: cmtMedia.origin,
                            token,
                          })
                        );
                        setCmtMedia((media) => ({
                          ...media,
                          origin: [],
                          preview: [],
                        }));
                        setMainComment("");
                      }}
                    />
                  )}
                </div>
              </Row>
              <textarea
                type="text"
                placeholder="What is your first impression about this product?"
                value={mainComment}
                onChange={(e) => {
                  setMainComment(e.target.value);
                }}
                onKeyUp={(e) => {
                  e.preventDefault();
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                  if (mainComment.trim() !== "" && e.keyCode === 13) {
                    dispatch(
                      addCmtReq({
                        productId,
                        mainComment,
                        media: cmtMedia.origin,
                        token,
                      })
                    );
                    setMainComment("");
                    setCmtMedia((media) => ({
                      ...media,
                      origin: [],
                      preview: [],
                    }));
                  }
                }}
              />
              <Row className="cmt-media-list-ct">
                {cmtMedia.preview.map((media, index) =>
                  media.type.includes("image") ? (
                    <img
                      src={media.url}
                      alt="cmt-media-preview-img"
                      key={index}
                    />
                  ) : (
                    <ReactPlayer
                      url={[
                        { src: media.url, type: "video/webm" },
                        { src: media.url, type: "video/ogg" },
                      ]}
                      key={index}
                      controls
                      playing
                      loop
                    />
                  )
                )}
              </Row>
            </Col>
          </Row>
        )}

        {cmtList.length > 0 && <HorizontalDivider />}

        {cmtList
          .map((comment) => (
            <div key={comment._id}>
              <CommentCard
                comment={comment}
                currentUser={currentUser}
                productId={productId}
                token={token}
              />
              <HorizontalDivider line={1} />
            </div>
          ))
          .reverse()}
      </div>
      <ChatModal
        socket={socket}
        currentUser={currentUser}
        product={product}
        token={token}
      />
      <Toast
        show={didAddOrder}
        onClose={() => setAddOrder(!didAddOrder)}
        style={{
          position: "absolute",
          top: 120,
          right: 10,
        }}
      >
        <Toast.Header>
          <b>Just now</b>
        </Toast.Header>
        <Toast.Body>
          Woohoo,
          <b>
            {quantity} x {product.name}&nbsp;
          </b>
          {quantity === 1 ? "was" : "were"} added to your cart
        </Toast.Body>
      </Toast>
      <Footer />
    </>
  );
}

export default Product;
