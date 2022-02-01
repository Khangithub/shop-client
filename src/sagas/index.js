import ProductSaga from './product';
import {all} from 'redux-saga/effects';

export default function* rootSaga () {
  yield all ([...ProductSaga]);
}
