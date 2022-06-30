const Types = {
  GET_MOST_DISCOUNTS_PRODUCTS: '[PRODUCTS] get most discounts products',
  GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS: '[PRODUCTS] get most discounts products success',
  GET_NEW_ARRIVAL_PRODUCTS: '[PRODUCTS] get new arrival products',
  GET_NEW_ARRIVAL_PRODUCTS_SUCCESS: '[PRODUCTS] get new arrival products success',
  GET_BEST_SALE_PRODUCTS: '[PRODUCTS] get best sale products',
  GET_BEST_SALE_PRODUCTS_SUCCESS: '[PRODUCTS] get best sale products success',
  GET_CURRENT_PRODUCT: '[PRODUCTS] get product',
  GET_CURRENT_PRODUCT_SUCCESS: '[PRODUCTS] get product success',
  GET_ALL_PRODUCTS: '[PRODUCTS] get all products',
  GET_ALL_PRODUCTS_SUCCESS: '[PRODUCTS] get all products success',
  GET_PRODUCTS_BY_CATEGORY: '[PRODUCTS] get products by category',
  GET_PRODUCTS_BY_CATEGORY_SUCCESS: '[PRODUCTS] get products by category success',
  FAILED_PRODUCT_ACTION: '[PRODUCTS] failed product action',
};

// request actions
const getAllProductAction  = ({pageIndex, limit}) => ({
  type: Types.GET_ALL_PRODUCTS,
  payload: {
    pageIndex,
    limit,
  },
});

const getProductsByCategoryAction  = ({category, pageIndex, limit}) => ({
  type: Types.GET_PRODUCTS_BY_CATEGORY,
  payload: {
    category,
    pageIndex,
    limit,
  },
});

const getMostDiscountsProductsAction = ({pageIndex, limit}) => ({
  type: Types.GET_MOST_DISCOUNTS_PRODUCTS,
  payload: {
    pageIndex,
    limit,
  },
});

const getBestSaleProductsAction = ({pageIndex, limit}) => ({
  type: Types.GET_BEST_SALE_PRODUCTS,
  payload: {
    pageIndex,
    limit,
  },
});

const getNewArrivalProductsAction = ({pageIndex, limit}) => ({
  type: Types.GET_NEW_ARRIVAL_PRODUCTS,
  payload: {
    pageIndex,
    limit,
  },
});

const getCurrentProductAction  = ({productId}) => ({
  type: Types.GET_CURRENT_PRODUCT,
  payload: {
    productId,
  },
});

// success actions
const getProductsSuccessAction = ({products}) => ({
  type: Types.GET_ALL_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getProductsByCategorySuccessAction = ({products}) => ({
  type: Types.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  payload: {
    products,
  },
});

const getMostDiscountsProductsSuccessAction = ({products}) => ({
  type: Types.GET_MOST_DISCOUNTS_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getBestSaleProductsSuccessAction = ({products}) => ({
  type: Types.GET_BEST_SALE_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getNewArrivalProductsSuccessAction = ({products}) => ({
  type: Types.GET_NEW_ARRIVAL_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const getCurrentProductsSuccessAction = ({product}) => ({
  type: Types.GET_CURRENT_PRODUCT_SUCCESS,
  payload: {
    product,
  },
});

// failed actions
const getFailedProductAction  = ({err}) => ({
  type: Types.FAILED_PRODUCT_ACTION,
  payload: {
    err,
  },
});

export {
  Types,
  getAllProductAction ,
  getProductsByCategoryAction,
  getBestSaleProductsAction,
  getMostDiscountsProductsAction,
  getNewArrivalProductsAction,
  getCurrentProductAction,
  getProductsSuccessAction,
  getProductsByCategorySuccessAction,
  getBestSaleProductsSuccessAction,
  getMostDiscountsProductsSuccessAction,
  getNewArrivalProductsSuccessAction,
  getCurrentProductsSuccessAction,
  getFailedProductAction,
};