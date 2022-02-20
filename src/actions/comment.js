const Types = {
  ADD_CMT_REQ: 'cmt/add_cmt_req',
  ADD_CMT_SUC: 'cmt/add_cmt_suc',
  GET_CMT_LIST_REQ: 'cmt/get_cmt_list_req',
  GET_CMT_LIST_SUC: 'cmt/get_cmt_list_suc',
  REP_CMT_REQ: 'cmt/rep_cmt_req',
  REP_CMT_SUC: 'cmt/rep_cmt_suc',
  UPLOAD_CMT_MEDIA_REQ: 'cmt/upload_cmt_media_req',
  UPLOAD_CMT_MEDIA_SUC: 'cmt/upload_cmt_media_suc',
  GET_CMT_LIST_FR_PRODUCT_REQ: 'cmt/get_cmt_list_fr_product_req',
  FAILED_CMT_REQ: 'cmt/failed_cmt_req',
};

const addCmtReq = ({productId, mainComment, media, token}) => ({
  type: Types.ADD_CMT_REQ,
  payload: {
    productId,
    mainComment,
    media,
    token,
  },
});

const getCmtListReq = ({cmtList}) => ({
  type: Types.GET_CMT_LIST_REQ,
  payload: {
    cmtList,
  },
});

const getCmtListFromProductReq = ({productId, batch, limit}) => ({
  type: Types.GET_CMT_LIST_FR_PRODUCT_REQ,
  payload: {
    productId,
    batch,
    limit,
  },
});

const repCmtReq = ({commentId, sender, content, receiver, token}) => ({
  type: Types.REP_CMT_REQ,
  payload: {
    commentId,
    sender,
    content,
    receiver,
    token,
  },
});

const uploadCmtMediaReq = ({files, token}) => ({
  type: Types.UPLOAD_CMT_MEDIA_REQ,
  payload: {
    files,
    token,
  },
});

const addCmtSuc = ({newCmt}) => ({
  type: Types.ADD_CMT_SUC,
  payload: {
    newCmt,
  },
});

const getCmtListSuc = ({cmtList}) => ({
  type: Types.GET_CMT_LIST_SUC,
  payload: {
    cmtList,
  },
});

const repCmtSuc = ({newRep, commentId}) => ({
  type: Types.REP_CMT_SUC,
  payload: {
    newRep,
    commentId,
  },
});

const uploadCmtMediaSuc = ({fileNames}) => ({
  type: Types.UPLOAD_CMT_MEDIA_SUC,
  payload: {
    fileNames,
  },
});

const failedCmtReq = ({err}) => ({
  type: Types.FAILED_CMT_REQ,
  payload: {
    err,
  },
});

export {
  addCmtReq,
  getCmtListReq,
  repCmtReq,
  getCmtListFromProductReq,
  uploadCmtMediaReq,
  repCmtSuc,
  getCmtListSuc,
  addCmtSuc,
  uploadCmtMediaSuc,
  failedCmtReq,
  Types,
};
