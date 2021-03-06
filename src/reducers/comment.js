import {Types} from '../actions/comment';

const INTIAL_STATE = {
  cmtList: [],
  cmtLoading: true,
  cmtErr: {},
};

export default function cmt (state = INTIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        cmtLoading: false,
        cmtList: action.payload.cmtList,
      };
    }

    case Types.CREATE_COMMENT_SUCCESS: {
      const {newCmt} = action.payload;
      const {cmtList} = state;
      return {
        ...state,
        cmtLoading: false,
        cmtList: [...cmtList, newCmt],
      };
    }

    case Types.REPLY_COMMENT_SUCCESS: {
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

    case Types.EDIT_COMMENT_SUCCESS: {
      const {commentId, mediaList, mainComment} = action.payload;
      const newCmtList = state.cmtList;
      const cmtIndex = newCmtList.map (({_id}) => _id).indexOf (commentId);
      if (mediaList) {
        newCmtList[cmtIndex].mediaList = mediaList;
      }
      newCmtList[cmtIndex].mainComment = mainComment;
      newCmtList[cmtIndex].edited = true;

      return {
        ...state,
        cmtLoading: false,
        cmtList: newCmtList,
      };
    }

    case Types.REMOVE_COMMENT_SUCCESS: {
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

    case Types.REMOVE_REPLY_SUCCESS: {
      const {commentId, repId} = action.payload;
      const newCmtList = state.cmtList;
      const cmtIndex = newCmtList.map (({_id}) => _id).indexOf (commentId);
      const repIndex = newCmtList[cmtIndex].subComment
        .map (({_id}) => _id)
        .indexOf (repId);
      
        newCmtList[cmtIndex].subComment.splice (repIndex, 1);

      return {
        ...state,
        cmtLoading: false,
        cmtList: newCmtList,
      };
    }

    case Types.FAILED_COMMET_ACTION: {
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
