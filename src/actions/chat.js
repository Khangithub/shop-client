const Types = {
  GET_CHAT_LIST_REQ: "chat/get_chat_list_req",
  GET_CHAT_LIST_SUC: "chat/get_chat_list_suc",
  UPDATE_CHAT_LIST: "chat/update_chat_list",
  FAILED_CHAT_REQ: "chat/failed_chat_req",
};

const getChatListReq = ({ token, roomId }) => ({
  type: Types.GET_CHAT_LIST_REQ,
  payload: {
    token,
    roomId,
  },
});

const updateChatList = ({ from, content, createdAt, type, mediaList }) => ({
  type: Types.UPDATE_CHAT_LIST,
  payload: {
    from,
    content,
    createdAt,
    type,
    mediaList,
  },
});

const getChatListSuc = ({ chatList }) => ({
  type: Types.GET_CHAT_LIST_SUC,
  payload: {
    chatList,
  },
});

const failedChatReq = ({ err }) => ({
  type: Types.FAILED_CHAT_REQ,
  payload: {
    err,
  },
});

export { getChatListReq, updateChatList, getChatListSuc, failedChatReq, Types };
