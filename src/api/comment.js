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
        // 'content-type': 'application/json; charset=UTF-8',
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

const uploadCmtMediaCall = async ({files, token}) => {
  try {
    const formData = new FormData ();
    for (let i = 0; i < files.length; i++) {
      formData.append ('cmt-media', files[i]);
    }

    const uploadCmtMediaReq = await fetch (process.env.REACT_APP_CMT_MEDIA, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '.concat (token),
      },
      body: formData,
    });

    const uploadCmtMediaJson = await uploadCmtMediaReq.json ();
    return uploadCmtMediaJson;
  } catch (err) {
    throw err;
  }
};

export {addCmtCall, getProductCmtCall, repCmtCall, uploadCmtMediaCall};
