import React from 'react';
import ParcelCategory from './ParcelCategory/ParcelCategory';

import classes from './ParcelElement.module.css';

const ParcelElement = (props) => {
  const deleteButtonHandler = () => {
    props.onDeleteButton({
      _id: props._id,
      barcode: props.barcode,
      createdAt: props.createdAt,
      position: props.position,
      company: props.company,
      releasedAt: props.releasedAt,
      returned: props.returned,
    });
  };

  const returnButtonHandler = () => {
    props.onReturnButton({
      _id: props._id,
      barcode: props.barcode,
      createdAt: props.createdAt,
      position: props.position,
      company: props.company,
      releasedAt: props.releasedAt,
      returned: props.returned,
    });
  };

  return (
    <div className={classes.card}>
      <ParcelCategory title="Created" info={props.createdAt} />
      <ParcelCategory title="Barcode" info={props.barcode} />
      <ParcelCategory title="Position" info={props.position} />
      <ParcelCategory title="Company" info={props.company} />
      <ParcelCategory title="Released" info={props.releasedAt} />
      <div className={classes['btn-div']}>
        <button
          onClick={returnButtonHandler}
          type="button"
          className={classes.btn}
        >
          החזרה לשליח
        </button>
        <button
          onClick={deleteButtonHandler}
          type="button"
          className={classes.btn}
        >
          מחיקה מהמאגר
        </button>
      </div>
    </div>
  );
};

export default ParcelElement;
