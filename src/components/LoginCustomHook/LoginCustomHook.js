import { useEffect, useRef, useState } from 'react';

import './LoginCustomHook.scss';
import useInput from '../../CustomHooks/UseHooks/useInput';
import Popup from '../Popup/Popup';
import submitHdl from '../../Features/submitHandler';

const LoginCustomHook = () => {
  const email = useInput('', { isEmpty: true, emailError: true });
  const password = useInput('', { isEmpty: true, passwordError: true });
  const [inputType, setInputType] = useState('password');
  const [popup, setPopup] = useState(false);
  const [popupError, setPopupError] = useState(false);
  const submitHandler = submitHdl(email, password, setPopup, setPopupError);
  const [formValid, setFormValid] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (email.error || password.error) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [email.error, password.error]);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <div className="loginCustomHook">
      <form
        className="form loginCustomHook__form"
        onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className="input-container">
          <div className="input-wrapper">
            <input
              ref={emailInputRef}
              onChange={e => email.onChange(e)}
              value={email.value}
              onBlur={e => email.onBlur(e)}
              name="email"
              type="email"
              placeholder="Email"
              className="input email "/>
            <div className="icon">
              <i className="pi pi-at"/>
            </div>
          </div>
          <div className="errorBox">
            {(email.isDirty && email.isEmpty) && <div
              className="error form__error"
            >Email cannot be empty</div>}
            {(email.isDirty && email.emailError) &&
                            <div className="error form__error">
                                Email is not correct</div>}
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <input
              onChange={e => password.onChange(e)}
              onBlur={e => password.onBlur(e)}
              value={password.value}
              name="password"
              type="password"
              placeholder="Password"
              className="input password"
            />
            <div className="icon">
              <span
                className="toggle-btn"
                onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
                {inputType === 'password' ?
                  <i className="pi pi-eye"/> : <i className="pi pi-eye-slash"/>}
              </span>
            </div>
          </div>
          {(password.isDirty && password.isEmpty) &&
                        <div className="error form__error">Password cannot be empty</div>}
        </div>
        <button
          className="button submit"
          disabled={!formValid}
          type="submit">Login
        </button>
        <div className="register loginBasic__register">
          <span>Don't have an account?</span>
          <a href="/">Register</a>
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
    </div>
  );
};

export default LoginCustomHook;
