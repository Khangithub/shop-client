import {takeEvery, call, fork, put} from 'redux-saga/effects';
import * as actions from '../actions/product';
import * as api from '../api/product';

function* getSaleOffProducts({payload: {pageIndex}}) {
  try {
    const products = yield call(api.getSaleOffProducts, {pageIndex});
    yield put(
      actions.getSaleOffProducts({
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
  yield takeEvery(actions.Types.GET_SALE_OFF_PRODUCTS_REQUEST, getSaleOffProducts);
}

const productSaga = [fork(watchGetSaleOffProductsRequest)];

export default productSaga;
