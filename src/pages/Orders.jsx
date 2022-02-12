import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getOrdersRequest } from "../actions/order";
import { getCurrentUserRequest } from "../actions/user";
import { isEmpty } from "lodash";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import OrderCard from "../components/OrderCard/";

import trashCanSvg from "../assets/svgs/trashCan.svg";
import "./_orders.scss";

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
    dispatch(getOrdersRequest({ token }));
  }, [dispatch, token]);

  if (isEmpty(token)) return <Loading />;
  if (orderLoading || userLoading) return <Loading />;
  if (!isEmpty(orderErr) || !isEmpty(userErr)) return <Loading />;

  return (
    <>
      <NavBar />
      <div className="order">
        <Row className="order-list-container">
          <Col sm={12} md={9}>
            <h1>Your cart</h1>

            <Row className="order-list-header">
              <Col xs={1} lg={1}>
                <input
                  type="checkbox"
                  name="selected-orders"
                  id="selected-orders"
                />
              </Col>
              <Col xs={3} lg={3}>
                <label htmlFor="selected-orders">
                  Total Orders: ({orders.length} products)
                </label>
              </Col>
              <Col xs={2} lg={2}>
                unit price
              </Col>
              <Col xs={2} lg={2}>
                quantity
              </Col>
              <Col xs={2} lg={2}>
                real price
              </Col>
              <Col xs={1} lg={1}>
                <div>
                  <img src={trashCanSvg} alt="del" />
                </div>
              </Col>
            </Row>

            {orders
              .map((order, index) => {
                return <OrderCard order={order} key={index} forBuyer />;
              })
              .reverse()}
          </Col>

          <Col sm={12} md={3} className="order-checkout-container">
            <h1>Subtotals {orders?.length} items: ________</h1>
            {/* <span>${returnTotalPrice(orders)}</span>
          <div className="order__checkout__gift__checkbox">
            <input type="checkbox" />
            <label htmlFor="gift"> This order contains a gift</label>
          </div>
          <button>Proceed to Checkout</button> */}
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  );
}

export default Order;
