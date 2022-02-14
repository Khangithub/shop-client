import React from "react";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";

function ProtectedRoute({ token, children }) {
  const history = useHistory();

  if (isEmpty(token)) {
    history.push("/login");
  }
  return <>{children}</>;
}

export default ProtectedRoute;
