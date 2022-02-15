import {combineReducers} from 'redux';
import productReducer from './product';
import userReducer from './user';
import orderReducer from './order';
import commentReducer from './comment';

export default combineReducers ({
  product: productReducer,
  user: userReducer,
  order: orderReducer,
  comment: commentReducer,
});
