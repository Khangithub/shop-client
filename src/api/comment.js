const addCmtCall = async ({productId, mainComment, token}) => {
  try {
    const addCmtReq = await fetch (process.env.REACT_APP_MAIN_COMMENT, {
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

export {addCmtCall};
