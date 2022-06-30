import {call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  createCommentSuccessAction,
  getFailedCommentAction,
  getCommentsSuccessAction,
  replyCommentSuccessAction,
  removeCommentSuccessAction,
  Types,
  editCommentSuccessAction,
  removeReplySuccessAction,
} from '../actions/comment';
import {
  addCmtCall,
  delCmtCall,
  delRepCall,
  editCmtCall,
  getProductCmtCall,
  repCmtCall,
} from '../apis/comment';

// generator functions
function* createCommentGenerator({payload: {productId, mainComment, media, token}}) {
  try {
    const {message, doc} = yield call (addCmtCall, {
      productId,
      mainComment,
      media,
      token,
    });

    if (message === 'updated') {
      yield put (
        createCommentSuccessAction ({
          newCmt: doc,
        })
      );
    }
  } catch (err) {
    yield put (
      getFailedCommentAction ({
        cmtErr: err,
      })
    );
  }
}

function* getCommentsOfProductGenerator({payload: {productId, batch, limit}}) {
  try {
    const cmtList = yield call (getProductCmtCall, {productId, batch, limit});
    yield put (
      getCommentsSuccessAction ({
        cmtList,
      })
    );
  } catch (err) {
    yield put (
      getFailedCommentAction ({
        cmtErr: err,
      })
    );
  }
}

function* replyCommentGenerator({
  payload: {commentId, receiver, content, media, token},
}) {
  try {
    const {doc} = yield call (repCmtCall, {
      commentId,
      receiver,
      content,
      media,
      token,
    });

    yield put (
      replyCommentSuccessAction ({
        commentId,
        newRep: doc,
      })
    );
  } catch (err) {
    yield put (getFailedCommentAction ({err}));
  }
}

function* removeCommentGenerator({payload: {commentId, token}}) {
  try {
    const res = yield call (delCmtCall, {
      commentId,
      token,
    });

    if (res.message === 'deleted') {
      yield put (
        removeCommentSuccessAction ({
          commentId: res.commentId,
        })
      );
    }
  } catch (err) {
    yield put (getFailedCommentAction ({err}));
  }
}

function* editCommentGenerator({
  payload: {commentId, mainComment, mediaList, token},
}) {
  try {
    const res = yield call (editCmtCall, {
      commentId,
      mainComment,
      mediaList,
      token,
    });
    if (res.message === 'edited') {
      yield put (
        editCommentSuccessAction ({
          commentId: commentId,
          mainComment: res.mainComment,
          mediaList: res.mediaList,
        })
      );
    }
  } catch (err) {
    yield put (getFailedCommentAction ({err}));
  }
}

function* removeReplyGenerator({payload: {commentId, repId, token}}) {
  try {
    const res = yield call (delRepCall, {
      commentId,
      repId,
      token,
    });

    if (res.message === 'deleted') {
      yield put (
        removeReplySuccessAction ({
          commentId: res.commentId,
          repId: res.repId
        })
      );
    }
  } catch (err) {
    yield put (getFailedCommentAction ({err}));
  }
}

// wacher functions
function* createCommentWatcher () {
  yield takeEvery (Types.CREATE_COMMENT, createCommentGenerator);
}

function* getCommentsOfProductWatcher () {
  yield takeLatest (Types.GET_COMMENTS_OF_PRODUCT, getCommentsOfProductGenerator);
}

function* replyCommentWatcher () {
  yield takeLatest (Types.REPLY_COMMENT, replyCommentGenerator);
}

function* removeCommentWatcher () {
  yield takeLatest (Types.REMOVE_COMMENT, removeCommentGenerator);
}

function* editCommentWatcher () {
  yield takeLatest (Types.EDIT_COMMENT, editCommentGenerator);
}

function* removeReplyWatcher () {
  yield takeLatest (Types.REMOVE_REPLY, removeReplyGenerator);
}

const commentSaga = [
  fork (createCommentWatcher),
  fork (getCommentsOfProductWatcher),
  fork (replyCommentWatcher),
  fork (editCommentWatcher),
  fork (removeCommentWatcher),
  fork (removeReplyWatcher),
];

export default commentSaga;
