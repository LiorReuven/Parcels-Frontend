import React, { useEffect, useState } from 'react';
import ColorPicker from '../../components/UI/ColorPicker/ColorPicker';
import classes from './CreateStoragePage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {
  createStorage,
  updateStorage,
} from '../../store/Storages/storage-thunk';

const CreateStoragePage = () => {
  const allStorages = useSelector((state) => state.storages.allStorages);

  const [color, setColor] = useState('#000000');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      const chosenStorage = allStorages.find(
        (storage) => params.id === storage._id
      );
      if (chosenStorage) {
        setName(chosenStorage.name);
        setColor(chosenStorage.color);
        setPosition(chosenStorage.position);
      }
    }
  }, [params.id, allStorages]);

  const handleNameInput = (e) => {
    setName(e.target.value.trim());
  };

  const handleColorInput = (e) => {
    setColor(e.target.value.trim());
  };

  const handlePositionInput = (e) => {
    setPosition(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !color || !position) {
      toast.error('Must fill the entire form', { theme: 'colored' });
      return;
    }

    if (params.id) {
      const updatedStorage = {
        name: name.toString().trim().toUpperCase(),
        color: color.trim(),
        position: position,
        _id: params.id,
      };

      dispatch(updateStorage(updatedStorage))
        .then(unwrapResult)
        .then((result) => {
          if (!result.invalid) {
            toast.success(result.valid, { theme: 'colored', autoClose: 1500 });
            setTimeout(() => {
              navigate('/dashboard/storages', { replace: true });
            }, 1500);
          } else if (result.invalid) {
            toast.error(result.invalid, { theme: 'colored' });
          } else {
            toast.error('Uknown error occured', { theme: 'colored' });
          }
        });
    } else {
      const storage = {
        name: name.toString().trim().toUpperCase(),
        color: color.trim(),
        position: position.trim(),
      };

      dispatch(createStorage(storage))
        .then(unwrapResult)
        .then((result) => {
          if (!result.invalid) {
            toast.success(result.valid, { theme: 'colored', autoClose: 1500 });
            setTimeout(() => {
              navigate('/dashboard/storages', { replace: true });
            }, 1500);
          } else if (result.invalid) {
            toast.error(result.invalid, { theme: 'colored' });
          } else {
            toast.error('Uknown error occured', { theme: 'colored' });
          }
        });
    }
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1 className={classes.h1}>
          {params.id ? 'Storage Update' : 'Storage Creation'}
        </h1>

        <label className={classes.label}>Name:</label>
        <input
          className={classes.input}
          type="text"
          name="name"
          placeholder="Enter a name"
          onChange={handleNameInput}
          value={name}
        ></input>

        <label className={classes.label}>Color:</label>
        <ColorPicker value={color} onChange={handleColorInput} />

        <label className={classes.label}>Position:</label>
        <input
          className={classes.input}
          type="number"
          name="name"
          placeholder="Enter position number"
          onChange={handlePositionInput}
          value={position}
        ></input>

        <button type="submit" className={classes.button}>
          {params.id ? 'Update' : 'Create'}
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CreateStoragePage;
