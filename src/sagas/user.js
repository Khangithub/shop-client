import Cookies from 'universal-cookie';
import {call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getFailedUserRequest,
  Types,
} from '../actions/user';
import {getCurrentUserCall, loginWithEmailNPwdCall, loginWithGgCall} from '../api/user';

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

function* loginWithEmailNPwdGenerator({payload: {email, password}}) {
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

function* loginWithGgGenerator () {
  try {
    const {token, currentUser} = yield call (loginWithGgCall);
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

function* loginWithEmailNPwdWatcher () {
  yield takeEvery (Types.LOGIN_WITH_PWD_REQUEST, loginWithEmailNPwdGenerator);
}

function* loginWithGgWatcher () {
  yield takeEvery (Types.LOGIN_WITH_GG_REQUEST, loginWithGgGenerator);
}

const userSaga = [
  fork (getCurrentUserWatcher),
  fork (loginWithEmailNPwdWatcher),
  fork (loginWithGgWatcher),
];

export default userSaga;
