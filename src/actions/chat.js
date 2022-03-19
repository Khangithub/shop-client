const Types = {
  GET_CHAT_LIST_REQ: 'chat/get_chat_list_req',
  GET_CHAT_LIST_SUC: 'chat/get_chat_list_suc',
  FAILED_CHAT_REQ: 'chat/failed_chat_req',
};

const getChatListReq = ({token, roomId}) => ({
  type: Types.GET_CHAT_LIST_REQ,
  payload: {
    token,
    roomId,
  },
});

const getChatListSuc = ({chatList}) => ({
  type: Types.GET_CHAT_LIST_SUC,
  payload: {
    chatList,
  },
});

const failedChatReq = ({err}) => ({
  type: Types.FAILED_CHAT_REQ,
  payload: {
    err,
  },
});

export {getChatListReq, getChatListSuc, failedChatReq, Types};
