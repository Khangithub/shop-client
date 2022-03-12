import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getOrderReq } from "../actions/order";
import { isEmpty } from "lodash";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import OrderCard from "../components/OrderCard";

import trashCanSvg from "../assets/svgs/trashCan.svg";
import "./_orders.scss";

function Order({ currentUser, token }) {
  const dispatch = useDispatch();

  const { orders, orderLoading, orderErr } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrderReq({ token }));
  }, [dispatch, token]);

  const [selectedOrders, setSelectedOrders] = useState([]);

  if (orderLoading) return <Loading errMsg={orderLoading} />;
  if (!isEmpty(orderErr)) return <Loading errMsg={orderErr} />;

  return (
    <>
      <NavBar currentUser={currentUser} token={token} />
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
                  checked={selectedOrders.length === orders.length}
                  onChange={() => {
                    if (selectedOrders.length === orders.length) {
                      setSelectedOrders([]);
                    } else {
                      const allOrders = orders.map(
                        (order) => order.product._id
                      );
                      setSelectedOrders(allOrders);
                    }
                  }}
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
                return (
                  <OrderCard
                    order={order}
                    key={index}
                    selectedOrders={selectedOrders}
                    setSelectedOrders={setSelectedOrders}
                  />
                );
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
