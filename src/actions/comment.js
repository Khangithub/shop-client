const Types = {
  CREATE_COMMENT: '[COMMENT] create comment',
  CREATE_COMMENT_SUCCESS: '[COMMENT] create comment success',
  GET_COMMENTS: '[COMMENT] get comments',
  GET_COMMENTS_SUCCESS: '[COMMENT] get comments success',
  REPLY_COMMENT: '[COMMENT] reply comment',
  REPLY_COMMENT_SUCCESS: '[COMMENT] rep comment success',
  REMOVE_COMMENT: '[COMMENT] remove comment',
  REMOVE_COMMENT_SUCCESS: '[COMMENT] remove comment success',
  EDIT_COMMENT: '[COMMENT] edit comment',
  EDIT_COMMENT_SUCCESS: '[COMMENT] edit comment success',
  REMOVE_REPLY: '[COMMENT] remove reply',
  REMOVE_REPLY_SUCCESS: '[COMMENT] remove reply success',
  GET_COMMENTS_OF_PRODUCT: '[COMMENT] get comments of product',
  FAILED_COMMET_ACTION: '[COMMENT] failed comment action',
};

const createCommentAction = ({productId, mainComment, media, token}) => ({
  type: Types.CREATE_COMMENT,
  payload: {
    productId,
    mainComment,
    media,
    token,
  },
});

const getCommentsAction = ({cmtList}) => ({
  type: Types.GET_COMMENTS,
  payload: {
    cmtList,
  },
});

const getCommentsOfProductAction = ({productId, batch, limit}) => ({
  type: Types.GET_COMMENTS_OF_PRODUCT,
  payload: {
    productId,
    batch,
    limit,
  },
});

const replyCommentAction = ({commentId, media, content, receiver, token}) => ({
  type: Types.REPLY_COMMENT,
  payload: {
    commentId,
    media,
    content,
    receiver,
    token,
  },
});

const removeCommentAction = ({commentId, token}) => ({
  type: Types.REMOVE_COMMENT,
  payload: {
    commentId,
    token,
  },
});

const editCommentAction = ({commentId, mainComment, mediaList, token}) => ({
  type: Types.EDIT_COMMENT,
  payload: {
    commentId,
    mainComment,
    mediaList,
    token,
  },
});

const removeReplyAction = ({commentId, repId, token}) => ({
  type: Types.REMOVE_REPLY,
  payload: {
    commentId,
    repId,
    token,
  },
});

const createCommentSuccessAction = ({newCmt}) => ({
  type: Types.CREATE_COMMENT_SUCCESS,
  payload: {
    newCmt,
  },
});

const getCommentsSuccessAction = ({cmtList}) => ({
  type: Types.GET_COMMENTS_SUCCESS,
  payload: {
    cmtList,
  },
});

const replyCommentSuccessAction = ({newRep, commentId}) => ({
  type: Types.REPLY_COMMENT_SUCCESS,
  payload: {
    newRep,
    commentId,
  },
});

const removeCommentSuccessAction = ({commentId}) => ({
  type: Types.REMOVE_COMMENT_SUCCESS,
  payload: {commentId},
});

const editCommentSuccessAction = ({mediaList, mainComment, commentId}) => ({
  type: Types.EDIT_COMMENT_SUCCESS,
  payload: {
    mediaList,
    mainComment,
    commentId,
  },
});

const removeReplySuccessAction = ({commentId, repId}) => ({
  type: Types.REMOVE_REPLY_SUCCESS,
  payload: {
    commentId,
    repId,
  },
});

const getFailedCommentAction = ({err}) => ({
  type: Types.FAILED_COMMET_ACTION,
  payload: {
    err,
  },
});

export {
  Types,
  createCommentAction,
  getCommentsAction,
  replyCommentAction,
  getCommentsOfProductAction,
  removeCommentAction,
  editCommentAction,
  removeReplyAction,
  replyCommentSuccessAction,
  getCommentsSuccessAction,
  createCommentSuccessAction,
  removeCommentSuccessAction,
  editCommentSuccessAction,
  removeReplySuccessAction,
  getFailedCommentAction,
};