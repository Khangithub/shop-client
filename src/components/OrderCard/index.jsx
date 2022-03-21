import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delOrderReq, editOrderReq } from "../../actions/order";
import { getUnitPrice, getPrice } from "../../helpers/number";
import { trashCanSvg } from "../../assets";

import "./_orderCard.scss";

function OrderCard({ order, selectedOrders, setSelectedOrders }) {
  const dispatch = useDispatch();
  const { product, _id } = order;
  const [quantity, setQuantity] = useState(order.quantity);
  var [timeoutPivot, setTimeoutPivot] = useState(null);

  const { token } = useSelector(({ user }) => user);

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
      <small className="visit-shop-link">
        See more products from shop "{product.saler.username}"
      </small>
      <div className="order-card-ct">
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

        <div className="order-info-ct">
          <div className="order-name">
            <img src={product.productImage} alt="product img" />
            <small>{product.name}</small>
          </div>
          <div className="order-unit-price">
            <small className="order-title">unit price:</small>
            <b>
              ${product.discount ? getUnitPrice(product) : ` ${product.price}`}
            </b>
            {product.discount && <p>${product.price}</p>}
          </div>

          <div className="order-qty-ct">
            <small className="order-title">quantity:</small>
            <div className="order-qty-grp-btn-ct">
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
          </div>

          <b className="order-real-price">
            <small className="order-title">real price:</small>$
            {getPrice(product, quantity)}
          </b>
        </div>

        <img
          className="del-order-btn"
          src={trashCanSvg}
          alt=""
          onClick={() => dispatch(delOrderReq({ orderId: order._id, token }))}
        />
      </div>
    </div>
  );
}

export default OrderCard;
