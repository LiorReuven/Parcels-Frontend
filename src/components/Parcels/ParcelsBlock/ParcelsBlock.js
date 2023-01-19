import React from 'react';
import { useSelector } from 'react-redux';
import Parcel from '../Parcel/Parcel';

import classes from './ParcelsBlock.module.css';

const ParcelsBlock = (props) => {
  const stockParcels = useSelector((state) => state.allParcels.stockParcels);

  let stockParcelsArray = [];

  stockParcelsArray = stockParcels.filter(
    (parcel) => parcel.position.trim().toUpperCase() === props.name
  );

  

  //Save to redux adding (highlight property), saved to: stockparcels

  if (props.findBarcodeInput && props.findBarcodeInput.length > 2) {
    //number till highlighted
    stockParcelsArray = stockParcelsArray.map((parcel) => {
      if (
        parcel.barcode
          .toUpperCase()
          .includes(props.findBarcodeInput.toUpperCase()) &&
        parcel.isOnStock === true
      ) {
        return { ...parcel, highlight: true };
      } else {
        return { ...parcel, highlight: false };
      }
    });
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div
          style={{ backgroundColor: props.color }}
          className={classes['title-div']}
        >
          <div className={`${classes.amount} ${classes.firsttitle}`}>
            {stockParcelsArray.length}
          </div>
          <h3 className={classes.firsttitle}>
            {stockParcelsArray.length > 0 && stockParcelsArray[0].company}
          </h3>
          <h3 className={classes.firsttitle}>{props.name}</h3>
        </div>
        <div
          style={{ backgroundColor: props.color }}
          className={classes.container}
        >
          {stockParcelsArray.map((parcel) => (
            <Parcel
              setNotification={props.setNotification}
              key={parcel._id}
              _id={parcel._id}
              barcode={parcel.barcode}
              position={parcel.position}
              company={parcel.company}
              createdAt={parcel.createdAt}
              releasedAt={parcel.releasedAt}
              highlight={parcel.highlight ? true : false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ParcelsBlock;
