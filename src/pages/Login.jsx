import React, { useState } from "react";
import { googleIcon, visibleOffSvg, visibleSvg } from "../assets";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { lgEmailNPwdRq, lgGgRq } from "../actions/user";
import "./_login.scss";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  let [account, setAccount] = useState({ email: "", password: "" });
  let [visiblePwd, setVisiblePwd] = useState(false);

  return (
    <div className="login">
      <div className="login-ct">
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

          <img
            className="visible-pwd-btn"
            onClick={() => setVisiblePwd(!visiblePwd)}
            src={visiblePwd ? visibleSvg : visibleOffSvg}
            alt=""
          />

          <button
            type="submit"
            className="login-btn"
            onClick={() => {
              dispatch(
                lgEmailNPwdRq({
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

        <div className="gg-login-ct">
          <h4>
            <b>Or</b>
          </h4>
          <button
            onClick={() => {
              dispatch(lgGgRq());
              history.push("/");
            }}
          >
            <img src={googleIcon} alt="google" />
            Continue with Google
          </button>
        </div>

        <div className="login-term-container">
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
