const Types = {
  GET_ORDERS_REQUEST: 'orders/get_orders_request',
  GET_ORDERS_SUCCESS: 'orders/get_orders_success',
  UPDATE_ORDERS_ITEM_QUANTITY_REQUEST: 'orders/update_orders_item_quantity_request',
  UPDATE_ORDERS_ITEM_QUANTITY_SUCCESS: 'orders/update_orders_item_quantity_success',
  DEL_ORDER_RQ: 'orders/del_order_rq',
  DEL_ORDER_SC: 'orders/del_order_sc',
  FAILED_ORDERS_REQUEST: 'orders/get_failed_request',
};

const getOrdersRequest = ({token}) => ({
  type: Types.GET_ORDERS_REQUEST,
  payload: {
    token,
  },
});

const updateOrdersItemRequest = ({orderId, quantity, token}) => ({
  type: Types.UPDATE_ORDERS_ITEM_QUANTITY_REQUEST,
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
  type: Types.GET_ORDERS_SUCCESS,
  payload: {
    orders,
  },
});

const updateOrdersItemSuccess = ({orderId, quantity}) => ({
  type: Types.UPDATE_ORDERS_ITEM_QUANTITY_SUCCESS,
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
  getOrdersRequest,
  getOrdersFailedRequest,
  delOrderReq,
  getOrdersSuccess,
  updateOrdersItemSuccess,
  delOrderSuc,
  updateOrdersItemRequest,
};
