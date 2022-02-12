const Types = {
  GET_ORDERS_REQUEST: 'orders/get_orders_request',
  GET_ORDERS_SUCCESS: 'orders/get_orders_success',
  FAILED_ORDERS_REQUEST: 'orders/get_failed_request',
};

const getOrdersRequest = ({token}) => ({
  type: Types.GET_ORDERS_REQUEST,
  payload: {
    token,
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

export {Types, getOrdersSuccess, getOrdersRequest, getOrdersFailedRequest};
