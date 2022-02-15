import {Types} from '../actions/comment';

const INTIAL_STATE = {
  cmtList: [],
  cmtLoading: true,
  cmtErr: {},
};

export default function cmt (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CMT_LIST_SUC: {
      return {
        ...state,
        cmtLoading: false,
        cmtList: action.payload.cmtList,
      };
    }

    case Types.ADD_CMT_SUC: {
      const {newCmt} = action.payload;
      const {cmtList} = state;
      return {
        ...state,
        cmtLoading: false,
        cmtList: [...cmtList, newCmt],
      };
    }

    case Types.FAILED_CMT_REQ: {
      return {
        ...state,
        cmtLoading: true,
        cmtErr: action.payload.cmtErr,
      };
    }

    default: {
      return state;
    }
  }
}
