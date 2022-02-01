import {call, fork, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/product';
import {getSaleOffProducts} from '../api/product';

function* getSaleOffProductsSuccess({payload: {pageIndex}}) {
  try {
    const products = yield call(getSaleOffProducts, {pageIndex});
    yield put(
      actions.getSaleOffProductsSuccess({
        products,
      })
    );
  } catch (err) {
    yield put(
      actions.getFailedRequest({
        err,
      })
    );
  }
}

function* watchGetSaleOffProductsRequest() {
  yield takeLatest(actions.Types.GET_SALE_OFF_PRODUCTS_REQUEST, getSaleOffProductsSuccess);
}

const productSaga = [fork(watchGetSaleOffProductsRequest)];

export default productSaga;
