import { Types } from "../actions/user";

const INTIAL_STATE = {
  currentUser: null,
  token: "",
  refToken: "",
  userLoading: true,
  avtChange: false,
  userErr: {},
};

export default function user(state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CUR_USER_SC: {
      console.log("action ->", action.payload);
      return {
        ...state,
        userLoading: false,
        token: action.payload.token,
        refToken: action.payload.refToken,
        currentUser: action.payload.currentUser,
      };
    }

    case Types.CHG_AVT_RQ: {
      return {
        ...state,
        avtChange: true,
      };
    }

    case Types.CHG_USER_AVT_SC: {
      let cpCurrentUser = { ...state.currentUser };
      cpCurrentUser.avatar = action.payload.file;
      return {
        ...state,
        currentUser: cpCurrentUser,
        avtChange: false,
      };
    }

    case Types.FAIL_USER_RQ: {
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
