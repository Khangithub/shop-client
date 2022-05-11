import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import UserCtxProvider from "./context/user.context";

import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <UserCtxProvider>
      <App />
    </UserCtxProvider>
  </Provider>,
  document.getElementById("root")
);
