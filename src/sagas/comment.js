import {call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  addCmtSuc,
  delCmtSuc,
  failedCmtReq,
  getCmtListSuc,
  repCmtSuc,
  Types,
} from '../actions/comment';
import {
  addCmtCall,
  delCmtCall,
  getProductCmtCall,
  repCmtCall,
} from '../api/comment';

// generator functions
function* addCmtGenerator({payload: {productId, mainComment, media, token}}) {
  try {
    const {message, doc} = yield call (addCmtCall, {
      productId,
      mainComment,
      media,
      token,
    });

    if (message === 'updated') {
      yield put (
        addCmtSuc ({
          newCmt: doc,
        })
      );
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

function* replyCmtGenerator({
  payload: {commentId, receiver, content, sender, token},
}) {
  try {
    const {doc} = yield call (repCmtCall, {
      commentId,
      receiver,
      content,
      sender,
      token,
    });

    yield put (
      repCmtSuc ({
        commentId,
        newRep: doc,
      })
    );
  } catch (err) {
    yield put (failedCmtReq ({err}));
  }
}

function* delCmtGenerator({payload: {commentId, token}}) {
  try {
    const res = yield call (delCmtCall, {
      commentId,
      token,
    });

    if (res.message === 'deleted') {
      yield put (
        delCmtSuc ({
          commentId: res.commentId,
        })
      );
    }
  } catch (err) {
    yield put (failedCmtReq ({err}));
  }
}

// wacher functions
function* addCmtWatcher () {
  yield takeEvery (Types.ADD_CMT_REQ, addCmtGenerator);
}

function* getProductCmtWatcher () {
  yield takeLatest (Types.GET_CMT_LIST_FR_PRODUCT_REQ, getProductCmtGenerator);
}

function* replyCmtWatcher () {
  yield takeLatest (Types.REP_CMT_REQ, replyCmtGenerator);
}

function* delCmtWatcher () {
  yield takeLatest (Types.DEL_CMT_REQ, delCmtGenerator);
}

const commentSaga = [
  fork (addCmtWatcher),
  fork (getProductCmtWatcher),
  fork (replyCmtWatcher),
  fork (delCmtWatcher),
];

export default commentSaga;
