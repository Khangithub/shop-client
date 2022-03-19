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
        <div className="order-list-ct">
          <div className="order-list-layout">
            <h1>Your cart</h1>

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
            <span>fdsafndjs</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Order;
