import { useState } from 'react';

import useValidation from './useValidation';

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const emailError = useValidation(value, validations);
  const passwordError = useValidation(value, validations);
  const valid = useValidation(value, validations);

  const [error, setError] = useState(false);

  const validate = (value) => {
    for (const validation in validations) {
      switch (validation) {
      case 'isEmpty':
        if (validations[validation] && !value) {
          setError(true);

          return;
        }

        break;
      case 'emailError':
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (validations[validation] && !regExp.test(String(value).toLowerCase())) {
          setError(true);

          return;
        }

        break;
      case 'passwordError':
        if (validations[validation] && !value) {
          setError(true);

          return;
        }

        break;
      }
    }

    setError(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    setIsDirty(true);
    validate(e.target.value);
  };

  const onBlur = (e) => {
    setIsDirty(true);
    validate(e.target.value);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    emailError,
    passwordError,
    error,
    ...valid,

  };
};

export default useInput;
