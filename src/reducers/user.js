import { Types } from "../actions/user";

const INTIAL_STATE = {
  currentUser: {},
  token: "",
  userLoading: true,
  userErr: {},
};

export default function user(state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CUR_USER_SUC: {
      return {
        ...state,
        userLoading: false,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
      };
    }

    case Types.CHG_USER_AVT_SUC: {
      let cpCurrentUser = { ...state.currentUser };
      cpCurrentUser.avatar = action.payload.file;
      return {
        ...state,
        currentUser: cpCurrentUser,
      };
    }

    case Types.FAILED_USER_REQ: {
      return {
        ...state,
        userLoading: true,
        userErr: action.payload.userErr,
      };
    }

    default: {
      return state;
    }
  }
}
