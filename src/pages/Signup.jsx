import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signupAction} from '../actions/auth';
import {googleIcon} from '../assets';
import './_signup.scss';

function Signup () {
  const history = useHistory ();
  const dispatch = useDispatch ();

  return (
    <div className="signup">
      <div className="signup-ct">
        <h1> Sign up </h1>

        <button onClick={() => dispatch (signupAction ())}>
          <img src={googleIcon} alt="google" />
          <span>Signup with Google</span>
        </button>

        <div className="signup-term-ct ">
          <p>
            <span>By continuing with Shopeeholic, you agreed with </span>
            <span>Terms of Service, Privacy Policy</span>
          </p>

          <p onClick={() => history.push ('/login')}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;