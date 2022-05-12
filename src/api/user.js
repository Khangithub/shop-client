import { isEmpty } from "lodash";
import { auth, provider } from "../config/firebase";

const getCurrentUserCall = async ({ token }) => {
  try {
    if (!token) {
      return null;
    }
    
    const currentUserResponse = await fetch(
      process.env.REACT_APP_USERS_CURRENT_USER,
      {
        headers: {
          Authorization: "Bearer ".concat(token),
          "content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const currentUserJson = await currentUserResponse.json();
    return { ...currentUserJson.currentUser };
  } catch (err) {
    return err;
  }
};

const loginWithEmailNPwdCall = async ({ email, password }) => {
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

const loginWithGgCall = async () => {
  try {
    const {
      user: { email },
    } = await auth.signInWithPopup(provider);

    if (isEmpty(email)) {
      throw new Error("unable to login with gg");
    }

    const loginReq = await fetch(process.env.REACT_APP_USERS_LOGIN + "google", {
      method: "POST",
      body: JSON.stringify({
        email,
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

const signupCall = async ({ role }) => {
  try {
    const {
      user: { email, photoURL, displayName },
    } = await auth.signInWithPopup(provider);

    if (isEmpty(email)) {
      throw new Error("unable to signup with gg");
    }

    const signupReq = await fetch(process.env.REACT_APP_USERS_SIGNUP, {
      method: "POST",
      body: JSON.stringify({
        email,
        role,
        avatar: photoURL,
        username: displayName,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });

    const signupJson = await signupReq.json();
    return {
      token: signupJson.token,
      currentUser: { ...signupJson.currentUser },
    };
  } catch (err) {
    return err;
  }
};

const chgUserAvtCall = async ({ token, file }) => {
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

export {
  getCurrentUserCall,
  loginWithEmailNPwdCall,
  loginWithGgCall,
  signupCall,
  chgUserAvtCall,
};
