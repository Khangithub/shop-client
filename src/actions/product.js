const Types = {
  GET_MOST_DISCOUNTS_PRODUCTS_REQUEST: 'products/get_most_discounts_products_request',
  GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS: 'products/get_most_discounts_products_success',
  GET_NEW_ARRIVAL_PRODUCTS_REQUEST: 'products/get_new_arrival_products_request',
  GET_NEW_ARRIVAL_PRODUCTS_SUCCESS: 'products/get_new_arrival_products_success',
  GET_BEST_SALE_PRODUCTS_REQUEST: 'products/get_best_sale_products_request',
  GET_BEST_SALE_PRODUCTS_SUCCESS: 'products/get_best_sale_products_success',
  GET_PRODUCT_REQUEST: 'products/get_product_request',
  GET_PRODUCT_SUCCESS: 'products/get_product_success',
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

const getProductRequest = ({productId}) => ({
  type: Types.GET_PRODUCT_REQUEST,
  payload: {
    productId,
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

const getProductSuccess = ({product}) => ({
  type: Types.GET_PRODUCT_SUCCESS,
  payload: {
    product
  }
})

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
  getProductRequest,
  getBestSaleProductsSuccess,
  getMostDiscountsProductsSuccess,
  getNewArrivalProductsSuccess,
  getProductSuccess,
  getFailedRequest,
};
