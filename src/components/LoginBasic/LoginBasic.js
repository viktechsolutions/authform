import { useEffect, useRef, useState } from 'react';

import './LoginBasic.scss';
import Popup from '../Popup/Popup';
import submitHdl from '../../Features/submitHandler';

const LoginBasic = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [passwordError, setPasswordError] = useState('Password cannot be empty');
  const [formValid, setFormValid] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [popup, setPopup] = useState(false);
  const [popupError, setPopupError] = useState(false);
  const emailInputRef = useRef(null);
  const submitHandler = submitHdl(email, password, setPopup, setPopupError);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regExp.test(String(e.target.value).toLowerCase())) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);

    if (!e.target.value) {
      setPasswordError('Password cannot be empty');
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
    case 'email':
      setEmailDirty(true);
      break;
    case 'password':
      setPasswordDirty(true);
      break;
    }
  };

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <div className="loginBasic">
      <form
        className="form loginBasic__form"
        onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className="input-container">
          <div className="input-wrapper">
            <input
              ref={emailInputRef}
              onChange={e => emailHandler(e)}
              value={email}
              onBlur={e => blurHandler(e)}
              name="email"
              type="email"
              placeholder="Email"
              className="input email "/>
            <div className="icon">
              <i className="pi pi-at"/>
            </div>
            {(emailDirty && emailError) && <div
              className="error form__error"
            >{emailError}</div>}
          </div>
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <input
              onChange={e => passwordHandler(e)}
              value={password}
              onBlur={e => blurHandler(e)}
              name="password"
              type={inputType}
              placeholder="Password"
              className="input password"
            />
            <div className="icon">
              <span
                className="toggle-btn"
                onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
                {inputType === 'password' ? <i className="pi pi-eye"/> : <i className="pi pi-eye-slash"/>}
              </span>
            </div>
            {(passwordDirty && passwordError) && <div
              className="error form__error"
            >{passwordError}</div>}
          </div>
        </div>
        <button
          className="button submit"
          disabled={!formValid}
          type="submit">Login
        </button>
        <div className="register loginBasic__register">
          <span>Don't have an account?</span>
          <a href="*">Register</a>
        </div>
      </form>
      {popup && <Popup
        color="#125012"
        text="Success"
        bg="rgb(139 215 139 / 85%)"/>}
      {popupError && <Popup
        color="#930101"
        bg="#f57878"
        text="Error"/>}
    </div>);
};

export default LoginBasic;
