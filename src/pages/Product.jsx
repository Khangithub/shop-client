import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
  getProductRequest,
  getProductsByCategoryRequest,
} from "../actions/product";
import { isEmpty } from "lodash";
import { getNetPrice } from "../helpers";

import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard/";
// import AddMainCommentForm from "../components/Product/AddMainCommentForm/";
// import ProductCommentList from "../components/Product/ProductCommentList/";
import HorizontalDivider from "../components/HorizontalDivider";

import shippingBanner4 from "../assets/banners/shipping-4.jpg";
import shippingBanner3 from "../assets/banners/shipping-3.jpg";
import shippingBanner2 from "../assets/banners/shipping-2.jpg";
import shippingBanner1 from "../assets/banners/shipping-1.jpg";

import "./_product.scss";
// import { getCurrentUserRequest } from "../actions/user";
import HorizontalDevider from "../components/HorizontalDivider";

function Product() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useRouteMatch().params;
  const { token } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(getCurrentUserRequest());
  // }, [productId, dispatch]);

  const { product, productLoading, productErr } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductRequest({ productId }));
  }, [productId, dispatch]);

  const { productsByCategory } = useSelector((state) => state.product);

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

  // let [productCommentList, setProductCommentList] = useState([]);
  let [quantity, setQuantity] = useState(1);
  let [seeMoreText, setSeeMore] = useState(true);

  if (isEmpty(product)) return <Loading errMsg={product} />;
  if (productLoading) return <Loading errMsg={productLoading} />;
  if (!isEmpty(productErr)) return <Loading errMsg={productErr} />;

  const truncatDes = (des) => {
    let copiedDes = "".concat(des);
    let firstPart = copiedDes.slice(0, 700);
    let text = seeMoreText ? firstPart : copiedDes;

    return (
      <>
        <span>{text}</span>
        <strong onClick={() => setSeeMore(!seeMoreText)}>
          &nbsp;&nbsp;...&nbsp;{seeMoreText ? "see more" : "see less"}
        </strong>
      </>
    );
  };

  return (
    <>
      <NavBar />
      <div className="product">
        <Row className="product-info-container">
          <Col sm={12} md={4} lg={4}>
            <img
              src={product.productImage}
              draggable={false}
              alt="product-img"
              className="product-info-img"
            />
          </Col>
          <Col sm={12} md={4} lg={5} className="product-info-detail-container">
            {/* <Row>
            <EditProductButton product={product} />

            <DeleteProductButton product={product} />
          </Row> */}
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
              <h3>${getNetPrice(product)} &nbsp;</h3>
              {product.discount && (
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
                    <button>-</button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button>+</button>
                  </div>
                </Row>
                <button className="add-to-cart-btn" onClick={() => {}}>
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
            <Col sm={12} md={4} lg={3} className="product-signin-container">
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

        <Container>
          <p className="section-title">productList of the same category</p>
          <Row>
            {productsByCategory.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Row>

          <HorizontalDevider line={3} />

          {/* <p className="section-title">comments about this product</p>
          {!isEmpty(token) && (
            <AddMainCommentForm
              productId={productId}
              setProductCommentList={setProductCommentList}
            />
          )}
          <ProductCommentList
            productId={productId}
            productCommentList={productCommentList}
            setProductCommentList={setProductCommentList}
          /> */}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Product;
