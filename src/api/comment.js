const addCmtCall = async ({productId, mainComment, token}) => {
  try {
    const addCmtReq = await fetch (process.env.REACT_APP_MAIN_CMT, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify ({mainComment, product: productId}),
    });
    const addCmtJson = await addCmtReq.json ();

    return addCmtJson;
  } catch (err) {
    return err;
  }
};

const getProductCmtCall = async ({productId, batch, limit}) => {
  try {
    const productCmtListReq = await fetch (
      process.env.REACT_APP_CMT_FR_PRODUCT +
        productId +
        '/' +
        batch +
        '/' +
        limit
    );
    const productCmtListJson = await productCmtListReq.json ();
    return productCmtListJson.cmtList;
  } catch (err) {
    return err;
  }
};

export {addCmtCall, getProductCmtCall};