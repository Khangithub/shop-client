const getOrdersCall = async ({token}) => {
  try {
    if (!token) {
      throw new Error ('error token');
    }

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

const addOrderCall = async ({token, product, quantity}) => {
  try {
    if (!token) {
      throw new Error ('error token');
    }

    const addOrderReq = await fetch (process.env.REACT_APP_ORDERS, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify ({product, quantity}),
    });
    const addOrderJson = await addOrderReq.json ();
    return addOrderJson;
  } catch (err) {
    return err;
  }
};

const editOrderCall = async ({orderId, quantity, token}) => {
  try {
    if (!token) {
      throw new Error ('error token');
    }

    const cartReq = await fetch (
      process.env.REACT_APP_ORDERS_ITEM_IN_CART + orderId,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer '.concat (token),
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify ({quantity}),
      }
    );
    const cartJson = await cartReq.json ();
    return cartJson;
  } catch (err) {
    return err;
  }
};

const delOrderCall = async ({orderId, token}) => {
  try {
    if (!token) {
      throw new Error ('error token');
    }

    const delOrderReq = await fetch (process.env.REACT_APP_ORDERS + orderId, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
    });
    const delOrderJson = await delOrderReq.json ();
    return delOrderJson;
  } catch (err) {
    return err;
  }
};

export {getOrdersCall, addOrderCall, editOrderCall, delOrderCall};
