import './LoginFormAll.scss';
import { useState } from 'react';

import Card from '../UI/Card';
import LoginBasic from '../LoginBasic/LoginBasic';
import LoginCustomHook from '../LoginCustomHook/LoginCustomHook';
import LoginHookForm from '../LoginHookForm/LoginHookForm';

const LoginFormAll = (props) => {
  const [loginBasic, setLoginBasic] = useState(false);
  const [loginCustomHook, setLoginCustomHook] = useState(false);
  const [loginHookForm, setLoginHookForm] = useState(false);

  const setAuthBasicHandler = () => {
    setLoginBasic(!loginBasic);
    if (!loginBasic) {
      setLoginCustomHook(false);
      setLoginHookForm(false);
    }
  };

  const setLoginCustomHookHandler = () => {
    setLoginCustomHook(!loginCustomHook);
    if (!loginCustomHook) {
      setLoginBasic(false);
      setLoginHookForm(false);
    }
  };

  const setLoginHookFormHandler = () => {
    setLoginHookForm(!loginHookForm);
    if (!loginHookForm) {
      setLoginBasic(false);
      setLoginCustomHook(false);
    }
  };

  return (
    <div className="loginFormAll">
      <Card className="group loginFormAll__group loginFormAll__group_light">
        <button
          className={loginBasic ? 'button active' : ' button'}
          onClick={setAuthBasicHandler}>Login Basic
        </button>
        <button
          className={loginCustomHook ? 'button active' : 'button'}
          onClick={setLoginCustomHookHandler}>Login Custom Hook
        </button>
        <button
          className={loginHookForm ? 'button active' : 'button'}
          onClick={setLoginHookFormHandler}>Login Hook Form
        </button>
      </Card>
      {loginBasic &&
                <Card className="group loginFormAll__group loginFormAll__group_dark">
                  <LoginBasic/>
                </Card>
      }
      {loginCustomHook &&
                <Card className="group loginFormAll__group loginFormAll__group_dark">
                  <LoginCustomHook/>
                </Card>
      }
      {loginHookForm &&
                <Card className="group loginFormAll__group loginFormAll__group_dark">
                  <LoginHookForm/>
                </Card>
      }
    </div>
  );
};

export default LoginFormAll;
