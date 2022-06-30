import { call, fork, put, takeEvery } from "redux-saga/effects";
import { getFailedMessagesAction, getMessagesSuccessAction, getChatSuccessAction, Types } from "../actions/chat";
import { getChatsCall, getMsgListCall } from "../apis/chat";

// generator functions
function* getMsgsGenerator({ payload: { roomId, token } }) {
  try {
    const msgs = yield call(getMsgListCall, {
      roomId,
      token,
    });
    yield put(
      getMessagesSuccessAction({
        msgs,
      })
    );
  } catch (err) {
    yield put(
      getFailedMessagesAction({
        chatErr: err,
      })
    );
  }
}

function* getChatsGenerator({ payload: { userId, token } }) {
  try {
    const chats = yield call(getChatsCall, {
      userId,
      token,
    });
    yield put(getChatSuccessAction({ chats }));
  } catch (err) {
    yield put(
      getFailedMessagesAction({
        chatErr: err,
      })
    );
  }
}

// wacher functions
function* getMessagesWatcher() {
  yield takeEvery(Types.GET_MESSAGES, getMsgsGenerator);
}

function* getChatsWatcher() {
  yield takeEvery(Types.GET_CHATS, getChatsGenerator);
}

const chatSaga = [fork(getMessagesWatcher), fork(getChatsWatcher)];

export default chatSaga;
