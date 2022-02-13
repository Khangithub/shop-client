import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getOrdersFailedRequest,
  getOrdersSuccess,
  Types,
  updateOrdersItemSuccess,
} from '../actions/order';
import {getOrdersCall, updateOrdersItemCall} from '../api/order';

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

function* updateOrdersItemGenerator({payload: {orderId, quantity, token}}) {
  try {
    const {message} = yield call (updateOrdersItemCall, {
      orderId,
      quantity,
      token,
    });

    if (message === 'updated') {
      yield put (
        updateOrdersItemSuccess ({
          orderId,
          quantity,
        })
      );
    }
  } catch (err) {
    yield put (getOrdersFailedRequest ({err}));
  }
}

// wacher functions
function* getOrdersWatcher () {
  yield takeLatest (Types.GET_ORDERS_REQUEST, getOrdersGenerator);
}

function* updateOrdersItemRequestWatcher () {
  yield takeLatest (
    Types.UPDATE_ORDERS_ITEM_QUANTITY_REQUEST,
    updateOrdersItemGenerator
  );
}
const orderSaga = [
  fork (getOrdersWatcher),
  fork (updateOrdersItemRequestWatcher),
];

export default orderSaga;
