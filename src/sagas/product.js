import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getSaleOffProductsSuccess,
  getFailedRequest,
  Types,
} from '../actions/product';
import {getSaleOffProductsRequest} from '../api/product';

function* getSaleOffProductsGenerator({payload: {pageIndex, limit}}) {
  try {
    const products = yield call (getSaleOffProductsRequest, {pageIndex, limit});
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

function* watchGetSaleOffProductsRequest () {
  yield takeLatest (
    Types.GET_SALE_OFF_PRODUCTS_REQUEST,
    getSaleOffProductsGenerator
  );
}

const productSaga = [fork (watchGetSaleOffProductsRequest)];

export default productSaga;
