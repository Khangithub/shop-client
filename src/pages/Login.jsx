import React, {useState} from 'react';
import {googleIcon, visibleOffSvg, visibleSvg} from '../assets';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginWithEmailNPasswordAction,
  loginWithGoogleAction,
  resetAuthErrorAction,
} from '../actions/auth';
import './_login.scss';
import {Alert} from 'react-bootstrap';

function Login () {
  const dispatch = useDispatch ();
  const history = useHistory ();

  const [account, setAccount] = useState ({email: '', password: ''});
  const [visiblePwd, setVisiblePwd] = useState (false);
  const {authError} = useSelector (({user}) => user);

  return (
    <div className="login">
      {authError &&
        <Alert
          variant="danger"
          onClick={() => dispatch (resetAuthErrorAction ())}
          dismissible
        >
          {authError}
        </Alert>}

      <div className="login-ct">
        <h1>Login</h1>

        <div className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
            onChange={e => setAccount ({...account, email: e.target.value})}
            onFocus={() => dispatch (resetAuthErrorAction ())}
          />
          <input
            type={visiblePwd ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={e => setAccount ({...account, password: e.target.value})}
            onFocus={() => dispatch (resetAuthErrorAction ())}
          />

          <img
            className="visible-pwd-btn"
            onClick={() => setVisiblePwd (!visiblePwd)}
            src={visiblePwd ? visibleSvg : visibleOffSvg}
            alt=""
          />

          <button
            type="submit"
            className="login-btn"
            onClick={() => {
              dispatch (
                loginWithEmailNPasswordAction ({
                  email: account.email,
                  password: account.password,
                  history
                })
              );
            }}
          >
            Login
          </button>
        </div>

        <p style={{textAlign: 'center', margin: '15px'}}>OR</p>

        <button
          className="gg-lg-btn"
          onClick={() => {
            dispatch (loginWithGoogleAction ({history}));
          }}
        >
          <img src={googleIcon} alt="google" />
          Continue with Google
        </button>

        <div className="gg-term-ct">
          <p className="term">
            <span>By continuing with Shopeeholic, you agreed with </span>
            <span>Terms of Service, Privacy Policy</span>
          </p>

          <p onClick={() => history.push ('/signup')}>
            Not on Shopeeholic yet? Sign up
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;