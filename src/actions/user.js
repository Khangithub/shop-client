const Types = {
  GET_CURRENT_USER_REQUEST: 'user/get_current_user_request',
  GET_CURRENT_USER_SUCCESS: 'user/get_current_user_success',
  FAILED_USER_REQUEST: 'user/failed_user_request',
};

const getCurrentUserRequest = () => ({
  type: Types.GET_CURRENT_USER_REQUEST,
});

const getCurrentUserSuccess = ({currentUser}) => ({
  type: Types.GET_CURRENT_USER_SUCCESS,
  payload: {
    currentUser,
  },
});

const getFailedUserRequest = ({err}) => ({
  type: Types.FAILED_USER_REQUEST,
  payload: {
    err,
  },
});

export {
    Types,
    getCurrentUserRequest,
    getCurrentUserSuccess,
    getFailedUserRequest
}