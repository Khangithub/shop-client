import {call, fork, put, takeEvery} from 'redux-saga/effects';
import {
  failedChatReq,
  getChatListSuc,
  getConversationSuc,
  Types,
} from '../actions/chat';
import {getChatListCall, getConversationListCall} from '../api/chat';

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

function* getConversationListGenerator({payload: {fromId, token}}) {
  try {
    const conversations = yield call (getConversationListCall, {
      fromId,
      token,
    });
    yield put (
      getConversationSuc ({
        conversations,
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

function* getConversationListWatcher () {
  yield takeEvery (Types.GET_CONVERSATION_REQ, getConversationListGenerator);
}

const chatSaga = [fork (getChatListWatcher), fork (getConversationListWatcher)];

export default chatSaga;
