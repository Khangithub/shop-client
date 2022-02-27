const addCmtCall = async ({productId, mainComment, media, token}) => {
  try {
    const formData = new FormData ();
    for (let i = 0; i < media.length; i++) {
      formData.append ('cmt-media', media[i]);
    }

    formData.append ('mainComment', mainComment);
    formData.append ('product', productId);

    const addCmtReq = await fetch (process.env.REACT_APP_CMT, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '.concat (token),
      },
      body: formData,
    });
    const addCmtJson = await addCmtReq.json ();

    return addCmtJson;
  } catch (err) {
    throw err;
  }
};

const getProductCmtCall = async ({productId, batch, limit}) => {
  try {
    const productCmtListReq = await fetch (
      process.env.REACT_APP_PRODUCT_CMT +
        productId +
        '/' +
        batch +
        '/' +
        limit
    );
    const productCmtListJson = await productCmtListReq.json ();
    return productCmtListJson.cmtList;
  } catch (err) {
    throw err;
  }
};

const repCmtCall = async ({commentId, sender, receiver, content, token}) => {
  try {
    const repCmtReq = await fetch (process.env.REACT_APP_REP_CMT + commentId, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify ({sender, receiver, content}),
    });
    const repCmtJson = await repCmtReq.json ();

    return repCmtJson;
  } catch (err) {
    throw err;
  }
};

const delCmtCall = async ({commentId, token}) => {
  try {
    const delCmtReq = await fetch (process.env.REACT_APP_CMT + commentId, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer '.concat (token),
        'content-type': 'application/json; charset=UTF-8',
      },
    });
    const delCmtJson = await delCmtReq.json ();
    return delCmtJson;
  } catch (err) {
    throw err;
  }
};

const editCmtCall = async ({commentId, mainComment, mediaList, token}) => {
  try {
    const formData = new FormData ();
    for (let i = 0; i < mediaList.length; i++) {
      formData.append ('edit-cmt-media', mediaList[i]);
    }

    formData.append ('mainComment', mainComment);

    const editCmtReq = await fetch (process.env.REACT_APP_CMT + commentId, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer '.concat (token),
      },
      body: formData
    });
    const editCmtJson = await editCmtReq.json ();
    return editCmtJson;
  } catch (err) {
    throw err;
  }
};

export {addCmtCall, getProductCmtCall, repCmtCall, editCmtCall, delCmtCall};
