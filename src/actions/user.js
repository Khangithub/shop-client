const Types = {
  GET_CURRENT_USER_REQUEST: 'user/get_current_user_request',
  GET_CURRENT_USER_SUCCESS: 'user/get_current_user_success',
  LOGIN_WITH_PWD_REQUEST: 'user/login_with_email_n_pwd_request',
  LOGIN_WITH_GG_REQUEST: 'user/login_with_gg_request',
  SIGNUP_REQUEST: 'user/signup_request',
  FAILED_USER_REQUEST: 'user/failed_user_request',
};

const getCurrentUserRequest = () => ({
  type: Types.GET_CURRENT_USER_REQUEST,
});

const loginWithEmailNPwdRq = ({email, password}) => ({
  type: Types.LOGIN_WITH_PWD_REQUEST,
  payload: {
    email,
    password,
  },
});

const loginWithGgRq = () => ({
  type: Types.LOGIN_WITH_GG_REQUEST,
});

const signupRequest = ({email, role, avatar, username}) => ({
  type: Types.SIGNUP_REQUEST,
  payload: {
    email,
    role,
    avatar,
    username,
  },
});

const getCurrentUserSuccess = ({currentUser, token}) => ({
  type: Types.GET_CURRENT_USER_SUCCESS,
  payload: {
    currentUser,
    token
  },
});

const getFailedUserRequest = ({userErr}) => ({
  type: Types.FAILED_USER_REQUEST,
  payload: {
    userErr,
  },
});

export {
  Types,
  getCurrentUserRequest,
  loginWithGgRq,
  signupRequest,
  getCurrentUserSuccess,
  getFailedUserRequest,
  loginWithEmailNPwdRq,
};
