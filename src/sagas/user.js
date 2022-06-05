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
  lgPwdCall,
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
    } else {
      let { currentUser, token, refToken } = curUserData;
      cookies.set("token", token);
      cookies.set("refToken", refToken);

      yield put(
        getCurUserSc({
          currentUser,
          token,
          refToken,
        })
      );
    }
  } catch (err) {
    /**
     * if expired token or invalid signature -> update new current user, token and refresh token
     */
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
        } else {
          let { currentUser, token, refToken } = curUserData;
          cookies.set("token", token);
          cookies.set("refToken", refToken);
          yield put(
            getCurUserSc({
              currentUser,
              token,
              refToken,
            })
          );

          return;
        }
      }
    }

    /**
     * if token not exist
     * if refresher token exist -> update new current user, token, refresher token
     * else -> not update
     */
    if (err.message.includes(errMsg.TOKEN_NOT_FOUND)) {
      if (refToken) {
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
          } else {
            let { currentUser, token, refToken } = curUserData;
            cookies.set("token", token);
            cookies.set("refToken", refToken);

            yield put(
              getCurUserSc({
                currentUser,
                token,
                refToken,
              })
            );
          }
        }
      } else {
        yield put(
          getCurUserSc({
            currentUser: undefined,
            token: "",
            refToken: "",
          })
        );
      }

      return;
    }

    /**
     * update error when api crashes
     */
    yield put(
      getFailUserRq({
        userErr: err.message,
      })
    );
  }
}

function* lgPwdGen({ payload: { email, password } }) {
  try {
    const lgPwdData = yield call(lgPwdCall, {
      email,
      password,
    });

    if (lgPwdData instanceof Error) {
      throw Error(lgPwdData);
    } else {
      let { currentUser, token, refToken } = lgPwdData;
      cookies.set("token", token);
      cookies.set("refToken", refToken);
      yield put(
        getCurUserSc({
          currentUser,
          token,
          refToken,
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
    } else {
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
    }
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
    const signUpData = yield call(signupCall);
   
    if (signUpData instanceof Error) {
      throw Error(signUpData);
    } else {
      let { token, refToken, currentUser } = signUpData;
      cookies.set("token", token);
      cookies.set("refToken", refToken);

      yield put(
        getCurUserSc({
          currentUser,
          token,
          refToken,
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

function* lgPwdWatch() {
  yield takeEvery(Types.LG_PWD_RQ, lgPwdGen);
}

function* lgGgWatch() {
  yield takeEvery(Types.LG_GG_RQ, lgGgGen);
}
function* signupWatch() {
  yield takeEvery(Types.SIGNUP_RQ, signupGen);
}
function* chgAvtWatch() {
  yield takeEvery(Types.CHG_AVT_RQ, chgAvtGen);
}
const userSaga = [
  fork(getCurUserWatch),
  fork(lgPwdWatch),
  fork(lgGgWatch),
  fork(signupWatch),
  fork(chgAvtWatch),
];

export default userSaga;
