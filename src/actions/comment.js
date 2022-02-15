const Types = {
  ADD_CMT_REQ: 'cmt/add_cmt_req',
  GET_CMT_LIST_REQ: 'cmt/get_cmt_list_req',
  GET_CMT_LIST_SUC: 'cmt/get_cmt_list_suc',
  GET_CMT_LIST_FR_PRODUCT_REQ: 'cmt/get_cmt_list_fr_product_req',
  FAILED_CMT_REQ: 'cmt/failed_cmt_req',
};

const addCmtReq = ({productId, mainComment, token}) => ({
  type: Types.ADD_CMT_REQ,
  payload: {
    productId,
    mainComment,
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

const getCmtListSuc = ({cmtList}) => ({
  type: Types.GET_CMT_LIST_SUC,
  payload: {
    cmtList,
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
  getCmtListSuc,
  failedCmtReq,
  getCmtListFromProductReq,
  Types,
};
