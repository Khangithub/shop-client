import React, { createContext, useEffect } from "react";
import { getCurUserReq } from "../actions/user";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../components";
import { isEmpty } from "lodash";

export const UserCtx = createContext();

function UserCtxProvider({children}) {
  const dispatch = useDispatch();
  const { currentUser, token, userLoading, userErr } = useSelector(
    ({ user }) => user
  );

  useEffect(() => {
    dispatch(getCurUserReq());
  }, [dispatch]);

  if (userLoading || !isEmpty(userErr)) return <Loading />;

  return (
    <UserCtx.Provider value={{ currentUser, token, userLoading, userErr }}>
      {children}
    </UserCtx.Provider>
  );
}

export default UserCtxProvider;
