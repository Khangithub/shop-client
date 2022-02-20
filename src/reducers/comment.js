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

    case Types.REP_CMT_SUC: {
      const {newRep, commentId} = action.payload;
      const newCmtList = state.cmtList;
      const cmtIndex = newCmtList.map (({_id}) => _id).indexOf (commentId);
      newCmtList[cmtIndex].subComment.push (newRep);

      return {
        ...state,
        cmtLoading: false,
        cmtList: newCmtList,
      };
    }

    case Types.EDIT_CMT_SUC: {
      const {commentId, mediaList, mainComment} = action.payload;
      const newCmtList = state.cmtList;
      const cmtIndex = newCmtList.map (({_id}) => _id).indexOf (commentId);
      newCmtList[cmtIndex].mediaList = mediaList;
      newCmtList[cmtIndex].mainComment = mainComment;

      return {
        ...state,
        cmtLoading: false,
        cmtList: newCmtList,
      };
    }

    case Types.DEL_CMT_SUC: {
      const {commentId} = action.payload;
      const newCmtList = state.cmtList;
      const cmtIndex = newCmtList.map (({_id}) => _id).indexOf (commentId);
      newCmtList.splice (cmtIndex, 1);

      return {
        ...state,
        cmtLoading: false,
        cmtList: newCmtList,
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
