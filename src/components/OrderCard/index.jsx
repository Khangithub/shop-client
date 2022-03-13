import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getUnitPrice, getPrice } from "../../helpers/number";
import { useDispatch, useSelector } from "react-redux";
import { delOrderReq, editOrderReq } from "../../actions/order";

import { trashCanSvg } from "../../assets";

import "./_orderCard.scss";

function OrderCard({ order, selectedOrders, setSelectedOrders }) {
  const dispatch = useDispatch();
  const { product, _id } = order;
  const [quantity, setQuantity] = useState(order.quantity);
  var [timeoutPivot, setTimeoutPivot] = useState(null);

  const { token } = useSelector((state) => state.user);

  const decreaseQuantity = () => {
    const newVal = quantity - 1 < 0 ? 0 : quantity - 1;
    setQuantity(newVal);

    if (timeoutPivot) clearTimeout(timeoutPivot);

    setTimeoutPivot(
      setTimeout(() => {
        dispatch(editOrderReq({ orderId: _id, quantity: newVal, token }));
      }, 2000)
    );
  };

  const increaseQuantity = () => {
    const newVal =
      quantity + 1 > product.inStock ? product.inStock : quantity + 1;
    setQuantity(newVal);

    if (timeoutPivot) clearTimeout(timeoutPivot);

    setTimeoutPivot(
      setTimeout(() => {
        dispatch(editOrderReq({ orderId: _id, quantity: newVal, token }));
      }, 2000)
    );
  };

  return (
    <div className="order-card">
      <div>
        <small>See more products from shop "{product.saler.username}"</small>
      </div>
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
            <b>
              ${product.discount ? getUnitPrice(product) : ` ${product.price}`}
            </b>
            {product.discount && <p>${product.price}</p>}
          </div>
        </Col>
        <Col xs={2} lg={2}>
          <div className="order-quantity-btn">
            <button onClick={decreaseQuantity}>-</button>
            <input
              type="number"
              min="1"
              placeholder="1"
              value={quantity}
              onChange={() => {}}
            />
            <button onClick={increaseQuantity}>+</button>
          </div>
          <small>{product.inStock} products in stock</small>
        </Col>
        <Col xs={2} lg={2}>
          <b className="order-real-price">${getPrice(product, quantity)}</b>
        </Col>
        <Col xs={1} lg={1}>
          <img
            src={trashCanSvg}
            alt="del"
            onClick={() => dispatch(delOrderReq({ orderId: order._id, token }))}
          />
        </Col>
      </Row>
    </div>
  );
}

export default OrderCard;
