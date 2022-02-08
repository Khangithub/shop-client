import {all} from 'redux-saga/effects';
import ProductSaga from './product';
import UserSaga from './user';

export default function* rootSaga () {
  yield all ([...ProductSaga, ...UserSaga]);
}
