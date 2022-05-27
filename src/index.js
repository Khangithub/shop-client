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
import MouseCtxProvider from "./context/mouse.context";
import SocketCtxProvider from "./context/socket.context";

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
    <SocketCtxProvider>
      <MouseCtxProvider>
        <UserCtxProvider>
          <App />
        </UserCtxProvider>
      </MouseCtxProvider>
    </SocketCtxProvider>
  </Provider>,
  document.getElementById("root")
);
