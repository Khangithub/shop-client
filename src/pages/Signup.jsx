import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupRequest } from "../actions/user";

import googleIcon from "../assets/svgs/google.svg";
import "./_signup.scss";

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [role, setRole] = useState("client");

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>
          <b>Sign up</b>
        </h1>

        <form>
          <input
            type="radio"
            name="role"
            value="client"
            defaultChecked
            onClick={(e) => {
              setRole(e.target.value);
            }}
          />
          <label htmlFor="client">I want to be a client</label>
          <br />
          <input
            type="radio"
            name="role"
            value="saler"
            onClick={(e) => {
              setRole(e.target.value);
            }}
          />
          <label htmlFor="saler">I want to be a saleman</label>
          <br />
        </form>

        <button
          onClick={() => {
            dispatch(signupRequest({ role }));
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