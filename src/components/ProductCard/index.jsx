import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import "../_components.scss";
import { getRandomInRange, returnPrice } from "../../helpers";
import EditProductButton from "./EditProductButton";
import DeleteProductButton from "./DeleteProductButton";

export default function ProductCard({
  product,
  canEdit,
  canDelete,
  showPriceOnly,
  xs = 6,
  sm = 4,
  md = 3,
  lg = 2,
}) {
  const history = useHistory();
  const rating = getRandomInRange(1, 5);
  const soldProgress = getRandomInRange(1, 100);
  const soldQuantity = getRandomInRange(1, 1000);

  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} className="product-card">
      <div className="product-card-button-list">
        {canEdit && <EditProductButton product={product} />}
        {canDelete && <DeleteProductButton product={product} />}
      </div>
      <div
        className="product-card-container"
        onClick={() => {
          history.push(`/${product._id}`);
        }}
      >
        {/* <Image
          src={product.productImage}
          alt="productImage"
          className=""
        /> */}
        <div
          className="product-card-img"
          style={{ background: `url(${product.productImage})` }}
        ></div>

        <div className="product-card-info">
          <Row>
            <Col className="product-card-name">
              <p>{product.name}</p>
            </Col>
          </Row>

          <Row>
            <Col className="product-card-price">
              <Row
                className={
                  product.discount
                    ? "product-card-net-price"
                    : "product-card-net-price-hide"
                }
              >
                <span>{returnPrice(product)}$ &nbsp;&nbsp;</span>
                <Badge variant="danger">-{product.discount}%</Badge>
              </Row>
              <p
                className={
                  product.discount
                    ? "product-card-gross-price-remove"
                    : "product-card-gross-price"
                }
              >
                {product.price}$
              </p>
            </Col>
          </Row>

          {!showPriceOnly && (
            <>
              <Row>
                <Col className="product-card-rating">
                  {Array(rating)
                    .fill()
                    .map((_, index) => (
                      <span role="img" key={index} aria-label="">
                        ⭐
                      </span>
                    ))}
                </Col>
              </Row>

              <Row>
                <Col xs={11}>
                  <div class="progress">
                    <div
                      class="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: `${soldProgress}%` }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </Col>
                <Col xs={12} className="product-card-sold-quantity">
                  <p>{`sold ${Math.round(
                    (soldQuantity * soldProgress) / 100
                  )}/${soldQuantity}`}</p>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    </Col>
  );
}
