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

    case Types.UPDATE_ORDERS_ITEM_QUANTITY_SUCCESS: {
      const {orderId, quantity} = action.payload;
      const updatedOrders = state.orders;
      const orderIndex = updatedOrders.map (({_id}) => _id).indexOf (orderId);
      updatedOrders[orderIndex].quantity = quantity;

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    case Types.DEL_ORDER_SC: {
      const {orderId} = action.payload;
      const newOrderList = state.orders;
      const orderIndex = newOrderList.map (({_id}) => _id).indexOf (orderId);
      newOrderList.splice (orderIndex, 1);

      return {
        ...state,
        orders: newOrderList,
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
