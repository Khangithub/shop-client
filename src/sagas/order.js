import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  delOrderSuc,
  getOrdersFailedRequest,
  getOrdersSuccess,
  Types,
  editOrderSuc,
  addOrderSuc,
} from '../actions/order';
import {
  delOrderCall,
  getOrdersCall,
  editOrderCall,
  addOrderCall,
} from '../api/order';

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

function* addOrderGenerator({payload: {token, product, quantity}}) {
  try {
    const {message, doc} = yield call (addOrderCall, {
      token,
      product,
      quantity,
    });
    yield put (addOrderSuc ({message, order: doc}));
  } catch (err) {
    yield put (
      getOrdersFailedRequest ({
        orderErr: err,
      })
    );
  }
}

function* updateOrdersItemGenerator({payload: {orderId, quantity, token}}) {
  try {
    const {message} = yield call (editOrderCall, {
      orderId,
      quantity,
      token,
    });

    if (message === 'updated') {
      yield put (
        editOrderSuc ({
          orderId,
          quantity,
        })
      );
    }
  } catch (err) {
    yield put (getOrdersFailedRequest ({err}));
  }
}

function* delOrderGenerator({payload: {orderId, token}}) {
  try {
    const res = yield call (delOrderCall, {
      orderId,
      token,
    });

    if (res.message === 'deleted') {
      yield put (
        delOrderSuc ({
          orderId: res.orderId,
        })
      );
    }
  } catch (err) {
    yield put (getOrdersFailedRequest ({err}));
  }
}

// wacher functions
function* getOrdersWatcher () {
  yield takeLatest (Types.GET_ORDERS_RQ, getOrdersGenerator);
}

function* addOrderWatcher () {
  yield takeEvery (Types.ADD_ORDER_RQ, addOrderGenerator);
}

function* updateOrdersItemRequestWatcher () {
  yield takeLatest (Types.EDIT_ORDER_RQ, updateOrdersItemGenerator);
}

function* delOrderWatcher () {
  yield takeLatest (Types.DEL_ORDER_RQ, delOrderGenerator);
}
const orderSaga = [
  fork (getOrdersWatcher),
  fork (addOrderWatcher),
  fork (updateOrdersItemRequestWatcher),
  fork (delOrderWatcher),
];

export default orderSaga;
