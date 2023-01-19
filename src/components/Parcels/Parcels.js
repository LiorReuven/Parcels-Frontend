import React, { useState } from 'react';

//REDUX
import { useSelector } from 'react-redux';

//COMPONENT IMPORTS
import classes from './Parcels.module.css';
import ParcelsSubmitForm from './ParcelsForms/ParcelsSubmitForm';
import ParcelsBlock from './ParcelsBlock/ParcelsBlock';
import ParcelsFindForm from './ParcelsForms/ParcelsFindForm';
import ParcelsUpdateForm from './ParcelsForms/ParcelsUpdateForm';
import SuccessAlert from '../UI/Notifications/SuccessAlert';
import FailedAlert from '../UI/Notifications/FailedAlert';

const Parcels = () => {
  console.log('parcels refreshed');

  const [notification, setNotification] = useState({});

  const stockAmount = useSelector((state) => state.allParcels.stockAmount);

  const allStorages = useSelector((state) => state.storages.allStorages);

  const [findBarcodeInput, setFindBarcodeInput] = useState('');

  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showFindForm, setShowFindForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const showFindFormHandler = () => {
    setShowFindForm((prevState) => !prevState);
    setNotification({});
  };

  const showSubmitFormHandler = () => {
    setShowSubmitForm((prevState) => !prevState);
    setNotification({});
  };

  const showUpdateFormHandler = () => {
    setShowUpdateForm((prevState) => !prevState);
    setNotification({});
  };

  return (
    <>
      <section id="blocks-section" className={classes['blocks-section']}>
        {allStorages.map((storage) => {
          return (
            <ParcelsBlock
              key={storage._id}
              findBarcodeInput={findBarcodeInput}
              setFindBarcodeInput={setFindBarcodeInput}
              setNotification={setNotification}
              notification={notification}
              name={storage.name}
              color={storage.color}
            />
          );
        })}
      </section>
      <section className={classes['forms-section']}>
        <h1 className={classes['forms-section-title']}>
          Parcels:<span className={classes['count']}> {stockAmount}</span>
        </h1>
        <div className={classes['forms-div']}>
          <button
            className={`${classes['toggle-button']} ${
              showFindForm ? classes.on : ''
            }`}
            onClick={showFindFormHandler}
            type="button"
          >
            {showFindForm ? 'Hide' : 'Find'}
          </button>
          {showFindForm && (
            <ParcelsFindForm
              setNotification={setNotification}
              findBarcodeInput={findBarcodeInput}
              setFindBarcodeInput={setFindBarcodeInput}
            />
          )}
          <button
            className={`${classes['toggle-button']} ${
              showSubmitForm ? classes.on : ''
            }`}
            onClick={showSubmitFormHandler}
            type="button"
          >
            {showSubmitForm ? 'Hide' : 'Recieve'}
          </button>
          {showSubmitForm && (
            <ParcelsSubmitForm
              allStorages={allStorages}
              setNotification={setNotification}
              notification={notification}
            />
          )}
          <button
            className={`${classes['toggle-button']} ${
              showUpdateForm ? classes.on : ''
            }`}
            onClick={showUpdateFormHandler}
            type="button"
          >
            {showUpdateForm ? 'Hide' : 'Update'}
          </button>
          {showUpdateForm && (
            <ParcelsUpdateForm
              allStorages={allStorages}
              setNotification={setNotification}
              notification={notification}
            />
          )}
        </div>
      </section>
      <div className={classes['alert-div']}>
        {'valid' in notification && notification.canShow && (
          <SuccessAlert setNotification={setNotification}>
            {notification.valid}
          </SuccessAlert>
        )}
        {notification.hasOwnProperty('invalid') && notification.canShow && (
          <FailedAlert setNotification={setNotification}>
            {notification.invalid}
          </FailedAlert>
        )}
      </div>
    </>
  );
};

export default Parcels;
