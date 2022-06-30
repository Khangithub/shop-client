const Types = {
  GET_MESSAGES: "[CHAT] get messages",
  GET_MESSAGES_SUCCESS: "[CHAT] get messages success",
  UPDATE_MESSAGE: "[CHAT] update messages",
  UPDATE_CHATS: "[CHAT] update chats",
  GET_CHATS: "[CHAT] get chats",
  GET_CHATS_SUCCESS: "[CHAT] get chats success",
  FAILED_CHAT_ACTION: "[CHAT] failed chat action",
};

const getMessagesAction = ({ token, roomId }) => ({
  type: Types.GET_MESSAGES,
  payload: {
    token,
    roomId,
  },
});

const getChatsAction = ({ userId, token }) => ({
  type: Types.GET_CHATS,
  payload: {
    userId,
    token,
  },
});

const updateMessagesAction = ({ fromId, content, createdAt, type, mediaList }) => ({
  type: Types.UPDATE_MESSAGE,
  payload: {
    fromId,
    content,
    createdAt,
    type,
    mediaList,
  },
});

const updateChatsAction = ({
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

const getMessagesSuccessAction = ({ msgs }) => ({
  type: Types.GET_MESSAGES_SUCCESS,
  payload: {
    msgs,
  },
});

const getChatSuccessAction = ({ chats }) => ({
  type: Types.GET_CHATS_SUCCESS,
  payload: {
    chats,
  },
});

const getFailedMessagesAction = ({ err }) => ({
  type: Types.FAILED_CHAT_ACTION,
  payload: {
    err,
  },
});

export {
  Types,
  getMessagesAction,
  getChatsAction,
  updateMessagesAction,
  updateChatsAction,
  getChatSuccessAction,
  getMessagesSuccessAction,
  getFailedMessagesAction,
};