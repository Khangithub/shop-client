const Types = {
  GET_ORDERS_REQUEST: 'orders/get_orders_request',
  GET_ORDERS_SUCCESS: 'orders/get_orders_success',
  UPDATE_ORDERS_ITEM_QUANTITY_REQUEST: 'orders/update_orders_item_quantity_request',
  UPDATE_ORDERS_ITEM_QUANTITY_SUCCESS: 'orders/update_orders_item_quantity_success',
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
    token
  },
});

const getOrdersSuccess = ({orders}) => ({
  type: Types.GET_ORDERS_SUCCESS,
  payload: {
    orders,
  },
});

const getOrdersFailedRequest = ({err}) => ({
  type: Types.FAILED_ORDERS_REQUEST,
  payload: {
    err,
  },
});

const updateOrdersItemSuccess = ({orderId, quantity}) => ({
  type: Types.UPDATE_ORDERS_ITEM_QUANTITY_SUCCESS,
  payload: {
    orderId,
    quantity,
  },
});

export {
  Types,
  getOrdersSuccess,
  updateOrdersItemSuccess,
  getOrdersRequest,
  getOrdersFailedRequest,
  updateOrdersItemRequest,
};
