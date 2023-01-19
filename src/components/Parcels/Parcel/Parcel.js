import React, { useState, useContext } from 'react';

import classes from './Parcel.module.css';

//Redux
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

//Thunk
import { unStockParcel } from '../../../store/allParcels-thunk';

//Socket
import { SocketContext } from '../../../context/socket';

//Components
import PracConfModal from '../../UI/Modals/PracConfModal/PracConModal';

const Parcel = (props) => {
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const [showModal, setShowModal] = useState(false);

  const DeleteHandler = () => {
    props.setNotification({});
    setShowModal(true);
  };

  const onConfirmationButton = () => {
    dispatch(unStockParcel({ barcode: props.barcode, _id: props._id }))
      .then(unwrapResult)
      .then((result) => {
        props.setNotification({ ...result, canShow: true });
        const currentUser = result.mongoCurrentParcel;
        console.log(currentUser);
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
            case 'EPO':
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
    <div className={classes['input-wrapper']}>
      <input
        className={`${classes['barcode-input']} ${
          props.highlight ? classes.highlight : ''
        }`}
        type="text"
        id="barcode"
        value={props.barcode}
        readOnly
        title={props.barcode}
      />
      <div>
        <button
          onClick={DeleteHandler}
          className={classes['btn']}
          type="button"
        ></button>
      </div>
      {showModal && (
        <PracConfModal
          setShowModal={setShowModal}
          title="Parcel release confirmation,RECHECK!"
          onConfirmationButton={onConfirmationButton}
          onCancelButton={onCancelButton}
          _id={props._id}
          barcode={props.barcode}
          position={props.position}
          company={props.company}
          createdAt={props.createdAt}
          releasedAt={props.releasedAt}
        />
      )}
    </div>
  );
};

export default Parcel;
