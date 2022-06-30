import { Types } from "../actions/chat";

const INTIAL_STATE = {
  msgs: [],
  chats: [],
  chatLoading: true,
  chatErr: {},
};

export default function chat(state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        chatLoading: false,
        msgs: action.payload.msgs,
      };
    }

    case Types.UPDATE_MESSAGE: {
      const { fromId, content, createdAt, type, mediaList } = action.payload;

      let cpMsgs = [
        ...state.msgs,
        { from: fromId, content, createdAt, type, mediaList },
      ];

      return {
        ...state,
        msgs: cpMsgs,
      };
    }

    case Types.UPDATE_CHATS: {
      let {
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
      } = action.payload;
      let cpChats = [...state.chats];

      if (isNewChat) {
        let newChat = {
          product: {
            productImage,
            _id: productId,
            name: productName,
            saler: {
              username: salerUsername,
              _id: salerId,
            },
          },
          room,
          messages: [
            {
              type,
              content,
              from: {
                _id: fromId,
              },
              createdAt,
              mediaList,
            },
          ],
        };

        return {
          ...state,
          chatLoading: false,
          chats: [newChat, ...cpChats],
        };
      } else {
        let chatIndex = cpChats.findIndex((chat) => chat.room === room);
        let currentChat = cpChats.splice(chatIndex, 1)[0];

        currentChat.messages[0] = {
          type,
          content,
          from: {
            _id: fromId,
          },
          createdAt,
          mediaList,
        };

        return {
          ...state,
          chatLoading: false,
          chats: [currentChat, ...cpChats],
        };
      }
    }

    case Types.GET_CHATS_SUCCESS: {
      return {
        ...state,
        chatLoading: false,
        chats: action.payload.chats,
      };
    }

    case Types.FAILED_CHAT_ACTION: {
      return {
        ...state,
        chatLoading: true,
        chatErr: action.payload.chatErr,
      };
    }

    default: {
      return state;
    }
  }
}
