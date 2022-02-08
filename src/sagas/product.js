import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getMostDiscountsProductsSuccess,
  getBestSaleProductsSuccess,
  getFailedRequest,
  Types,
  getNewArrivalProductsSuccess,
} from '../actions/product';
import {
  getMostDiscoutsProductsCall,
  getBestSaleProductsCall,
  getNewArrivalProductsCall,
} from '../api/product';

// generator functions
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
        err,
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
        err,
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
const productSaga = [
  fork (getMostDiscountsProductsRequestWatcher),
  fork (getBestSaleProductsWatcher),
  fork (getNewArrivalProductsWatcher),
];

export default productSaga;
