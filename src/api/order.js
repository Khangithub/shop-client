import {isEmpty} from 'lodash';

const getOrdersCall = async ({token}) => {
  if (isEmpty (token)) {
    throw new Error ('token empty');
  }
  
  try {
    const cartReq = await fetch (process.env.REACT_APP_ORDERS_OF_USER, {
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
    });
    const cartJson = await cartReq.json ();
    return cartJson.docs;
  } catch (err) {
    return err;
  }
};

const updateOrdersItemCall = async ({orderId, quantity, token}) => {
  if (isEmpty (token)) {
    throw new Error ('token empty');
  }
  
  try {
    const cartReq = await fetch (process.env.REACT_APP_ORDERS_ITEM_IN_CART + orderId, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({quantity})
    });
    const cartJson = await cartReq.json ();
    return cartJson;
  } catch (err) {
    return err;
  }
};

export {getOrdersCall, updateOrdersItemCall};
