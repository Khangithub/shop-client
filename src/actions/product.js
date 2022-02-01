const Types = {
  GET_SALE_OFF_PRODUCTS_REQUEST: 'products/get_sale_off_products_request',
  GET_SALE_OFF_PRODUCTS_SUCCESS: 'products/get_sale_off_products_success',
  GET_ALL_PRODUCT: 'products/get_all_product',
  FAILED_REQUEST: 'products/failed_request',
};

const getSaleOffProductsSuccess = ({products}) => ({
  type: Types.GET_SALE_OFF_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getSaleOffProductsRequest = ({pageIndex}) => ({
  type: Types.GET_SALE_OFF_PRODUCTS_REQUEST,
  payload: {
    pageIndex,
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
  getSaleOffProductsRequest,
  getFailedRequest,
};
