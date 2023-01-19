import React, { useState, useContext, useMemo } from 'react';
import moment from 'moment';
import { unwrapResult } from '@reduxjs/toolkit';

import { useSelector, useDispatch } from 'react-redux';

//Socket
import { SocketContext } from '../../context/socket';

//Thunk
import { deleteParcel, returnParcel } from '../../store/allParcels-thunk';

import ParcelElement from './ParcelElement/ParcelElement';
import classes from './Search.module.css';
import SearchBar from './SearchBar/SearchBar';
import SideBar from './SideBar/SideBar';
import SuccessAlert from '../UI/Notifications/SuccessAlert';
import FailedAlert from '../UI/Notifications/FailedAlert';
import PracConfModal from '../UI/Modals/PracConfModal/PracConModal';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [pointedParcel, setPointedParcel] = useState({});

  const [isDelete, setIsDelete] = useState(false);

  const [notification, setNotification] = useState({});

  const allParcels = useSelector((state) => state.allParcels.allParcels);

  console.log('rendered');

  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const sortedAllParcels = useMemo(() => {
    return [...allParcels].sort((a, b) =>
      moment(b.lastAction, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(a.lastAction, 'DD/MM/YYYY HH:mm:ss')
      )
    );
  }, [allParcels]);

  const onDeleteButton = (pointedAtParcel) => {
    setPointedParcel({ ...pointedAtParcel });
    setNotification({});
    setShowModal(true);
    setIsDelete(true);
  };

  const onReturnButton = (pointedAtParcel) => {
    setPointedParcel({ ...pointedAtParcel });
    setNotification({});
    setShowModal(true);
    setIsDelete(false);
  };

  const onConfirmationButton = () => {
    if (isDelete) {
      dispatch(deleteParcel({ _id: pointedParcel._id }))
        .then(unwrapResult)
        .then((result) => {
          setNotification({ ...result, canShow: true });
          if (!result.invalid) {
            socket.emit('request_fetch');
          }
          setShowModal(false);
          setSearchTerm('');
        });
    } else if (!isDelete) {
      dispatch(
        returnParcel({ _id: pointedParcel._id, company: pointedParcel.company })
      )
        .then(unwrapResult)
        .then((result) => {
          setNotification({ ...result, canShow: true });
          if (!result.invalid) {
            socket.emit('request_fetch');
          }
          setShowModal(false);
          setSearchTerm('');
        });
    }
  };

  const onCancelButton = () => {
    setShowModal(false);
  };

  let filteredArray = [];

  if (searchTerm === '' || searchTerm.length < 1) {
    //Search limit before sorting
    filteredArray = sortedAllParcels.slice(0, 11);
  } else if (searchTerm.length >= 6) {
    filteredArray = sortedAllParcels.filter((item) => {
      return item.barcode.toUpperCase().includes(searchTerm.toUpperCase());
    });
  } else {
    filteredArray = sortedAllParcels.slice(0, 11);
  }

  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <SearchBar
          setNotification={setNotification}
          setSearchTerm={setSearchTerm}
        />
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
        {filteredArray.map((parcel) => {
          return (
            <ParcelElement
              onReturnButton={onReturnButton}
              onDeleteButton={onDeleteButton}
              key={parcel._id}
              _id={parcel._id}
              createdAt={parcel.createdAt}
              barcode={parcel.barcode}
              position={parcel.position}
              company={parcel.company}
              releasedAt={parcel.releasedAt}
              returned={parcel.returned}
            />
          );
        })}
      </div>
      <div className={classes['sidebar-area']}>
        <SideBar />
      </div>
      {showModal && (
        <PracConfModal
          setShowModal={setShowModal}
          title={
            isDelete
              ? 'Are you sure you want to Delete?'
              : 'Return parcel back to the company?'
          }
          onConfirmationButton={onConfirmationButton}
          onCancelButton={onCancelButton}
          createdAt={pointedParcel.createdAt}
          barcode={pointedParcel.barcode}
          position={pointedParcel.position}
          company={pointedParcel.company}
          releasedAt={pointedParcel.releasedAt}
        />
      )}
    </div>
  );
};

export default Search;
