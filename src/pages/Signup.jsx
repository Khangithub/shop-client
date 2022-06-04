import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupRq } from "../actions/user";

import { googleIcon } from "../assets";
import "./_signup.scss";

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>
          <b>Sign up</b>
        </h1>

        <button
          onClick={() => {
            dispatch(signupRq());
            history.push("/");
          }}
        >
          <img src={googleIcon} alt="google" />
          Signup with Google
        </button>

        <div className="signup-term-container ">
          <div className="term">
            <span>By continuing with Shopeeholic, you agreed with </span>
            <span>Terms of Service, Privacy Policy</span>
          </div>

          <p onClick={() => history.push("/login")}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
