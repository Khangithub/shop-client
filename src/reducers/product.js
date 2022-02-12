import {Types} from '../actions/product';

const INTIAL_STATE = {
  mostDiscountsProducts: [],
  bestSaleProducts: [],
  newArrivalProducts: [],
  product: {},
  productLoading: true,
  productErr: {},
};

export default function products (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productLoading: false,
        mostDiscountsProducts: action.payload.products,
      };
    }

    case Types.GET_BEST_SALE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productLoading: false,
        bestSaleProducts: action.payload.products,
      };
    }

    case Types.GET_NEW_ARRIVAL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productLoading: false,
        newArrivalProducts: action.payload.products,
      };
    }

    case Types.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        productLoading: false,
        product: action.payload.product,
      };
    }

    case Types.FAILED_REQUEST: {
      return {
        ...state,
        productLoading: true,
        productErr: action.payload.productErr,
      };
    }

    default: {
      return state;
    }
  }
}
