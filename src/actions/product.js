const Types = {
  GET_SALE_OFF_PRODUCTS_REQUEST: 'products/get_sale_off_products',
  GET_SALE_OFF_PRODUCTS: 'products/get_sale_off_products',
  GET_ALL_PRODUCT: 'products/get_all_product',
  FAILED_REQUEST: 'products/failed_request',
};

const getSaleOffProducts = ({products}) => ({
  type: Types.GET_SALE_OFF_PRODUCTS,
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

module.exports = {
  Types,
  getSaleOffProducts,
  getSaleOffProductsRequest,
  getFailedRequest
};
