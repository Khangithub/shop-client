import { Types } from "../actions/chat";

const INTIAL_STATE = {
  chatList: [],
  chatLoading: true,
  chatErr: {},
};

export default function chat(state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CHAT_LIST_SUC: {
      return {
        ...state,
        chatLoading: false,
        chatList: action.payload.chatList,
      };
    }

    case Types.UPDATE_CHAT_LIST: {
      let updatedChatList = [...state.chatList, action.payload];
      return {
        ...state,
        chatList: updatedChatList,
      };
    }

    case Types.FAILED_CHAT_REQ: {
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
