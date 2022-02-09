const Types = {
  GET_CURRENT_USER_REQUEST: 'user/get_current_user_request',
  GET_CURRENT_USER_SUCCESS: 'user/get_current_user_success',
  LOGIN_WITH_PWD_REQUEST: 'user/login_with_pwd_request',
  LOGIN_WITH_PWD_SUCCESS: 'user/login_with_pwd_success',
  FAILED_USER_REQUEST: 'user/failed_user_request',
};

const getCurrentUserRequest = () => ({
  type: Types.GET_CURRENT_USER_REQUEST,
});

const loginWithEmailNPwdRequest = ({email, password}) => ({
  type: Types.LOGIN_WITH_PWD_REQUEST,
  payload: {
    email,
    password,
  },
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
  getFailedUserRequest,
  loginWithEmailNPwdRequest,
};
