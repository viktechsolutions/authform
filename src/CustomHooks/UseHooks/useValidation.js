import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // const [inputValid, setInputValid] = useState(false);
  // const [inputError, setInputError] = useState('');

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
      case 'isEmpty':
        value ? setEmpty(false) : setEmpty(true);

        break;
      case 'emailError':
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regExp.test(String(value).toLowerCase())) {
          setEmailError(false);
        } else {
          setEmailError(true);
        }

        break;
      case 'passwordError':
        if (value) {
          setPasswordError(false);
        } else {
          setPasswordError(true);
        }

        break;
      }
    }
  }, [value, validations]);

  return {
    isEmpty,
    emailError,
    passwordError,
  };
};

export default useValidation;
