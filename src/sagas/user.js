import Cookies from "universal-cookie";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  chgUserAvtSc,
  getCurUserSc,
  getFailUserRq,
  Types,
} from "../actions/user";
import {
  getCurUserCall,
  lgEmailNPwdCall,
  lgGgCall,
  signupCall,
  chgAvtCall,
  getNewTokensCall,
} from "../api/user";
import errMsg from "../config/errMsg.json";

const cookies = new Cookies();
const token = cookies.get("token");
const refToken = cookies.get("refToken");

// generator functions
function* getCurUserGen() {
  try {
    const curUserData = yield call(getCurUserCall, {
      token,
    });

    if (curUserData instanceof Error) {
      throw Error(curUserData);
    }

    yield put(
      getCurUserSc({
        currentUser: curUserData,
        token,
      })
    );
  } catch (err) {
    if (
      (err.message.includes(errMsg.TOKEN_EXPIRED_ERROR) &&
        err.message.includes(errMsg.JWT_EXPIRED)) ||
      (err.message.includes(errMsg.JSON_WEB_TOKEN_ERROR) &&
        err.message.includes(errMsg.INVALID_SIGNATURE))
    ) {
      const tokensData = yield call(getNewTokensCall, {
        refToken,
      });

      if (tokensData instanceof Error) {
        yield put(
          getFailUserRq({
            userErr: tokensData,
          })
        );
      } else {
        let { newToken, newRefToken } = tokensData;
        cookies.set("token", newToken);
        cookies.set("refToken", newRefToken);

        const curUserData = yield call(getCurUserCall, {
          token: newToken,
        });

        if (curUserData instanceof Error) {
          throw Error(curUserData);
        }

        yield put(
          getCurUserSc({
            currentUser: curUserData,
            token: newToken,
            refToken: newRefToken,
          })
        );

        return;
      }
    }

    if (err.message.includes(errMsg.TOKEN_NOT_FOUND)) {
      yield put(
        getCurUserSc({
          currentUser: undefined,
          token: "",
          refToken: "",
        })
      );

      return;
    }

    yield put(
      getFailUserRq({
        userErr: err.message,
      })
    );
  }
}

function* lgEmailNPwdGen({ payload: { email, password } }) {
  try {
    const { token, currentUser } = yield call(lgEmailNPwdCall, {
      email,
      password,
    });

    if (!!token && !!currentUser) {
      cookies.set("token", token);
      yield put(
        getCurUserSc({
          currentUser,
          token,
        })
      );
    }
  } catch (err) {
    yield put(
      getFailUserRq({
        userErr: err,
      })
    );
  }
}

function* lgGgGen() {
  try {
    const lgGgData = yield call(lgGgCall);

    if (lgGgData instanceof Error) {
      throw Error(lgGgData);
    }

    let { token, refToken, currentUser } = lgGgData;
    cookies.set("token", token);
    cookies.set("refToken", refToken);

    yield put(
      getCurUserSc({
        currentUser,
        token,
        refToken,
      })
    );
  } catch (err) {
    yield put(
      getFailUserRq({
        userErr: err,
      })
    );
  }
}

function* signupGen() {
  try {
    const { token, currentUser } = yield call(signupCall);
    cookies.set("token", token);
    yield put(
      getCurUserSc({
        currentUser,
        token,
      })
    );
  } catch (err) {
    yield put(
      getFailUserRq({
        userErr: err,
      })
    );
  }
}

function* chgAvtGen({ payload: { file, token } }) {
  try {
    const { updated, filename } = yield call(chgAvtCall, { file, token });

    if (updated) {
      yield put(
        chgUserAvtSc({
          file: filename,
        })
      );
    }
  } catch (err) {
    yield put(
      getFailUserRq({
        userErr: err,
      })
    );
  }
}

// wacher functions
function* getCurUserWatch() {
  yield takeLatest(Types.GET_CUR_USER_RQ, getCurUserGen);
}

function* lgEmailNPwdWatch() {
  yield takeEvery(Types.LG_WITH_PWD_RQ, lgEmailNPwdGen);
}

function* lgGgWatch() {
  yield takeEvery(Types.LG_WITH_GG_RQ, lgGgGen);
}
function* signupWatch() {
  yield takeEvery(Types.SIGNUP_RQ, signupGen);
}
function* chgAvtWatch() {
  yield takeEvery(Types.CHG_USER_AVT_RQ, chgAvtGen);
}
const userSaga = [
  fork(getCurUserWatch),
  fork(lgEmailNPwdWatch),
  fork(lgGgWatch),
  fork(signupWatch),
  fork(chgAvtWatch),
];

export default userSaga;
