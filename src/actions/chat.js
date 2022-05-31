const Types = {
  GET_MSGS_RQ: "chat/get_msgs_rq",
  GET_MSGS_SC: "chat/get_msgs_sc",
  UPDATE_MSGS: "chat/update_msgs",
  UPDATE_CHATS: "chat/update_chats",
  GET_CHATS_RQ: "chat/get_chats_rq",
  GET_CHATS_SC: "chat/get_chats_sc",
  FAILED_MSG_RQ: "chat/failed_msg_rq",
};

const getMsgsRq = ({ token, roomId }) => ({
  type: Types.GET_MSGS_RQ,
  payload: {
    token,
    roomId,
  },
});

const getChatsRq = ({ userId, token }) => ({
  type: Types.GET_CHATS_RQ,
  payload: {
    userId,
    token,
  },
});

const updateMsgs = ({ fromId, content, createdAt, type, mediaList }) => ({
  type: Types.UPDATE_MSGS,
  payload: {
    fromId,
    content,
    createdAt,
    type,
    mediaList,
  },
});

const updateChats = ({
  isNewChat,
  room,
  productId,
  productImage,
  productName,
  salerId,
  salerUsername,
  content,
  fromId,
  type,
  createdAt,
  mediaList,
}) => ({
  type: Types.UPDATE_CHATS,
  payload: {
    isNewChat,
    room,
    productId,
    productImage,
    productName,
    salerId,
    salerUsername,
    content,
    fromId,
    type,
    createdAt,
    mediaList,
  },
});

const getMsgsSc = ({ msgs }) => ({
  type: Types.GET_MSGS_SC,
  payload: {
    msgs,
  },
});

const getChatsSc = ({ chats }) => ({
  type: Types.GET_CHATS_SC,
  payload: {
    chats,
  },
});

const failedMsgRq = ({ err }) => ({
  type: Types.FAILED_MSG_RQ,
  payload: {
    err,
  },
});

export {
  getMsgsRq,
  getChatsRq,
  updateMsgs,
  updateChats,
  getChatsSc,
  getMsgsSc,
  failedMsgRq,
  Types,
};
