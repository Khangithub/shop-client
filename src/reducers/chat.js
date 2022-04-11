import {Types} from '../actions/chat';

const INTIAL_STATE = {
  chatList: [],
  conversations: [],
  chatLoading: true,
  chatErr: {},
};

export default function chat (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CHAT_LIST_SUC: {
      return {
        ...state,
        chatLoading: false,
        chatList: action.payload.chatList,
      };
    }

    case Types.GET_CONVERSATION_SUC: {
      return {
        ...state,
        chatLoading: false,
        conversations: action.payload.conversations,
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
