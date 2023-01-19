import React from 'react';

import classes from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';

const Login = () => {
  return (
    <div className={classes['login-container']}>
      <LoginForm />
    </div>
  );
};

export default Login;
