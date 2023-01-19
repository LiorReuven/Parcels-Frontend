import React, { useEffect } from 'react';
import classes from './StoragesPage.module.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchStorages,
  deleteStorage,
} from '../../store/Storages/storage-thunk';
import { unwrapResult } from '@reduxjs/toolkit';

const StoragesPage = () => {
  const allStorages = useSelector((state) => state.storages.allStorages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStorages());
  }, [dispatch]);

  const onStorageDelete = (_id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteStorage(_id))
        .then(unwrapResult)
        .then((result) => {
          if (!result.invalid) {
            toast.success(result.valid, { theme: 'colored', autoClose: 1500 });
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
      <table className={classes['content-table']}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allStorages.map((storage, index) => {
            return (
              <tr key={storage._id}>
                <td>{storage.position}</td>
                <td style={{ color: storage.color }}>{storage.name}</td>
                <td style={{ color: storage.color }}>{storage.color}</td>
                <td>
                  <Link
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                    to={`edit/${storage._id}`}
                  >
                    <FaEdit className={classes.icon} />
                  </Link>
                  <MdDelete
                    onClick={() => onStorageDelete(storage._id, storage.name)}
                    className={classes.icon}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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

export default StoragesPage;
