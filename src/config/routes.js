import React from 'react';
import Product from './pages/Product';
import Products from './pages/Products';
import ProductByCategory from './pages/ProductByCategory';
import Search from './pages/Search';
import YourProducts from './pages/YourProducts';
import YourBills from './pages/YourBills';

const routes = [
  {
    path: '/:productId',
    exact: false,
    main: ({props}) => <Product {...props} />,
  },
  {
    path: '/yourProducts',
    exact: true,
    main: () => <YourProducts />,
  },
  {
    path: '/yourBills',
    exact: true,
    main: () => <YourBills />,
  },
  {
    path: '/search/:index',
    exact: true,
    main: ({props}) => <Search {...props} />,
  },
  {
    path: '/productList/:category/:index', // tuyệt đối không được để route nào dưới route NotFound
    exact: false,
    main: ({match}) => <ProductByCategory match={match} />,
  },
  {
    path: '/productList/:index',
    exact: false,
    main: ({match}) => <Products match={match} />,
  }
];

export default routes;
