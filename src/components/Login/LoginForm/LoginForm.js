import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';

import { fetchAllParcels } from '../../../store/allParcels-thunk';
import { fetchStorages } from '../../../store/Storages/storage-thunk';

import { login } from '../../../store/auth-thunk';

import classes from './LoginForm.module.css';
import Button from '../../UI/Button/Button';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notification, setNotification] = useState({});
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const userNameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      userName: enteredUserName,
      password: enteredPassword,
    };

    if (enteredPassword.length < 4 || enteredUserName.length < 2) {
      return setNotification({ invalid: 'Invalid credentials' });
    }

    dispatch(login(userData))
      .then(unwrapResult)
      .then((result) => {
        setNotification({ ...result });
        if (result.token) {
          dispatch(fetchAllParcels());
          dispatch(fetchStorages());
          navigate('/parcels', { replace: true });
        } else {
          setEnteredUserName('');
          setEnteredPassword('');
        }
      });
  };

  return (
    <form onSubmit={submitHandler} className={classes['login-form']}>
      <h1 className={classes['login-title']}>Admin Login</h1>
      <label className={classes['username-label']} htmlFor="username">
        User Name:{' '}
      </label>
      <input
        value={enteredUserName}
        onChange={userNameChangeHandler}
        className={classes['username-input']}
        type="text"
        id="username"
      />
      <label className={classes['password-label']} htmlFor="password">
        Password:{' '}
      </label>
      <input
        value={enteredPassword}
        onChange={passwordChangeHandler}
        className={classes['password-input']}
        type="password"
        id="password"
      />
      <Button type="submit">Login</Button>
      {notification.hasOwnProperty('invalid') && (
        <h2 className={classes.error}>{notification.invalid}</h2>
      )}
    </form>
  );
};

export default LoginForm;
