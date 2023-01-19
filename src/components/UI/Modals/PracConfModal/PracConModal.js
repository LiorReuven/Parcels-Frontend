import React from 'react';
import ReactDOM from 'react-dom';

import classes from './PracConfModal.module.css';
import PracConfModalOverlay from './PracConfModalOverlay/PracConfModalOverlay';

const portalElement = document.getElementById('overlays');

const Backdrop = (props) => {
  const onBackdropClick = () => {
    props.setShowModal(false);
  };

  return <div className={classes.backdrop} onClick={onBackdropClick} />;
};

const PracConfModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop setShowModal={props.setShowModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <PracConfModalOverlay
          title={props.title}
          onConfirmationButton={props.onConfirmationButton}
          onCancelButton={props.onCancelButton}
          _id={props._id}
          barcode={props.barcode}
          position={props.position}
          company={props.company}
          createdAt={props.createdAt}
          releasedAt={props.releasedAt}
          setShowModal={props.setShowModal}
        />,
        portalElement
      )}
    </>
  );
};

export default PracConfModal;
