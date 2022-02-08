import Cookies from 'universal-cookie';
import _ from 'lodash';
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
  console.log ('user saga');
  try {
    if (_.isEmpty (token)) {
      console.log ('empty token');
      yield put (
        getCurrentUserSuccess ({
          currentUser: {},
        })
      );
    }

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
