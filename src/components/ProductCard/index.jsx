import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Badge } from "react-bootstrap";
import { getUnitPrice } from "../../helpers/number";
import "./_productCard.scss";

export default function ProductCard({
  product,
  showPriceOnly,
  xs = 6,
  sm = 4,
  md = 3,
  lg = 2,
}) {
  const history = useHistory();

  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} className="prod-card-ct">
      <div
        className="prod-card-layout"
        onClick={() => {
          history.push(`/products/${product._id}`);
        }}
      >
        <div
          className="prod-card-img"
          style={{ background: `url(${product.productImage})` }}
        ></div>

        <div className="prod-card-info">
          <h4 className="prod-card-name">{product.name}</h4>

          <div className="prod-card-price">
            <div className={!product.discount ? "net-price--hide" : ""}>
              <b>{getUnitPrice(product)}$ &nbsp;&nbsp;</b>
              <Badge variant="danger">-{product.discount}%</Badge>
            </div>
            <p
              className={
                product.discount ? "gross-price--remove" : "gross-price"
              }
            >
              {product.price}$
            </p>
          </div>

          {!showPriceOnly && (
            <>
              <div>
                {Array(product.rating)
                  .fill()
                  .map((_, index) => (
                    <span role="img" key={index} aria-label="">
                      ⭐
                    </span>
                  ))}
              </div>

              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{
                    width: `${(product.sold / product.inStock) * 100}%`,
                  }}
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <p className="prod-card-sold-qty">{`sold ${product.sold}/${product.inStock}`}</p>
            </>
          )}
        </div>
      </div>
    </Col>
  );
}
