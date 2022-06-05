import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserCtx } from "../context/user";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { currentUser } = useContext(UserCtx);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!currentUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
