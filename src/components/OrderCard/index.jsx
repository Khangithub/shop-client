import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { returnPrice } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { updateOrdersItemRequest } from "../../actions/order";
import { getCurrentUserRequest } from "../../actions/user";
import Loading from "../Loading";

import trashCanSvg from "../../assets/svgs/trashCan.svg";

import "./_orderCard.scss";

function OrderCard({ order, selectedOrders, setSelectedOrders }) {
  const dispatch = useDispatch();
  const { product, _id } = order;
  const [quantity, setQuantity] = useState(order.quantity);
  var [timeoutPivot, setTimeoutPivot] = useState(null);

  const { currentUser, token, userLoading, userErr } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getCurrentUserRequest());
  }, [dispatch]);

  const decreaseQuantity = () => {
    const newVal = quantity - 1 < 0 ? 0 : quantity - 1;
    setQuantity(newVal);

    if (timeoutPivot) clearTimeout(timeoutPivot);

    setTimeoutPivot(
      setTimeout(() => {
        dispatch(
          updateOrdersItemRequest({ orderId: _id, quantity: newVal, token })
        );
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
        dispatch(
          updateOrdersItemRequest({ orderId: _id, quantity: newVal, token })
        );
      }, 2000)
    );
  };

  if (isEmpty(currentUser)) return <Loading />;
  if (userLoading) return <Loading />;
  if (!isEmpty(userErr)) return <Loading />;

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
          <strong className="order-real-price">
            ${returnPrice(product) * quantity}
          </strong>
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
