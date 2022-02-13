import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getMostDiscountsProductsSuccess,
  getBestSaleProductsSuccess,
  getFailedRequest,
  Types,
  getNewArrivalProductsSuccess,
  getProductSuccess,
  getAllProductsSuccess,
  getProductsByCategorySuccess,
} from '../actions/product';
import {
  getProductsByCategoryCall,
  getMostDiscoutsProductsCall,
  getBestSaleProductsCall,
  getNewArrivalProductsCall,
  getProductCall,
  getAllProductsCall,
} from '../api/product';

// generator functions
function* getAllProductsGenerator({payload: {pageIndex, limit}}) {
  try {
    const products = yield call (getAllProductsCall, {
      pageIndex,
      limit,
    });

    yield put (getAllProductsSuccess ({products}));
  } catch (err) {
    yield put (
      getFailedRequest ({
        productErr: err,
      })
    );
  }
}

function* getProductsByCategoryGenerator({
  payload: {category, pageIndex, limit},
}) {
  try {
    const products = yield call (getProductsByCategoryCall, {
      category,
      pageIndex,
      limit,
    });
    yield put (getProductsByCategorySuccess ({products}));
  } catch (err) {
    yield put (
      getFailedRequest ({
        productErr: err,
      })
    );
  }
}

function* getMostDiscountsProductsGenerator({payload: {pageIndex, limit}}) {
  try {
    const products = yield call (getMostDiscoutsProductsCall, {
      pageIndex,
      limit,
    });
    yield put (
      getMostDiscountsProductsSuccess ({
        products,
      })
    );
  } catch (err) {
    yield put (
      getFailedRequest ({
        productErr: err,
      })
    );
  }
}

function* getBestSaleProductsGenerator({payload: {pageIndex, limit}}) {
  try {
    const products = yield call (getBestSaleProductsCall, {
      pageIndex,
      limit,
    });
    yield put (getBestSaleProductsSuccess ({products}));
  } catch (err) {
    yield put (
      getFailedRequest ({
        err,
      })
    );
  }
}

function* getNewArrivalProductsGenerator({payload: {pageIndex, limit}}) {
  try {
    const products = yield call (getNewArrivalProductsCall, {
      pageIndex,
      limit,
    });
    yield put (getNewArrivalProductsSuccess ({products}));
  } catch (err) {
    yield put (
      getFailedRequest ({
        productErr: err,
      })
    );
  }
}

function* getProductGenerator({payload: {productId}}) {
  try {
    const product = yield call (getProductCall, {
      productId,
    });
    yield put (getProductSuccess ({product}));
  } catch (err) {
    yield put (
      getFailedRequest ({
        productErr: err,
      })
    );
  }
}

// watcher functions
function* getMostDiscountsProductsRequestWatcher () {
  yield takeLatest (
    Types.GET_MOST_DISCOUNTS_PRODUCTS_REQUEST,
    getMostDiscountsProductsGenerator
  );
}

function* getBestSaleProductsWatcher () {
  yield takeLatest (
    Types.GET_BEST_SALE_PRODUCTS_REQUEST,
    getBestSaleProductsGenerator
  );
}

function* getNewArrivalProductsWatcher () {
  yield takeLatest (
    Types.GET_NEW_ARRIVAL_PRODUCTS_REQUEST,
    getNewArrivalProductsGenerator
  );
}

function* getProductWatcher () {
  yield takeLatest (Types.GET_PRODUCT_REQUEST, getProductGenerator);
}

function* getAllProductsWatcher () {
  yield takeLatest (Types.GET_ALL_PRODUCTS_REQUEST, getAllProductsGenerator);
}

function* getProductsByCategoryWatcher () {
  yield takeLatest (
    Types.GET_PRODUCTS_BY_CATEGORY_REQUEST,
    getProductsByCategoryGenerator
  );
}

const productSaga = [
  fork (getAllProductsWatcher),
  fork (getMostDiscountsProductsRequestWatcher),
  fork (getBestSaleProductsWatcher),
  fork (getNewArrivalProductsWatcher),
  fork (getProductWatcher),
  fork (getProductsByCategoryWatcher),
];

export default productSaga;
