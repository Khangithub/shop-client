import {Types} from '../actions/product';

const INTIAL_STATE = {
  mostDiscountsProducts: [],
  bestSaleProducts: [],
  loading: true,
  err: {},
};

export default function products (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        mostDiscountsProducts: action.payload.products,
      };
    }

    case Types.GET_BEST_SALE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        bestSaleProducts: action.payload.products,
      };
    }

    case Types.FAILED_REQUEST: {
      return {
        ...state,
        loading: true,
        err: action.payload.err,
      };
    }

    default: {
      return state;
    }
  }
}
