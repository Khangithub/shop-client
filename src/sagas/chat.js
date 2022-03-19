import {call, fork, put, takeEvery} from 'redux-saga/effects';
import {failedChatReq, getChatListSuc, Types} from '../actions/chat';
import {getChatListCall} from '../api/chat';

// generator functions
function* getChatListGenerator({payload: {roomId, token}}) {
  try {
    const chatList = yield call (getChatListCall, {
      roomId,
      token,
    });
    yield put (
      getChatListSuc ({
        chatList,
      })
    );
  } catch (err) {
    yield put (
      failedChatReq ({
        chatErr: err,
      })
    );
  }
}

// wacher functions
function* getChatListWatcher () {
  yield takeEvery (Types.GET_CHAT_LIST_REQ, getChatListGenerator);
}

const chatSaga = [fork (getChatListWatcher)];

export default chatSaga;
