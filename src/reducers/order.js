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

    case Types.CREATE_ORDER_SUCCESS: {
      const {order, message} = action.payload;
      const cpOrders = state.orders;
      if (message === 'added') {
        cpOrders.push (order);
        return {
          ...state,
          orderLoading: false,
          orders: cpOrders,
        };
      }

      if (message === 'updated') {
        const orderIndex = cpOrders.map (({_id}) => _id).indexOf (order._id);
        cpOrders[orderIndex].quantity = order.quantity;
        return {
          ...state,
          orders: cpOrders,
        };
      }

      break;
    }

    case Types.EDIT_ORDER_SUCCESS: {
      const {orderId, quantity} = action.payload;
      const cpOrders = state.orders;
      const orderIndex = cpOrders.map (({_id}) => _id).indexOf (orderId);
      cpOrders[orderIndex].quantity = quantity;

      return {
        ...state,
        orders: cpOrders,
      };
    }

    case Types.REMOVE_ORDER_SUCCESS: {
      const {orderId} = action.payload;
      const cpOrders = state.orders;
      const orderIndex = cpOrders.map (({_id}) => _id).indexOf (orderId);
      cpOrders.splice (orderIndex, 1);

      return {
        ...state,
        orders: cpOrders,
      };
    }

    case Types.FAILED_ORDER_ACTION: {
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
