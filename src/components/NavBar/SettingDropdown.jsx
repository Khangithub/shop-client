import React from "react";
import { useHistory } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { isEmpty } from "lodash";

import Loading from "../Loading";
import "./_settingDropdown.scss";

function SettingDropdown({ currentUser, userErr, userLoading }) {
  const history = useHistory();

  if (isEmpty(currentUser)) return <Loading errMsg={currentUser} />;
  if (userLoading) return <Loading errMsg={userLoading} />;
  if (!isEmpty(userErr)) return <Loading errMsg={userErr} />;

  if (currentUser.status === "loginStatus/unauthorized")
    return (
      <button className="login_btn" onClick={() => history.push("/login")}>
        Login
      </button>
    );

  return (
    <NavDropdown
      className="setting-dropdown"
      title={
        <img
          className="setting-user-avatar"
          src={currentUser.avatar}
          alt="user-avatar"
        />
      }
    >
      {currentUser && (
        <NavDropdown.Item href="/personalize">Setting</NavDropdown.Item>
      )}

      <NavDropdown.Item className="setting-dropdown-user-btn" href="/login">
        Log out
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingDropdown;
