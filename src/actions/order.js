const Types = {
  GET_ORDERS: "[ORDER] get orders",
  GET_ORDERS_SUCCESS: "[ORDER] get orders success",
  CREATE_ORDER: "[ORDER] create order",
  CREATE_ORDER_SUCCESS: "[ORDER] create order success",
  EDIT_ORDER: "[ORDER] edit order",
  EDIT_ORDER_SUCCESS: "[ORDER] edit order success",
  REMOVE_ORDER: "[ORDER] remove order",
  REMOVE_ORDER_SUCCESS: "[ORDER] remove order success",
  FAILED_ORDER_ACTION: "[ORDER] failed order action",
};

const getOrdersAction = ({ token }) => ({
  type: Types.GET_ORDERS,
  payload: {
    token,
  },
});

const createOrderAction = ({ product, token, quantity }) => ({
  type: Types.CREATE_ORDER,
  payload: {
    product,
    token,
    quantity,
  },
});

const editOrderAction = ({ orderId, quantity, token }) => ({
  type: Types.EDIT_ORDER,
  payload: {
    orderId,
    quantity,
    token,
  },
});

const removeOrderAction = ({ orderId, token }) => ({
  type: Types.REMOVE_ORDER,
  payload: {
    orderId,
    token,
  },
});

const getOrdersSuccessAction = ({ orders }) => ({
  type: Types.GET_ORDERS_SUCCESS,
  payload: {
    orders,
  },
});

const createOrderSuccessAction = ({ order, message }) => ({
  type: Types.CREATE_ORDER_SUCCESS,
  payload: {
    order,
    message,
  },
});

const editOrderSuccessAction = ({ orderId, quantity }) => ({
  type: Types.EDIT_ORDER_SUCCESS,
  payload: {
    orderId,
    quantity,
  },
});

const removeOrderSuccessAction = ({ orderId }) => ({
  type: Types.REMOVE_ORDER_SUCCESS,
  payload: {
    orderId,
  },
});

const getFailedOrderAction = ({ err }) => ({
  type: Types.FAILED_ORDER_ACTION,
  payload: {
    err,
  },
});

export {
  Types,
  getOrdersAction,
  createOrderAction,
  getFailedOrderAction,
  removeOrderAction,
  getOrdersSuccessAction,
  createOrderSuccessAction,
  editOrderSuccessAction,
  removeOrderSuccessAction,
  editOrderAction,
};