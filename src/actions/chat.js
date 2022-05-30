const Types = {
  GET_MSG_LIST_REQ: "chat/get_msg_list_req",
  GET_MSG_LIST_SUC: "chat/get_msg_list_suc",
  UPDATE_MSG_LIST: "chat/update_msg_list",
  FAILED_MSG_REQ: "chat/failed_msg_req",
};

const getMsgListReq = ({ token, roomId }) => ({
  type: Types.GET_MSG_LIST_REQ,
  payload: {
    token,
    roomId,
  },
});

const updateMsgList = ({ from, content, createdAt, type, mediaList }) => ({
  type: Types.UPDATE_MSG_LIST,
  payload: {
    from,
    content,
    createdAt,
    type,
    mediaList,
  },
});

const getMsgListSuc = ({ msgList }) => ({
  type: Types.GET_MSG_LIST_SUC,
  payload: {
    msgList,
  },
});

const failedMsgReq = ({ err }) => ({
  type: Types.FAILED_MSG_REQ,
  payload: {
    err,
  },
});

export { getMsgListReq, updateMsgList, getMsgListSuc, failedMsgReq, Types };
