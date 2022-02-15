import {call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {failedCmtReq, getCmtListSuc, Types} from '../actions/comment';
import {addCmtCall, getProductCmtCall} from '../api/comment';

// generator functions
function* addCmtGenerator({payload: {productId, mainComment, token}}) {
  try {
    const {message} = yield call (addCmtCall, {
      productId,
      mainComment,
      token,
    });

    if (message === 'updated') {
      console.log ('done');
    }
  } catch (err) {
    yield put (
      failedCmtReq ({
        cmtErr: err,
      })
    );
  }
}

function* getProductCmtGenerator({payload: {productId, batch, limit}}) {
  try {
    const cmtList = yield call (getProductCmtCall, {productId, batch, limit});
    yield put (
      getCmtListSuc ({
        cmtList,
      })
    );
  } catch (err) {
    yield put (
      failedCmtReq ({
        cmtErr: err,
      })
    );
  }
}

// wacher functions
function* addCmtWatcher () {
  yield takeEvery (Types.ADD_CMT_REQ, addCmtGenerator);
}

function* getProductCmtWatcher () {
  yield takeLatest (Types.GET_CMT_LIST_FR_PRODUCT_REQ, getProductCmtGenerator);
}

const commentSaga = [fork (addCmtWatcher), fork (getProductCmtWatcher)];

export default commentSaga;
