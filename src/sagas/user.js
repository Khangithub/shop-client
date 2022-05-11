import Cookies from "universal-cookie";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  chgUserAvtSuc,
  getCurUserSuc,
  getFailedUserReq,
  Types,
} from "../actions/user";
import {
  getCurrentUserCall,
  loginWithEmailNPwdCall,
  loginWithGgCall,
  signupCall,
  chgUserAvtCall,
} from "../api/user";

const cookies = new Cookies();
const token = cookies.get("token");

// generator functions
function* getCurrentUserGenerator() {
  try {
    const currentUser = yield call(getCurrentUserCall, {
      token,
    });

    yield put(
      getCurUserSuc({
        currentUser,
        token,
      })
    );
  } catch (err) {
    yield put(
      getFailedUserReq({
        userErr: err,
      })
    );
  }
}

function* loginWithEmailNPwdGenerator({ payload: { email, password } }) {
  try {
    const { token, currentUser } = yield call(loginWithEmailNPwdCall, {
      email,
      password,
    });
    cookies.set("token", token);
    yield put(
      getCurUserSuc({
        currentUser,
        token,
      })
    );
  } catch (err) {
    yield put(
      getFailedUserReq({
        userErr: err,
      })
    );
  }
}

function* loginWithGgGenerator() {
  try {
    const { token, currentUser } = yield call(loginWithGgCall);
    cookies.set("token", token);
    yield put(
      getCurUserSuc({
        currentUser,
        token,
      })
    );
  } catch (err) {
    yield put(
      getFailedUserReq({
        userErr: err,
      })
    );
  }
}

function* signupGenerator({ payload: { email, role, avatar, username } }) {
  try {
    const { token, currentUser } = yield call(signupCall, {
      email,
      role,
      avatar,
      username,
    });
    cookies.set("token", token);
    yield put(
      getCurUserSuc({
        currentUser,
        token,
      })
    );
  } catch (err) {
    yield put(
      getFailedUserReq({
        userErr: err,
      })
    );
  }
}

function* chgUserAvtGenerator({ payload: { file, token } }) {
  try {
    const { updated, filename } = yield call(chgUserAvtCall, { file, token });

    if (updated) {
      yield put(
        chgUserAvtSuc({
          file: filename,
        })
      );
    }
  } catch (err) {
    yield put(
      getFailedUserReq({
        userErr: err,
      })
    );
  }
}

// wacher functions
function* getCurrentUserWatcher() {
  yield takeLatest(Types.GET_CUR_USER_REQ, getCurrentUserGenerator);
}

function* loginWithEmailNPwdWatcher() {
  yield takeEvery(Types.LOGIN_WITH_PWD_REQ, loginWithEmailNPwdGenerator);
}

function* loginWithGgWatcher() {
  yield takeEvery(Types.LOGIN_WITH_GG_REQ, loginWithGgGenerator);
}
function* signupWatcher() {
  yield takeEvery(Types.SIGNUP_REQ, signupGenerator);
}
function* chgUserAvtWatcher() {
  yield takeEvery(Types.CHG_USER_AVT_REQ, chgUserAvtGenerator);
}
const userSaga = [
  fork(getCurrentUserWatcher),
  fork(loginWithEmailNPwdWatcher),
  fork(loginWithGgWatcher),
  fork(signupWatcher),
  fork(chgUserAvtWatcher),
];

export default userSaga;
