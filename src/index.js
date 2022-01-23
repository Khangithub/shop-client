import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductContextProvider
  from './ContextProvider/ProductListContextProvider';
import OrderContextProvider from './ContextProvider/OrderContextProvider';
import BillContextProvider from './ContextProvider/BillContextProvider';
import CurrentUserContextProvider
  from './ContextProvider/CurrentUserContextProvider';

ReactDOM.render (
  <CurrentUserContextProvider>
    <OrderContextProvider>
      <ProductContextProvider>
        <BillContextProvider>
          <App />
        </BillContextProvider>
      </ProductContextProvider>
    </OrderContextProvider>
  </CurrentUserContextProvider>,
  document.getElementById ('root')
);
