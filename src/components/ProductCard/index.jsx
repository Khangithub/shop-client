import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Badge } from "react-bootstrap";
import "../_components.scss";
import { returnPrice } from "../../helpers";
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
        <div
          className="product-card-img"
          style={{ background: `url(${product.productImage})` }}
        ></div>

        <div className="product-card-info">
          <h4 className="product-card-name">{product.name}</h4>

          <div className="product-card-price">
            <div className={!product.discount ? "net-price--hide" : undefined}>
              <strong>{returnPrice(product)}$ &nbsp;&nbsp;</strong>
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

              <p className="product-card-sold-quantity">{`sold ${product.sold}/${product.inStock}`}</p>
            </>
          )}
        </div>
      </div>
    </Col>
  );
}
