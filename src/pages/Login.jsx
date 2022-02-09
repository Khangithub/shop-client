import React, { useState } from "react";
import "./_login.scss";
import { IconButton } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import googleIcon from "../assets/svgs/google.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithEmailNPwdRequest, loginWithGgRequest } from "../actions/user";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  let [account, setAccount] = useState({ email: "", password: "" });
  let [visiblePwd, setVisiblePwd] = useState(false);

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>

        <form className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
          <input
            type={visiblePwd ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
          />

          <IconButton
            className="visible-pwd-btn"
            onClick={() => setVisiblePwd(!visiblePwd)}
          >
            {visiblePwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>

          <p>Forget your password</p>

          <button
            type="submit"
            className="login-btn"
            onClick={() => {
              dispatch(
                loginWithEmailNPwdRequest({
                  email: account.email,
                  password: account.password,
                })
              );
              history.push("/");
            }}
          >
            Login
          </button>
        </form>

        <div className="gg-login-container">
          <h4>
            <strong>Or</strong>
          </h4>
          <button
            onClick={() => {
              dispatch(loginWithGgRequest());
              history.push("/");
            }}
          >
            <img src={googleIcon} alt="google" />
            Continue with Google
          </button>
        </div>

        <div className="signup-btn-container ">
          <div className="term">
            <span>By continuing with Shopeeholic, you agreed with </span>
            <span>Terms of Service, Privacy Policy</span>
          </div>

          <p onClick={() => history.push("/signup")}>
            Not on Shopeeholic yet? Sign up
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
