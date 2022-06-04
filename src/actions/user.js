const Types = {
  GET_CUR_USER_RQ: "user/get_cur_user_rq",
  GET_CUR_USER_SC: "user/get_cur_user_sc",
  LG_WITH_PWD_RQ: "user/lg_with_pwd_rq",
  LG_WITH_GG_RQ: "user/lg_with_gg_rq",
  SIGNUP_RQ: "user/signup_rq",
  CHG_USER_AVT_RQ: "user/chg_avt_rq",
  CHG_USER_AVT_SC: "user/chg_avt_sc",
  GET_NEW_TOKENS_RQ: "user/get_new_tokens_rq",
  FAIL_USER_RQ: "user/fail_user_rq",
};

const getCurUserRq = () => ({
  type: Types.GET_CUR_USER_RQ,
});

const lgEmailNPwdRq = ({ email, password }) => ({
  type: Types.LG_WITH_PWD_RQ,
  payload: {
    email,
    password,
  },
});

const lgGgRq = () => ({
  type: Types.LG_WITH_GG_RQ,
});

const signupRq = () => ({
  type: Types.SIGNUP_RQ,
});

const chgUserAvtRq = ({ file, token }) => ({
  type: Types.CHG_USER_AVT_RQ,
  payload: {
    file,
    token,
  },
});

const getNewTokensRq = () => ({
  type: Types.GET_NEW_TOKENS_RQ,
});

const getCurUserSc = ({ currentUser, token, refToken }) => ({
  type: Types.GET_CUR_USER_SC,
  payload: {
    currentUser,
    token,
    refToken
  },
});

const chgUserAvtSc = ({ file }) => ({
  type: Types.CHG_USER_AVT_SC,
  payload: {
    file,
  },
});

const getFailUserRq = ({ userErr }) => ({
  type: Types.FAIL_USER_RQ,
  payload: {
    userErr,
  },
});

export {
  Types,
  getCurUserRq,
  getNewTokensRq,
  lgGgRq,
  lgEmailNPwdRq,
  signupRq,
  chgUserAvtRq,
  getCurUserSc,
  chgUserAvtSc,
  getFailUserRq,
};
