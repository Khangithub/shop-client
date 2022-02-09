import _ from 'lodash';
import {auth, provider} from '../firebase';

const loginStatus = {
  UNAUTHORIZED: 'loginStatus/unauthorized',
  LOGGEDIN: 'loginStatus/logged-in',
};

const getCurrentUserCall = async ({token}) => {
  try {
    if (_.isEmpty (token)) {
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
    console.log ('loginWithGgCall', email);

    if (_.isEmpty (email)) {
      throw new Error('unable to login with gg')
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
export {getCurrentUserCall, loginWithEmailNPwdCall, loginWithGgCall};
