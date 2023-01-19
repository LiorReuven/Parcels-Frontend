import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';

//Redux
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

//Thunk
import { unStockParcel } from '../../../store/allParcels-thunk';

//Socket
import { SocketContext } from '../../../context/socket';

import classes from './ParcelsFindForm.module.css';
import Button from '../../UI/Button/Button';

import PracConfModal from '../../UI/Modals/PracConfModal/PracConModal';

const ParcelsFindForm = (props) => {
  const stockParcels = useSelector((state) => state.allParcels.stockParcels);

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentParcel, setCurrentParcel] = useState(false);

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);


  const findInputHandler = (event) => {
    props.setFindBarcodeInput(event.target.value.trim().toUpperCase());
    props.setNotification({ canShow: false });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let sortedByDuplication;

    if (props.findBarcodeInput.length >= 4) {
      sortedByDuplication = stockParcels.filter((parcel) => {
        return (
          parcel.barcode
            .toUpperCase()
            .includes(props.findBarcodeInput.toUpperCase()) &&
          parcel.isOnStock === true
        );
      });
    } else {
      setError('Insert atleast 4 characters');
      props.setNotification({
        invalid: 'Insert atleast 4 characters',
        canShow: true,
      });
      return;
    }

    if (!sortedByDuplication || sortedByDuplication.length === 0) {
      setError('Parcel doesnt exist');
      props.setNotification({ invalid: 'Parcel doesnt exist', canShow: true });
      return;
    } else if (sortedByDuplication.length === 1) {
      setShowModal(true);
      setCurrentParcel({ ...sortedByDuplication[0] });
      setError(false);
      props.setNotification({});
    } else {
      setError('Cannot release multiple parcels at once');
      props.setNotification({
        invalid: 'Cannot release multiple parcels at once',
        canShow: true,
      });
      return;
    }

    props.setFindBarcodeInput(''); //rerenders parcels
  };

  const onConfirmationButton = () => {
    dispatch(
      unStockParcel({ barcode: currentParcel.barcode, _id: currentParcel._id })
    )
      .then(unwrapResult)
      .then((result) => {
        props.setNotification({ ...result, canShow: true });
        const currentUser = result.mongoCurrentParcel;
        setShowModal(false);
        if (!result.invalid) {
          switch (currentUser.company) {
            case 'placeholder':
              window.open(
                `companyurl`
              );
              break;
            case 'placeholder1':
              window.open(
                `companyurl`
              );
              break;
            case 'placeholder2':
              window.open(
                `companyurl`
              );
              break;
            case 'placeholder3':
              window.open(
                `companyurl`
              );
              break;
            case 'placeholder4':
              window.open(
                `companyurl`
              );
              break;
            case 'placeholder5':
              navigator.clipboard.writeText(currentUser.barcode).then(() => {
                window.open(
                  `companyurl`
                );
              });
              break;
            default:
              break;
          }
          socket.emit('request_fetch'); // only if parcel was unstocked(might need to change)
        }
      });
  };

  const onCancelButton = () => {
    props.setNotification({});
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={submitHandler} className={classes['search-form']}>
        <h1 className={classes['form-title']}>שחרור חבילות</h1>
        <label className={classes['barcode-label']} htmlFor="barcode">
          BARCODE
        </label>
        <input
          onChange={findInputHandler}
          className={classes['barcode-input']}
          type="text"
          id="barcode"
          value={props.findBarcodeInput}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Submit</Button>
      </form>
      {showModal && (
        <PracConfModal
          title="Parcel release confirmation,RECHECK!"
          onConfirmationButton={onConfirmationButton}
          onCancelButton={onCancelButton}
          _id={currentParcel._id}
          barcode={currentParcel.barcode}
          position={currentParcel.position}
          company={currentParcel.company}
          createdAt={currentParcel.createdAt}
          releasedAt={currentParcel.releasedAt}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default ParcelsFindForm;
