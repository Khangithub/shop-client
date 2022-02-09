import _ from 'lodash';

const loginStatus = {
  UNAUTHORIZED: 'loginStatus/unauthorized',
  LOGGEDIN: 'loginStatus/logged-in',
};

const getCurrentUserCall = async ({token}) => {
  try {
    if (_.isEmpty(token)) {
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

export {getCurrentUserCall};
