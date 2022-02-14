import {call, fork, put, takeEvery} from 'redux-saga/effects';
import {failedCmtReq, Types} from '../actions/comment';
import {addCmtCall} from '../api/comment';

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

// wacher functions
function* addCmtWatcher () {
  yield takeEvery (Types.ADD_CMT_REQ, addCmtGenerator);
}

const commentSaga = [fork (addCmtWatcher)];

export default commentSaga;
