import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getMostDiscountsProductsSuccess,
  getBestSaleProductsSuccess,
  getFailedRequest,
  Types,
} from '../actions/product';
import {
  getMostDiscoutsProductsCall,
  getBestSaleProductsCall,
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

const productSaga = [
  fork (getMostDiscountsProductsRequestWatcher),
  fork (getBestSaleProductsWatcher),
];

export default productSaga;
