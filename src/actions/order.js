const Types = {
  GET_ORDERS_RQ: 'orders/get_orders_rq',
  GET_ORDERS_SC: 'orders/get_orders_sc',
  ADD_ORDER_RQ: 'orders/add_order_rq',
  ADD_ORDER_SC: 'orders/add_order_sc',
  EDIT_ORDER_RQ: 'orders/edit_order_rq',
  EDIT_ORDER_SC: 'orders/edit_order_sc',
  DEL_ORDER_RQ: 'orders/del_order_rq',
  DEL_ORDER_SC: 'orders/del_order_sc',
  FAILED_ORDERS_REQUEST: 'orders/get_failed_request',
};

const getOrderReq = ({token}) => ({
  type: Types.GET_ORDERS_RQ,
  payload: {
    token,
  },
});

const addOrderReq = ({product, token, quantity}) => ({
  type: Types.ADD_ORDER_RQ,
  payload: {
    product,
    token,
    quantity,
  },
});

const editOrderReq = ({orderId, quantity, token}) => ({
  type: Types.EDIT_ORDER_RQ,
  payload: {
    orderId,
    quantity,
    token,
  },
});

const delOrderReq = ({orderId, token}) => ({
  type: Types.DEL_ORDER_RQ,
  payload: {
    orderId,
    token,
  },
});

const getOrdersSuccess = ({orders}) => ({
  type: Types.GET_ORDERS_SC,
  payload: {
    orders,
  },
});

const addOrderSuc = ({order, message}) => ({
  type: Types.ADD_ORDER_SC,
  payload: {
    order,
    message
  },
});

const editOrderSuc = ({orderId, quantity}) => ({
  type: Types.EDIT_ORDER_SC,
  payload: {
    orderId,
    quantity,
  },
});

const delOrderSuc = ({orderId}) => ({
  type: Types.DEL_ORDER_SC,
  payload: {
    orderId,
  },
});

const getOrdersFailedRequest = ({err}) => ({
  type: Types.FAILED_ORDERS_REQUEST,
  payload: {
    err,
  },
});

export {
  Types,
  getOrderReq,
  addOrderReq,
  getOrdersFailedRequest,
  delOrderReq,
  getOrdersSuccess,
  addOrderSuc,
  editOrderSuc,
  delOrderSuc,
  editOrderReq,
};
