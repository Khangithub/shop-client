import {Types} from '../actions/user';

const INTIAL_STATE = {
  currentUser: {},
  loading: true,
  err: {},
};

export default function user (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        currentUser: action.payload.currentUser,
      };
    }

    case Types.FAILED_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        err: action.payload.err,
      };
    }

    default: {
      return state;
    }
  }
}
