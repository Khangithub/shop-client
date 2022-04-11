const Types = {
  GET_CHAT_LIST_REQ: 'chat/get_chat_list_req',
  GET_CHAT_LIST_SUC: 'chat/get_chat_list_suc',
  GET_CONVERSATION_REQ: 'chat/get_conversation_req',
  GET_CONVERSATION_SUC: 'chat/get_conversation_suc',
  FAILED_CHAT_REQ: 'chat/failed_chat_req',
};

const getChatListReq = ({token, roomId}) => ({
  type: Types.GET_CHAT_LIST_REQ,
  payload: {
    token,
    roomId,
  },
});

const getConversationReq = ({token, fromId}) => ({
  type: Types.GET_CONVERSATION_REQ,
  payload: {
    token,
    fromId,
  },
});

const getChatListSuc = ({chatList}) => ({
  type: Types.GET_CHAT_LIST_SUC,
  payload: {
    chatList,
  },
});

const getConversationSuc = ({conversations}) => ({
  type: Types.GET_CONVERSATION_SUC,
  payload: {
    conversations,
  },
});

const failedChatReq = ({err}) => ({
  type: Types.FAILED_CHAT_REQ,
  payload: {
    err,
  },
});

export {
  getChatListReq,
  getConversationReq,
  getChatListSuc,
  getConversationSuc,
  failedChatReq,
  Types,
};
