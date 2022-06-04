import { isEmpty } from "lodash";
import { auth, provider } from "../config/firebase";
import errMsg from "../config/errMsg.json";

const getCurUserCall = async ({ token }) => {
  try {
    if (!token) {
      throw Error(errMsg.TOKEN_NOT_FOUND);
    }

    const curUserRq = await fetch(process.env.REACT_APP_USERS_CURRENT_USER, {
      headers: {
        Authorization: "Bearer ".concat(token),
        "content-type": "application/json; charset=UTF-8",
      },
    });

    if (curUserRq.status === 200) {
      const curUserJson = await curUserRq.json();
      return curUserJson.currentUser;
    } else {
      let errContent = await curUserRq.text();
      throw Error(errContent);
    }
  } catch (err) {
    return err;
  }
};

const lgEmailNPwdCall = async ({ email, password }) => {
  try {
    const loginReq = await fetch(process.env.REACT_APP_USERS_LOGIN + "pwd", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });

    const loginJson = await loginReq.json();
    return {
      token: loginJson.token,
      currentUser: { ...loginJson.currentUser },
    };
  } catch (err) {
    return err;
  }
};

const lgGgCall = async () => {
  try {
    const {
      user: { email },
    } = await auth.signInWithPopup(provider);

    if (isEmpty(email)) {
      throw Error(errMsg.EMAIL_NOT_FOUND);
    }

    const ggLgRq = await fetch(process.env.REACT_APP_USERS_LOGIN + "google", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });

    if (ggLgRq.status === 200) {
      const ggLgJson = await ggLgRq.json();
      return ggLgJson;
    } else {
      let errContent = await ggLgRq.text();
      throw Error(errContent);
    }

  } catch (err) {
    return err;
  }
};

const signupCall = async () => {
  try {
    const {
      user: { email, photoURL, displayName },
    } = await auth.signInWithPopup(provider);

    if (isEmpty(email)) {
      throw new Error(errMsg.EMAIL_NOT_FOUND);
    }

    const signupRq = await fetch(process.env.REACT_APP_USERS_SIGNUP, {
      method: "POST",
      body: JSON.stringify({
        email,
        role: "client",
        avatar: photoURL,
        username: displayName,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });

    const signupJson = await signupRq.json();
    return {
      token: signupJson.token,
      currentUser: { ...signupJson.currentUser },
    };
  } catch (err) {
    return err;
  }
};

const chgAvtCall = async ({ token, file }) => {
  const formData = new FormData();
  formData.append("chg-avt", file);
  const chgAvtReq = await fetch(
    process.env.REACT_APP_USERS_CURRENT_USER + "avt",
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer ".concat(token),
      },
      body: formData,
    }
  );
  const chgAvtJson = await chgAvtReq.json();
  return chgAvtJson;
};

const getNewTokensCall = async ({ refToken }) => {
  const tokensRq = await fetch(process.env.REACT_APP_GET_NEW_TOKENS, {
    headers: {
      Authorization: "Bearer ".concat(refToken),
    },
  });

  if (tokensRq.status === 200) {
    const tokensJson = await tokensRq.json();
    return tokensJson;
  } else {
    let errContent = await tokensRq.text();
    throw Error(errContent);
  }
};

export {
  getCurUserCall,
  lgEmailNPwdCall,
  lgGgCall,
  signupCall,
  chgAvtCall,
  getNewTokensCall,
};
