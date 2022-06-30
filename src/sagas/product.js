import {call, fork, put, takeLatest} from 'redux-saga/effects';
import { getBestSaleProductsSuccessAction, getCurrentProductsSuccessAction, getFailedProductAction, getMostDiscountsProductsSuccessAction, getNewArrivalProductsSuccessAction, getProductsByCategorySuccessAction, getProductsSuccessAction, Types } from '../actions/product';
import {
  getProductsByCategoryCall,
  getMostDiscoutsProductsCall,
  getBestSaleProductsCall,
  getNewArrivalProductsCall,
  getProductCall,
  getAllProductsCall,
} from '../apis/product';

// generator functions
function* getAllProductsGenerator({payload: {pageIndex, limit}}) {
  try {
    const products = yield call (getAllProductsCall, {
      pageIndex,
      limit,
    });

    yield put (getProductsSuccessAction ({products}));
  } catch (err) {
    yield put (
      getFailedProductAction ({
        prodErr: err,
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
    yield put (getProductsByCategorySuccessAction ({products}));
  } catch (err) {
    yield put (
      getFailedProductAction ({
        prodErr: err,
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
      getMostDiscountsProductsSuccessAction ({
        products,
      })
    );
  } catch (err) {
    yield put (
      getFailedProductAction ({
        prodErr: err,
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
    yield put (getBestSaleProductsSuccessAction ({products}));
  } catch (err) {
    yield put (
      getFailedProductAction ({
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
    yield put (getNewArrivalProductsSuccessAction ({products}));
  } catch (err) {
    yield put (
      getFailedProductAction ({
        prodErr: err,
      })
    );
  }
}

function* getCurrentProductGenerator({payload: {productId}}) {
  try {
    const product = yield call (getProductCall, {
      productId,
    });
    yield put (getCurrentProductsSuccessAction ({product}));
  } catch (err) {
    yield put (
      getFailedProductAction ({
        prodErr: err,
      })
    );
  }
}

// watcher functions
function* getMostDiscountsProductsRequestWatcher () {
  yield takeLatest (
    Types.GET_MOST_DISCOUNTS_PRODUCTS,
    getMostDiscountsProductsGenerator
  );
}

function* getBestSaleProductsWatcher () {
  yield takeLatest (
    Types.GET_BEST_SALE_PRODUCTS,
    getBestSaleProductsGenerator
  );
}

function* getNewArrivalProductsWatcher () {
  yield takeLatest (
    Types.GET_NEW_ARRIVAL_PRODUCTS,
    getNewArrivalProductsGenerator
  );
}

function* getCurrentProductWatcher () {
  yield takeLatest (Types.GET_CURRENT_PRODUCT, getCurrentProductGenerator);
}

function* getAllProductsWatcher () {
  yield takeLatest (Types.GET_ALL_PRODUCTS, getAllProductsGenerator);
}

function* getProductsByCategoryWatcher () {
  yield takeLatest (
    Types.GET_PRODUCTS_BY_CATEGORY,
    getProductsByCategoryGenerator
  );
}

const productSaga = [
  fork (getAllProductsWatcher),
  fork (getMostDiscountsProductsRequestWatcher),
  fork (getBestSaleProductsWatcher),
  fork (getNewArrivalProductsWatcher),
  fork (getCurrentProductWatcher),
  fork (getProductsByCategoryWatcher),
];

export default productSaga;
