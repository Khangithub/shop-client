import { call, fork, put, takeEvery } from "redux-saga/effects";
import { failedMsgReq, getMsgListSuc, Types } from "../actions/chat";
import { getMsgListCall } from "../api/chat";

// generator functions
function* getChatListGenerator({ payload: { roomId, token } }) {
  try {
    const msgList = yield call(getMsgListCall, {
      roomId,
      token,
    });
    yield put(
      getMsgListSuc({
        msgList,
      })
    );
  } catch (err) {
    yield put(
      failedMsgReq({
        chatErr: err,
      })
    );
  }
}

// wacher functions
function* getChatListWatcher() {
  yield takeEvery(Types.GET_MSG_LIST_REQ, getChatListGenerator);
}

const chatSaga = [fork(getChatListWatcher)];

export default chatSaga;
