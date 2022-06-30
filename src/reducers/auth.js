import { Types } from "../actions/auth";

const INTIAL_STATE = {
  currentUser: null,
  token: "",
  userLoading: true,
  avtChange: false,
  authError: null,
};

export default function user(state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        userLoading: false,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
      };
    }

    case Types.CHANGE_AVATAR: {
      return {
        ...state,
        avtChange: true,
      };
    }

    case Types.CHANGE_AVATAR_SUCCESS: {
      let cpCurrentUser = { ...state.currentUser };
      cpCurrentUser.avatar = action.payload.file;
      return {
        ...state,
        currentUser: cpCurrentUser,
        avtChange: false,
      };
    }

    case Types.FAILED_AUTH_ACTION: {
      return {
        ...state,
        userLoading: false,
        authError: action.payload.authError,
      };
    }

    case Types.RESET_AUTH_ERROR: {
      return {
        ...state,
        authError: null
      }
    }

    default: {
      return state;
    }
  }
}
