import React, { useState, useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';

import classes from './ParcelsUpdateForm.module.css';
import Button from '../../UI/Button/Button';

//THUNK Actions
import { updateParcel } from '../../../store/allParcels-thunk';

//Redux Actions
import { unwrapResult } from '@reduxjs/toolkit';

//Socket.io
import { SocketContext } from '../../../context/socket';

const ParcelsUpdateForm = (props) => {
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

    if (enteredBarcode.length >= 4) {
      dispatch(
        updateParcel({
          oldBarcode: enteredBarcode.toUpperCase(),
          newPosition: enteredSection,
          newCompany: enteredCompany.current.value.trim().toUpperCase(),
        })
      )
        .then(unwrapResult)
        .then((result) => {
          props.setNotification({ ...result, canShow: true }); 
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
        <h1 className={classes['form-title']}>עדכון חבילות</h1>
        <fieldset className={classes['company-fieldset']}>
          <legend>Company</legend>
          <select
            defaultValue="NONE"
            ref={enteredCompany}
            id="company"
            className={classes['select']}
          >
            <option className={classes.none} value="NONE">
              None
            </option>
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

export default ParcelsUpdateForm;
