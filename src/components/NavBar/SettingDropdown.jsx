import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import "./_settingDropdown.scss";
import { Image, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../Loading";
import { getCurrentUserRequest } from "../../actions/user";

function SettingDropdown({ billList }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser, loading, err } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUserRequest());
  }, [dispatch]);

  if (_.isEmpty(currentUser)) return <Loading />;

  if (loading) return <Loading />;

  if (!_.isEmpty(err, true)) return <Loading />;

  if (currentUser.status === "loginStatus/unauthorized")
    return <button className="login_btn" onClick={() => history.push('/login')}>Login</button>;

  return (
    <NavDropdown
      className="setting-dropdown"
      title={
        <img className="setting-user-avatar" src={currentUser.avatar} alt="user-avatar" />
      }
    >
      {currentUser && currentUser.role !== "client" && (
        <NavDropdown.Item
          href="/yourProducts"
          className="setting-dropdown-item"
        >
          <span className="setting-dropdown-item--title">
            Your Product List
          </span>
        </NavDropdown.Item>
      )}

      {currentUser && currentUser.role !== "client" && (
        <NavDropdown.Item className="setting-dropdown-item" href="/yourBills">
          <span className="setting-dropdown-item--title">Your Order List</span>
          <span className="setting-dropdown-item--length">
            {billList ? billList.length : "loading"}
          </span>
        </NavDropdown.Item>
      )}

      {currentUser && (
        <NavDropdown.Item className="setting-dropdown-item" href="/personalize">
          <span className="setting-dropdown-item--title">Personalize</span>

          {currentUser && (
            <Image
              src={currentUser.avatar}
              className="setting-dropdown-item-img"
              roundedCircle
            />
          )}
        </NavDropdown.Item>
      )}

      <NavDropdown.Item
        className="setting-dropdown-item setting-dropdown-user-btn"
        href="/login"
      >
        <span className="setting-dropdown-item--title">Log in</span>
      </NavDropdown.Item>

      <NavDropdown.Item
        className="setting-dropdown-item setting-dropdown-user-btn"
        href="/signup"
      >
        <span className="setting-dropdown-item--title">Sign up</span>
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingDropdown;
