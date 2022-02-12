import {Types} from '../actions/order';

const INTIAL_STATE = {
  orders: [],
  orderLoading: true,
  orderErr: {},
};

export default function order (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_ORDERS_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        orders: action.payload.orders,
      };
    }

    case Types.FAILED_REQUEST: {
      return {
        ...state,
        orderLoading: true,
        orderErr: action.payload.orderErr,
      };
    }

    default: {
      return state;
    }
  }
}
