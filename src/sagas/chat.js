import { call, fork, put, takeEvery } from "redux-saga/effects";
import { failedMsgRq, getMsgsSc, getChatsSc, Types } from "../actions/chat";
import { getChatsCall, getMsgListCall } from "../api/chat";

// generator functions
function* getMsgsGenerator({ payload: { roomId, token } }) {
  try {
    const msgs = yield call(getMsgListCall, {
      roomId,
      token,
    });
    yield put(
      getMsgsSc({
        msgs,
      })
    );
  } catch (err) {
    yield put(
      failedMsgRq({
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
    yield put(getChatsSc({ chats }));
  } catch (err) {
    yield put(
      failedMsgRq({
        chatErr: err,
      })
    );
  }
}

// wacher functions
function* getMsgsWatcher() {
  yield takeEvery(Types.GET_MSGS_RQ, getMsgsGenerator);
}

function* getChatsWatcher() {
  yield takeEvery(Types.GET_CHATS_RQ, getChatsGenerator);
}

const chatSaga = [fork(getMsgsWatcher), fork(getChatsWatcher)];

export default chatSaga;
