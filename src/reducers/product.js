import {Types} from '../actions/product';

const INTIAL_STATE = {
  saleOffProducts: [],
  loading: true,
  err: {}
};

export default function products (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_SALE_OFF_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        saleOffProducts: action.payload.products
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
