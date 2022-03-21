import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, Footer, Loading, OrderCard } from "../components";
import { getOrderReq } from "../actions/order";
import { trashCanSvg } from "../assets";
import { isEmpty } from "lodash";

import "./_orders.scss";

function Order({ currentUser, token }) {
  const dispatch = useDispatch();

  const { orders, orderLoading, orderErr } = useSelector(({ order }) => order);

  useEffect(() => {
    dispatch(getOrderReq({ token }));
  }, [dispatch, token]);

  const [selectedOrders, setSelectedOrders] = useState([]);

  if (orderLoading) return <Loading />;
  if (!isEmpty(orderErr)) return <Loading />;

  return (
    <>
      <NavBar currentUser={currentUser} token={token} />
      <div className="order">
        <h2>Your cart</h2>

        <div className="order-list-ct">
          <div className="order-list-layout">
            <div className="order-list-header">
              <input
                type="checkbox"
                name="selected-orders"
                id="selected-orders"
                checked={selectedOrders.length === orders.length}
                onChange={() => {
                  if (selectedOrders.length === orders.length) {
                    setSelectedOrders([]);
                  } else {
                    const allOrders = orders.map((order) => order.product._id);
                    setSelectedOrders(allOrders);
                  }
                }}
              />
              <div htmlFor="selected-orders">
                <strong>Total Orders:&nbsp;</strong>
                <span>({orders.length} products)</span>
              </div>

              <b>unit price</b>
              <b>quantity</b>
              <b>real price</b>

              <img src={trashCanSvg} alt="del" />
            </div>

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
          </div>

          <div className="order-checkout-ct">
            <div className="order-address-ct">
              <div className="order-address-header">
                <span>Deliver to</span>
                <span>Change</span>
              </div>

              <div className="order-address-body">

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Order;
