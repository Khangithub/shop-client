import Cookies from 'universal-cookie';
import {call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  changeAvatarSuccessAction,
  getCurrentUserSuccessAction,
  getFailedAuthAction,
  Types,
} from '../actions/auth';
import {
  getCurrentUserCall,
  loginWithEmailNPasswordApi,
  loginWithGgCall,
  signupCall,
  chgUserAvtCall,
} from '../apis/auth';

const cookies = new Cookies ();
const token = cookies.get ('token');

// generator functions
function* getCurrentUserGenerator () {
  try {
    const currentUser = yield call (getCurrentUserCall, {
      token,
    });

    yield put (
      getCurrentUserSuccessAction ({
        currentUser,
        token,
      })
    );
  } catch (err) {
    yield put (
      getFailedAuthAction ({
        authError: err,
      })
    );
  }
}

function* loginWithEmailNPasswordGenerator({
  payload: {email, password, history},
}) {
  try {
    const data = yield call (loginWithEmailNPasswordApi, {
      email,
      password,
    });

    if (data.hasOwnProperty ('currentUser') && data.hasOwnProperty ('token')) {
      cookies.set ('token', token);
      yield put (
        getCurrentUserSuccessAction ({
          currentUser: data.currentUser,
          token: data.token,
        })
      );
      history.goBack ();
    } else {
      throw data;
    }
  } catch (error) {
    yield put (
      getFailedAuthAction ({
        authError: error.message,
      })
    );
  }
}

function* loginWithGoogleGenerator({payload: {history}}) {
  try {
    const {token, currentUser} = yield call (loginWithGgCall);
    cookies.set ('token', token);
    yield put (
      getCurrentUserSuccessAction ({
        currentUser,
        token,
      })
    );
    history.goBack ();
  } catch (err) {
    yield put (
      getFailedAuthAction ({
        authError: err,
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
      getCurrentUserSuccessAction ({
        currentUser,
        token,
      })
    );
  } catch (err) {
    yield put (
      getFailedAuthAction ({
        authError: err,
      })
    );
  }
}

function* changeAvatarGenerator({payload: {file, token}}) {
  try {
    const {updated, filename} = yield call (chgUserAvtCall, {file, token});

    if (updated) {
      yield put (
        changeAvatarSuccessAction ({
          file: filename,
        })
      );
    }
  } catch (err) {
    yield put (
      getFailedAuthAction ({
        authError: err,
      })
    );
  }
}

// wacher functions
function* getCurrentUserWatcher () {
  yield takeLatest (Types.GET_CURRENT_USER, getCurrentUserGenerator);
}

function* loginWithEmailNPasswordWatcher () {
  yield takeEvery (
    Types.LOGIN_WITH_EMAIL_N_PASSWORD,
    loginWithEmailNPasswordGenerator
  );
}

function* loginWithGoogleWatcher () {
  yield takeEvery (Types.LOGIN_WITH_GOOGLE, loginWithGoogleGenerator);
}
function* signupWatcher () {
  yield takeEvery (Types.SIGNUP, signupGenerator);
}
function* changeAvatarWatcher () {
  yield takeEvery (Types.CHANGE_AVATAR, changeAvatarGenerator);
}
const userSaga = [
  fork (getCurrentUserWatcher),
  fork (loginWithEmailNPasswordWatcher),
  fork (loginWithGoogleWatcher),
  fork (signupWatcher),
  fork (changeAvatarWatcher),
];

export default userSaga;
