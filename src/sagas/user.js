import Cookies from 'universal-cookie';
import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getFailedUserRequest,
  Types,
} from '../actions/user';
import {getCurrentUserCall} from '../api/user';

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

// wacher functions
function* getCurrentUserWatcher () {
  yield takeLatest (Types.GET_CURRENT_USER_REQUEST, getCurrentUserGenerator);
}

const userSaga = [fork (getCurrentUserWatcher)];

export default userSaga;
