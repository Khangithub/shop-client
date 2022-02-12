import {isEmpty} from 'lodash';

const getOrdersCall = async ({token}) => {
  if (isEmpty (token)) {
    throw new Error ('token empty');
  }
  
  try {
    const cartResponse = await fetch (process.env.REACT_APP_ORDERS_OF_USER, {
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
    });
    const cartJson = await cartResponse.json ();
    return cartJson.docs;
  } catch (err) {
    return err;
  }
};

export {getOrdersCall};
