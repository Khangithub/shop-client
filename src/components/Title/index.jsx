import React from "react";
import { useHistory } from "react-router-dom";
import "./_title.scss";

function Title({ link, children }) {
  const history = useHistory();
  return <p className="title" onClick={() => history.push(link)}>{children}</p>;
}

export default Title;
