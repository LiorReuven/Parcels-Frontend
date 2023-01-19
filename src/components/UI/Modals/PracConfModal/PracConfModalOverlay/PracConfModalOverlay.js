import React from 'react'

import classes from './PracConfModalOverlay.module.css'

import ParcelCategory from '../../../../Search/ParcelElement/ParcelCategory/ParcelCategory'

const PracConfModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <h1 className={classes.title}>{props.title}</h1>
      <div className={classes.card}>
      <ParcelCategory title='Created'  info={props.createdAt}></ParcelCategory>
      <ParcelCategory title='Barcode'  info={props.barcode}></ParcelCategory>
      <ParcelCategory title='Position' info={props.position}></ParcelCategory>
      <ParcelCategory title='Company'  info={props.company}></ParcelCategory>
      <ParcelCategory title='Released' info={props.releasedAt}></ParcelCategory>
      </div>
      <div className={classes['confirmation-btn-box']}>
        <button
          onClick={props.onConfirmationButton}
          className={classes['confirmation-btn']}
          type="button"
        >
          Confirm
        </button>
        <button
          className={`${classes['confirmation-btn']} ${classes.cancel}`}
          type="button"
          onClick={props.onCancelButton}
        >
          cancel
        </button>
      </div>
    </div>
  )
}

export default PracConfModalOverlay