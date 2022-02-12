import {Types} from '../actions/user';

const INTIAL_STATE = {
  currentUser: {},
  token: '',
  userLoading: true,
  userErr: {},
};

export default function user (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        userLoading: false,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
      };
    }

    case Types.FAILED_USER_REQUEST: {
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
