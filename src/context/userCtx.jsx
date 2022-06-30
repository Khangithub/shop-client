import React, { createContext, useEffect } from "react";
import { getCurrentUserAction } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../components";

export const UserCtx = createContext();

function UserCtxProvider({children}) {
  const dispatch = useDispatch();
  const { currentUser, token, userLoading, authError, avtChange } = useSelector(
    ({ user }) => user
  );

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [dispatch]);

  if (userLoading) return <Loading />;

  return (
    <UserCtx.Provider value={{ currentUser, token, userLoading, authError, avtChange }}>
      {children}
    </UserCtx.Provider>
  );
}

export default UserCtxProvider;
