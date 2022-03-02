const Types = {
  ADD_CMT_REQ: 'cmt/add_cmt_req',
  ADD_CMT_SUC: 'cmt/add_cmt_suc',
  GET_CMT_LIST_REQ: 'cmt/get_cmt_list_req',
  GET_CMT_LIST_SUC: 'cmt/get_cmt_list_suc',
  REP_CMT_REQ: 'cmt/rep_cmt_req',
  REP_CMT_SUC: 'cmt/rep_cmt_suc',
  DEL_CMT_REQ: 'cmt/del_cmt_req',
  DEL_CMT_SUC: 'cmt/del_cmt_suc',
  EDIT_CMT_REQ: 'cmt/edit_cmt_req',
  EDIT_CMT_SUC: 'cmt/edit_cmt_suc',
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

const repCmtReq = ({commentId, media, content, receiver, token}) => ({
  type: Types.REP_CMT_REQ,
  payload: {
    commentId,
    media,
    content,
    receiver,
    token,
  },
});

const delCmtReq = ({commentId, token}) => ({
  type: Types.DEL_CMT_REQ,
  payload: {
    commentId,
    token,
  },
});

const editCmtReq = ({commentId, mainComment, mediaList, token}) => ({
  type: Types.EDIT_CMT_REQ,
  payload: {
    commentId,
    mainComment,
    mediaList,
    token
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

const delCmtSuc = ({commentId}) => ({
  type: Types.DEL_CMT_SUC,
  payload: {commentId},
});

const editCmtSuc = ({mediaList, mainComment, commentId}) => ({
  type: Types.EDIT_CMT_SUC,
  payload: {
    mediaList,
    mainComment,
    commentId
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
  delCmtReq,
  editCmtReq,
  repCmtSuc,
  getCmtListSuc,
  addCmtSuc,
  delCmtSuc,
  editCmtSuc,
  failedCmtReq,
  Types,
};
