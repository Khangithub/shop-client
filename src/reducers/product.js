import {Types} from '../actions/product';

const INTIAL_STATE = {
  mostDiscntProds: [],
  bestSaleProds: [],
  newArrivalProds: [],
  products: [],
  productsByCategory: [],
  product: {},
  prodLoading: true,
  prodErr: {},
};

export default function products (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS: {
      return {
        ...state,
        prodLoading: false,
        mostDiscntProds: action.payload.products,
      };
    }

    case Types.GET_BEST_SALE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        prodLoading: false,
        bestSaleProds: action.payload.products,
      };
    }

    case Types.GET_NEW_ARRIVAL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        prodLoading: false,
        newArrivalProds: action.payload.products,
      };
    }

    case Types.GET_CURRENT_PRODUCT_SUCCESS: {
      return {
        ...state,
        prodLoading: false,
        product: action.payload.product,
      };
    }

    case Types.GET_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        prodLoading: false,
        products: action.payload.products,
      };
    }

    case Types.GET_PRODUCTS_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        prodLoading: false,
        productsByCategory: action.payload.products
      }
    }

    case Types.FAILED_PRODUCT_ACTION: {
      return {
        ...state,
        prodLoading: true,
        prodErr: action.payload.prodErr,
      };
    }

    default: {
      return state;
    }
  }
}
