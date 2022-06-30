const Types = {
  GET_CURRENT_USER: '[AUTH] get current user',
  GET_CURRENT_USER_SUCCESS: '[AUTH] get current user success',
  LOGIN_WITH_EMAIL_N_PASSWORD: '[AUTH] login with email and password',
  LOGIN_WITH_GOOGLE: '[AUTH] login with google',
  SIGNUP: '[AUTH] signup',
  CHANGE_AVATAR: '[AUTH] change avatar',
  CHANGE_AVATAR_SUCCESS: '[AUTH] change avatar success',
  FAILED_AUTH_ACTION: '[AUTH] failed auth action',
  RESET_AUTH_ERROR: '[AUTH] reset auth error',
};

const getCurrentUserAction = () => ({
  type: Types.GET_CURRENT_USER,
});

const loginWithEmailNPasswordAction = ({email, password, history}) => ({
  type: Types.LOGIN_WITH_EMAIL_N_PASSWORD,
  payload: {
    email,
    password,
    history,
  },
});

const loginWithGoogleAction = ({history}) => ({
  type: Types.LOGIN_WITH_GOOGLE,
  payload: {
    history,
  },
});

const signupAction = ({email, role, avatar, username}) => ({
  type: Types.SIGNUP,
  payload: {
    email,
    role,
    avatar,
    username,
  },
});

const changeAvatarAction = ({file, token}) => ({
  type: Types.CHANGE_AVATAR,
  payload: {
    file,
    token,
  },
});

const getCurrentUserSuccessAction = ({currentUser, token}) => ({
  type: Types.GET_CURRENT_USER_SUCCESS,
  payload: {
    currentUser,
    token,
  },
});

const changeAvatarSuccessAction = ({file}) => ({
  type: Types.CHANGE_AVATAR_SUCCESS,
  payload: {
    file,
  },
});

const resetAuthErrorAction = () => ({type: Types.RESET_AUTH_ERROR});

const getFailedAuthAction = ({authError}) => ({
  type: Types.FAILED_AUTH_ACTION,
  payload: {
    authError,
  },
});

export {
  Types,
  getCurrentUserAction,
  loginWithGoogleAction,
  loginWithEmailNPasswordAction,
  signupAction,
  changeAvatarAction,
  getCurrentUserSuccessAction,
  changeAvatarSuccessAction,
  resetAuthErrorAction,
  getFailedAuthAction,
};
