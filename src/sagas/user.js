import Cookies from 'universal-cookie';
import {call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getFailedUserRequest,
  Types,
} from '../actions/user';
import {getCurrentUserCall, loginWithEmailNPwdCall} from '../api/user';

const cookies = new Cookies ();
const token = cookies.get ('token');

// generator functions
function* getCurrentUserGenerator () {
  try {
    const currentUser = yield call (getCurrentUserCall, {
      token,
    });

    yield put (
      getCurrentUserSuccess ({
        currentUser,
      })
    );
  } catch (err) {
    yield put (
      getFailedUserRequest ({
        err,
      })
    );
  }
}

function* loginWithPwdGenerator({payload: {email, password}}) {
  try {
    const {token, currentUser} = yield call (loginWithEmailNPwdCall, {
      email,
      password,
    });
    cookies.set ('token', token);
    yield put (
      getCurrentUserSuccess ({
        currentUser,
      })
    );
  } catch (err) {
    yield put (
      getFailedUserRequest ({
        err,
      })
    );
  }
}

// wacher functions
function* getCurrentUserWatcher () {
  yield takeLatest (Types.GET_CURRENT_USER_REQUEST, getCurrentUserGenerator);
}

function* loginWithPwdWatcher () {
  yield takeEvery (Types.LOGIN_WITH_PWD_REQUEST, loginWithPwdGenerator);
}

const userSaga = [fork (getCurrentUserWatcher), fork (loginWithPwdWatcher)];

export default userSaga;
