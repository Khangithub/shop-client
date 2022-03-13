import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import {composeWithDevTools} from 'redux-devtools-extension';

import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware ();
const store = createStore (
  reducers,
  composeWithDevTools (applyMiddleware (sagaMiddleware))
);

sagaMiddleware.run (rootSaga);

ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('root')
);
