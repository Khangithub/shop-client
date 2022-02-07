import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getSaleOffProductsSuccess,
  getFailedRequest,
  Types,
} from '../actions/product';
import {getMostDiscoutsProductsCall} from '../api/product';

function* getMostDiscountsProductsGenerator({payload: {pageIndex, limit}}) {
  try {
    const products = yield call (getMostDiscoutsProductsCall, {pageIndex, limit});
    yield put (
      getSaleOffProductsSuccess ({
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

function* getMostDiscountsProductsRequestWatcher () {
  yield takeLatest (
    Types.GET_MOST_DISCOUNTS_PRODUCTS_REQUEST,
    getMostDiscountsProductsGenerator
  );
}

const productSaga = [fork (getMostDiscountsProductsRequestWatcher)];

export default productSaga;
