import React from 'react';
import moment from 'moment';

import classes from './ReportsTable.module.css';

const ReportsTable = (props) => {
  if (props.filteredParcels) {
    props.filteredParcels.sort((a, b) => {
      return moment(a.lastAction, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(b.lastAction, 'DD/MM/YYYY HH:mm:ss')
      );
    });
  }

  return (
    <>
      {props.filteredParcels && (
        <div ref={props.componentRef} className={classes.tablewrap}>
          <div
            className={classes.details}
          >{`Total Parcels : ${props.filteredParcels.length}`}</div>
          <table className={classes['content-table']}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Barcode</th>
                <th>Created At</th>
                <th>Released At</th>
                <th>Returned</th>
              </tr>
            </thead>
            <tbody>
              {props.filteredParcels.map((parcel) => {
                return (
                  <tr key={parcel._id}>
                    <td>{parcel.company}</td>
                    <td>{parcel.barcode}</td>
                    <td>{parcel.createdAt}</td>
                    <td>{parcel.releasedAt}</td>
                    <td>{parcel.returned ? 'YES' : 'NO'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default React.memo(ReportsTable);
