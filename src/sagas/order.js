import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getOrdersFailedRequest,
  getOrdersSuccess,
  Types,
} from '../actions/order';
import {getOrdersCall} from '../api/order';

function* getOrdersGenerator({payload: {token}}) {
  try {
    const orders = yield call (getOrdersCall, {
      token,
    });

    yield put (
      getOrdersSuccess ({
        orders,
      })
    );
  } catch (err) {
    yield put (
      getOrdersFailedRequest ({
        orderErr: err,
      })
    );
  }
}

// wacher functions
function* getOrdersWatcher () {
  yield takeLatest (Types.GET_ORDERS_REQUEST, getOrdersGenerator);
}

const orderSaga = [fork (getOrdersWatcher)];

export default orderSaga;
