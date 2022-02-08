const Types = {
  GET_MOST_DISCOUNTS_PRODUCTS_REQUEST: 'products/get_most_discounts_products_request',
  GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS: 'products/get_most_discounts_products_success',
  GET_NEW_ARRIVAL_PRODUCTS_REQUEST: 'products/get_new_arrival_products_request',
  GET_NEW_ARRIVAL_PRODUCTS_SUCCESS: 'products/get_new_arrival_products_success',
  GET_BEST_SALE_PRODUCTS_REQUEST: 'products/get_best_sale_products_request',
  GET_BEST_SALE_PRODUCTS_SUCCESS: 'products/get_best_sale_products_success',
  GET_ALL_PRODUCT: 'products/get_all_product',
  FAILED_REQUEST: 'products/failed_request',
};

// request actions
const getMostDiscountsProductsRequest = ({pageIndex, limit}) => ({
  type: Types.GET_MOST_DISCOUNTS_PRODUCTS_REQUEST,
  payload: {
    pageIndex,
    limit,
  },
});

const getBestSaleProductsRequest = ({pageIndex, limit}) => ({
  type: Types.GET_BEST_SALE_PRODUCTS_REQUEST,
  payload: {
    pageIndex,
    limit,
  },
});

const getNewArrivalProductsRequest = ({pageIndex, limit}) => ({
  type: Types.GET_NEW_ARRIVAL_PRODUCTS_REQUEST,
  payload: {
    pageIndex,
    limit,
  },
});

// success actions
const getMostDiscountsProductsSuccess = ({products}) => ({
  type: Types.GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getBestSaleProductsSuccess = ({products}) => ({
  type: Types.GET_BEST_SALE_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getNewArrivalProductsSuccess = ({products}) => ({
  type: Types.GET_NEW_ARRIVAL_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

// failed actions
const getFailedRequest = ({err}) => ({
  type: Types.FAILED_REQUEST,
  payload: {
    err,
  },
});

export {
  Types,
  getBestSaleProductsRequest,
  getMostDiscountsProductsRequest,
  getNewArrivalProductsRequest,
  getBestSaleProductsSuccess,
  getMostDiscountsProductsSuccess,
  getNewArrivalProductsSuccess,
  getFailedRequest,
};
