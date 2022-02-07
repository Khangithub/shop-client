const Types = {
  GET_MOST_DISCOUNTS_PRODUCTS_REQUEST: 'products/get_most_discounts_products_request',
  GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS: 'products/get_most_discounts_products_success',
  GET_ALL_PRODUCT: 'products/get_all_product',
  FAILED_REQUEST: 'products/failed_request',
};

const getSaleOffProductsSuccess = ({products}) => ({
  type: Types.GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getMostDiscountsProductsRequest = ({pageIndex, limit}) => ({
  type: Types.GET_MOST_DISCOUNTS_PRODUCTS_REQUEST,
  payload: {
    pageIndex,
    limit,
  },
});

const getFailedRequest = ({err}) => ({
  type: Types.FAILED_REQUEST,
  payload: {
    err,
  },
});

export {
  Types,
  getSaleOffProductsSuccess,
  getMostDiscountsProductsRequest,
  getFailedRequest,
};
