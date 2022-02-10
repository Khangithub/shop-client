import Cookies from 'universal-cookie';
import {call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getFailedUserRequest,
  Types,
} from '../actions/user';
import {
  getCurrentUserCall,
  loginWithEmailNPwdCall,
  loginWithGgCall,
  signupCall,
} from '../api/user';

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

function* signupGenerator({payload: {email, role, avatar, username}}) {
  try {
    const {token, currentUser} = yield call (signupCall, {
      email,
      role,
      avatar,
      username,
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

function* loginWithEmailNPwdWatcher () {
  yield takeEvery (Types.LOGIN_WITH_PWD_REQUEST, loginWithEmailNPwdGenerator);
}

function* loginWithGgWatcher () {
  yield takeEvery (Types.LOGIN_WITH_GG_REQUEST, loginWithGgGenerator);
}
function* signupWatcher () {
  yield takeEvery (Types.SIGNUP_REQUEST, signupGenerator);
}

const userSaga = [
  fork (getCurrentUserWatcher),
  fork (loginWithEmailNPwdWatcher),
  fork (loginWithGgWatcher),
  fork (signupWatcher),
];

export default userSaga;
