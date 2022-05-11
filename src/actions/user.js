const Types = {
  GET_CUR_USER_REQ: "user/get_cur_user_req",
  GET_CUR_USER_SUC: "user/get_cur_user_suc",
  LOGIN_WITH_PWD_REQ: "user/login_with_pwd_req",
  LOGIN_WITH_GG_REQ: "user/login_with_gg_req",
  SIGNUP_REQ: "user/signup_req",
  FAILED_USER_REQ: "user/failed_user_req",
  CHG_USER_AVT_REQ: "user/chg_avt_req",
  CHG_USER_AVT_SUC: "user/chg_avt_suc",
};

const getCurUserReq = () => ({
  type: Types.GET_CUR_USER_REQ,
});

const loginWithEmailRq = ({ email, password }) => ({
  type: Types.LOGIN_WITH_PWD_REQ,
  payload: {
    email,
    password,
  },
});

const loginWithGgRq = () => ({
  type: Types.LOGIN_WITH_GG_REQ,
});

const signupReq = ({ email, role, avatar, username }) => ({
  type: Types.SIGNUP_REQ,
  payload: {
    email,
    role,
    avatar,
    username,
  },
});

const chgUserAvtReq = ({ file, token }) => ({
  type: Types.CHG_USER_AVT_REQ,
  payload: {
    file,
    token,
  },
});

const getCurUserSuc = ({ currentUser, token }) => ({
  type: Types.GET_CUR_USER_SUC,
  payload: {
    currentUser,
    token,
  },
});

const chgUserAvtSuc = ({ file }) => ({
  type: Types.CHG_USER_AVT_SUC,
  payload: {
    file,
  },
});

const getFailedUserReq = ({ userErr }) => ({
  type: Types.FAILED_USER_REQ,
  payload: {
    userErr,
  },
});

export {
  Types,
  getCurUserReq,
  loginWithGgRq,
  loginWithEmailRq,
  signupReq,
  chgUserAvtReq,
  getCurUserSuc,
  chgUserAvtSuc,
  getFailedUserReq,
};
