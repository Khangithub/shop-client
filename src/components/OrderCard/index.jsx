import React from "react";
import { Row, Col } from "react-bootstrap";
import { returnPrice } from "../../helpers";

import "./_orderCard.scss";
import trashCanSvg from "../../assets/svgs/trashCan.svg";

function OrderCard({ order, selectedOrders, setSelectedOrders }) {
  const { product } = order;

  return (
    <div className="order-card">
      <Row>
        <small>See more products from shop "{product.saler.username}"</small>
      </Row>
      <Row className="order-card-container">
        <Col xs={1} lg={1}>
          <input
            type="checkbox"
            name="order"
            id="order"
            checked={selectedOrders.includes(product._id)}
            onChange={() => {
              if (selectedOrders.includes(product._id)) {
                const rmOrders = selectedOrders.filter(
                  (order) => order !== product._id
                );
                setSelectedOrders(rmOrders);
              } else {
                setSelectedOrders([...selectedOrders, product._id]);
              }
            }}
          />
        </Col>
        <Col xs={3} lg={3}>
          <div className="order-name">
            <img src={product.productImage} alt="product img" />
            <span>{product.name}</span>
          </div>
        </Col>
        <Col xs={2} lg={2}>
          <div className="order-unit-price">
            <strong>
              ${product.discount ? returnPrice(product) : ` ${product.price}`}
            </strong>
            {product.discount && <p>${product.price}</p>}
          </div>
        </Col>
        <Col xs={2} lg={2}>
          <div className="order-quantity-btn">
            <button>-</button>
            <input type="number" min="1" placeholder="1" />
            <button>+</button>
          </div>
        </Col>
        <Col xs={2} lg={2}>
          <strong className="order-real-price">${returnPrice(product)}</strong>
        </Col>
        <Col xs={1} lg={1}>
          <div>
            <img src={trashCanSvg} alt="del" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default OrderCard;
