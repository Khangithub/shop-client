import { Types } from "../actions/chat";

const INTIAL_STATE = {
  msgs: [],
  chats: [],
  chatLoading: true,
  chatErr: {},
};

export default function chat(state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_MSGS_SC: {
      return {
        ...state,
        chatLoading: false,
        msgs: action.payload.msgs,
      };
    }

    case Types.UPDATE_MSGS: {
      let updatedChatList = [...state.msgs, action.payload];
      return {
        ...state,
        msgs: updatedChatList,
      };
    }

    case Types.GET_CHATS_SC: {
      return {
        ...state,
        chatLoading: false,
        chats: action.payload.chats,
      };
    }

    case Types.FAILED_MSG_RQ: {
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
