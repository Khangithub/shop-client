import { Types } from "../actions/chat";

const INTIAL_STATE = {
  msgList: [],
  chatLoading: true,
  chatErr: {},
};

export default function chat(state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_MSG_LIST_SUC: {
      return {
        ...state,
        chatLoading: false,
        msgList: action.payload.msgList,
      };
    }

    case Types.UPDATE_MSG_LIST: {
      let updatedChatList = [...state.msgList, action.payload];
      return {
        ...state,
        msgList: updatedChatList,
      };
    }

    case Types.FAILED_MSG_REQ: {
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
