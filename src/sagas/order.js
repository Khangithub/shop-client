import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import { createOrderSuccessAction, editOrderSuccessAction, getFailedOrderAction, getOrdersSuccessAction, removeOrderSuccessAction, Types } from '../actions/order';
import {
  delOrderCall,
  getOrdersCall,
  editOrderCall,
  addOrderCall,
} from '../apis/order';

function* getOrdersGenerator({payload: {token}}) {
  try {
    const orders = yield call (getOrdersCall, {
      token,
    });

    yield put (
      getOrdersSuccessAction ({
        orders,
      })
    );
  } catch (err) {
    yield put (
      getFailedOrderAction ({
        orderErr: err,
      })
    );
  }
}

function* createOrderGenerator({payload: {token, product, quantity}}) {
  try {
    const {message, doc} = yield call (addOrderCall, {
      token,
      product,
      quantity,
    });
    yield put (createOrderSuccessAction ({message, order: doc}));
  } catch (err) {
    yield put (
      getFailedOrderAction ({
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
        editOrderSuccessAction ({
          orderId,
          quantity,
        })
      );
    }
  } catch (err) {
    yield put (getFailedOrderAction ({err}));
  }
}

function* removeOrderGenerator({payload: {orderId, token}}) {
  try {
    const res = yield call (delOrderCall, {
      orderId,
      token,
    });

    if (res.message === 'deleted') {
      yield put (
        removeOrderSuccessAction ({
          orderId: res.orderId,
        })
      );
    }
  } catch (err) {
    yield put (getFailedOrderAction ({err}));
  }
}

// wacher functions
function* getOrdersWatcher () {
  yield takeLatest (Types.GET_ORDERS, getOrdersGenerator);
}

function* createOrderWatcher () {
  yield takeEvery (Types.CREATE_ORDER, createOrderGenerator);
}

function* updateOrdersItemRequestWatcher () {
  yield takeLatest (Types.EDIT_ORDER, updateOrdersItemGenerator);
}

function* removeOrderWatcheer () {
  yield takeLatest (Types.REMOVE_ORDER, removeOrderGenerator);
}
const orderSaga = [
  fork (getOrdersWatcher),
  fork (createOrderWatcher),
  fork (updateOrdersItemRequestWatcher),
  fork (removeOrderWatcheer),
];

export default orderSaga;
