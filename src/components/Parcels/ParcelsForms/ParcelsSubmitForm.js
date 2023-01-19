import React, { useState, useRef, useContext } from 'react';
import moment from 'moment-timezone';
import { useDispatch } from 'react-redux';

import Button from '../../UI/Button/Button';
import classes from './ParcelsSubmitForm.module.css';

//Thunk Actions
import { createParcel } from '../../../store/allParcels-thunk';

//Redux actions
import { unwrapResult } from '@reduxjs/toolkit';

// Socket.io
import { SocketContext } from '../../../context/socket';

const ParcelsSubmitForm = (props) => {
  const socket = useContext(SocketContext);

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [enteredSection, setEnteredSection] = useState('PINK1');
  const [enteredBarcode, setEnteredBarcode] = useState('');
  const enteredCompany = useRef();

  const sectionSelectHandler = (event) => {
    setEnteredSection(event.target.value.trim().toUpperCase());
  };

  const barcodeInputHandler = (event) => {
    setEnteredBarcode(event.target.value.trim().toUpperCase());
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (props.allStorages.some((storage) => storage.name === enteredBarcode)) {
      setEnteredSection(enteredBarcode);
      setEnteredBarcode('');
      return;
    }

    console.log('im on');

    const parcel = {
      barcode: enteredBarcode,
      position: enteredSection,
      company: enteredCompany.current.value.trim().toUpperCase(),
      isOnStock: true,
      createdAt: moment.tz('Asia/Jerusalem').format('DD/MM/YYYY HH:mm:ss'),
    };

    if (enteredBarcode.length >= 4) {
      dispatch(createParcel(parcel))
        .then(unwrapResult)
        .then((result) => {
          props.setNotification({ ...result, canShow: true }); //CARE EXTRA REFRESH
          if (!result.invalid) {
            socket.emit('request_fetch');
          }
          setError(result.invalid);
        });
    } else {
      props.setNotification({
        invalid: 'Enter atleast 4 characters',
        canShow: true,
      });
      setError('Enter atleast 4 characters');
    }

    setEnteredBarcode('');
  };

  return (
    <>
      <form onSubmit={submitHandler} className={classes['submit-form']}>
        <h1 className={classes['form-title']}>קבלת חבילות</h1>
        <fieldset>
          <legend>Company</legend>
          <select
            ref={enteredCompany}
            id="company"
            className={classes['select']}
          >
            <option value="Option1">Option1</option>
            <option value="Option2">Option2</option>
            <option value="Option3">Option3</option>
            <option value="Option4">Option4</option>
            <option value="Option5">Option5</option>
            <option value="Option6">Option6</option>
            <option value="Option7">Option7</option>
            <option value="Option8">Option8</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Section</legend>
          <select
            onChange={sectionSelectHandler}
            value={enteredSection}
            id="section"
            className={classes['select']}
          >
            {props.allStorages.map((storage) => {
              return (
                <option
                  key={storage._id}
                  style={{ backgroundColor: storage.color }}
                  className={classes.option}
                  value={storage.name}
                >
                  {storage.name}
                </option>
              );
            })}
          </select>
        </fieldset>
        <label className={classes['barcode-label']} htmlFor="barcode">
          BARCODE
        </label>
        <input
          onChange={barcodeInputHandler}
          value={enteredBarcode}
          className={classes['barcode-input']}
          type="text"
          id="barcode"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default ParcelsSubmitForm;
