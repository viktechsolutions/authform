import './LoginHookForm.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Popup from '../Popup/Popup';

const LoginHookForm = ( => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const [inputType, setInputType] = useState('password');
  const [popup, setPopup] = useState(false);
  const [popupError, setPopupError] = useState(false);

  const onSubmit = (data) => {
    fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setPopup(true);
        }
      })
      .catch((err) => {
        if (err) {
          setPopupError(true);
        }
      });

    reset();
  };

  return (
    <div className="loginHookForm">
      <h1>Login</h1>
      <form
        className="form loginHookForm__form"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="email">Email
            <input
              className="input email"
              name="email"
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            <div className="icon">
              <i className="pi pi-at"/>
            </div>
            {errors?.email && <div className="error form__error">{errors?.email?.message || 'Error'}</div>}
          </label>
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <label htmlFor="email">Password</label>
            <input
              autoComplete="off"
              type={inputType}
              className="input password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            <div className="icon">
              <span
                className="toggle-btn"
                onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
                {inputType === 'password' ? <i className="pi pi-eye"/> : <i className="pi pi-eye-slash"/>}
              </span>
            </div>
            {errors?.password &&
                            <div className="error form__error">{errors?.password?.message || 'Error'}</div>}
          </div>
        </div>
        <button
          className="button submit"
          type="submit"
          disabled={!isValid}>Login
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

export default LoginHookForm;
