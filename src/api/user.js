import {isEmpty} from 'lodash';
import {auth, provider} from '../config/firebase';

const loginStatus = {
  UNAUTHORIZED: 'loginStatus/unauthorized',
  LOGGEDIN: 'loginStatus/logged-in',
};

const getCurrentUserCall = async ({token}) => {
  try {
    if (isEmpty (token)) {
      return {
        status: loginStatus.UNAUTHORIZED,
      };
    }
    const currentUserResponse = await fetch (
      process.env.REACT_APP_USERS_CURRENT_USER,
      {
        headers: {
          Authorization: 'Bearer '.concat (token),
          'content-type': 'application/json; charset=UTF-8',
        },
      }
    );

    const currentUserJson = await currentUserResponse.json ();
    return {...currentUserJson.currentUser, status: loginStatus.LOGGEDIN};
  } catch (err) {
    return err;
  }
};

const loginWithEmailNPwdCall = async ({email, password}) => {
  try {
    const loginReq = await fetch (process.env.REACT_APP_USERS_LOGIN + 'pwd', {
      method: 'POST',
      body: JSON.stringify ({
        email,
        password,
      }),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    });

    const loginJson = await loginReq.json ();
    return {
      token: loginJson.token,
      currentUser: {...loginJson.currentUser, staus: loginStatus.LOGGEDIN},
    };
  } catch (err) {
    return err;
  }
};

const loginWithGgCall = async () => {
  try {
    const {user: {email}} = await auth.signInWithPopup (provider);

    if (isEmpty (email)) {
      throw new Error ('unable to login with gg');
    }

    const loginReq = await fetch (
      process.env.REACT_APP_USERS_LOGIN + 'google',
      {
        method: 'POST',
        body: JSON.stringify ({
          email,
        }),
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      }
    );

    const loginJson = await loginReq.json ();
    return {
      token: loginJson.token,
      currentUser: {...loginJson.currentUser, staus: loginStatus.LOGGEDIN},
    };
  } catch (err) {
    return err;
  }
};

const signupCall = async ({role}) => {
  try {
    const {user: {email, photoURL, displayName}} = await auth.signInWithPopup (
      provider
    );
    console.log ('call', email, photoURL, displayName);

    if (isEmpty (email)) {
      throw new Error ('unable to signup with gg');
    }

    const signupReq = await fetch (process.env.REACT_APP_USERS_SIGNUP, {
      method: 'POST',
      body: JSON.stringify ({
        email,
        role,
        avatar: photoURL,
        username: displayName,
      }),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    });

    const signupJson = await signupReq.json ();
    return {
      token: signupJson.token,
      currentUser: {...signupJson.currentUser, staus: loginStatus.LOGGEDIN},
    };
  } catch (err) {
    return err;
  }
};

export {
  getCurrentUserCall,
  loginWithEmailNPwdCall,
  loginWithGgCall,
  signupCall,
};
