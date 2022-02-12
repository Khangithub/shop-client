import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Row, Col } from "react-bootstrap";
import { getOrdersRequest } from "../actions/order";
import { returnTotalPrice } from "../helpers";

import { isEmpty } from "lodash";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import OrderCard from "../components/OrderCard/";
import orderAd from "../images/common/order-ad.jpg";

import "./Orders.css";
import { getCurrentUserRequest } from "../actions/user";

function Order() {
  const dispatch = useDispatch();
  const { token, userLoading, userErr } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUserRequest());
  }, [dispatch]);

  const { orders, orderLoading, orderErr } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrdersRequest({token}));
  }, [dispatch, token]);

  if (isEmpty(token)) return <Loading />;
  if (orderLoading || userLoading) return <Loading />;
  if (!isEmpty(orderErr) || !isEmpty(userErr)) return <Loading />;

  return (
    <div className="order">
      <NavBar />
      <Row className="order__list__container">
        <Col sm={12} md={9} className="order__card__list">
          <div className="order__ad__image">
            <Image src={orderAd} alt="orderAd" />
            <h1>Your shopping cart</h1>
          </div>

          {orders
            .map((order, index) => {
              return <OrderCard order={order} key={index} forBuyer />;
            })
            .reverse()}
        </Col>

        <Col sm={12} md={3} className="order__checkout">
          <div className="order__checkout__total__price">
            <span>Subtotals {orders?.length} items:</span>
            <span>${returnTotalPrice(orders)}</span>
          </div>
          <div className="order__checkout__gift__checkbox">
            <input type="checkbox" />
            <label htmlFor="gift"> This order contains a gift</label>
          </div>
          <button>Proceed to Checkout</button>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Order;
