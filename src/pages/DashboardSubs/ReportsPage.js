import React, { useState, useRef } from 'react';
import ReportsTable from '../../components/Dashboard/ReportsTable/ReportsTable';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { MdPrint } from 'react-icons/md';

import moment from 'moment';

import classes from './ReportsPage.module.css';

const Reports = () => {
  const allParcels = useSelector((state) => state.allParcels.allParcels);

  const [filteredParcels, setFilteredParcels] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [company, setCompany] = useState('all');
  const [returned, setReturned] = useState('false');

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const startDateHandler = (e) => {
    setStartDate(e.target.value);
  };

  const endDateHandler = (e) => {
    setEndDate(e.target.value);
  };

  const companyHandler = (e) => {
    setCompany(e.target.value);
  };

  const returnedHandler = (e) => {
    setReturned(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const parcels = allParcels.filter((parcel) => {
      const releasedFormatted = moment(
        parcel.lastAction.split(' ')[0],
        'DD-MM-YYYY'
      );

      if (company === 'all' && returned !== 'all') {
        return moment(startDate, 'YYYY-MM-DD').isSameOrBefore(
          releasedFormatted
        ) &&
          moment(endDate, 'YYYY-MM-DD').isSameOrAfter(releasedFormatted) &&
          returned === parcel.returned.toString() &&
          !parcel.isOnStock
          ? true
          : false;
      } else if (company !== 'all' && returned === 'all') {
        return moment(startDate, 'YYYY-MM-DD').isSameOrBefore(
          releasedFormatted
        ) &&
          moment(endDate, 'YYYY-MM-DD').isSameOrAfter(releasedFormatted) &&
          company === parcel.company &&
          !parcel.isOnStock
          ? true
          : false;
      } else if (company === 'all' && returned === 'all') {
        return moment(startDate, 'YYYY-MM-DD').isSameOrBefore(
          releasedFormatted
        ) &&
          moment(endDate, 'YYYY-MM-DD').isSameOrAfter(releasedFormatted) &&
          !parcel.isOnStock
          ? true
          : false;
      } else {
        return moment(startDate, 'YYYY-MM-DD').isSameOrBefore(
          releasedFormatted
        ) &&
          moment(endDate, 'YYYY-MM-DD').isSameOrAfter(releasedFormatted) &&
          company === parcel.company &&
          returned === parcel.returned.toString() &&
          !parcel.isOnStock
          ? true
          : false;
      }
    });

    setFilteredParcels(parcels);
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.category}>
          <label className={classes.label}>Company</label>
          <select
            value={company}
            onChange={companyHandler}
            className={classes.input}
            id="company"
          >
            <option value="Option1">Option1</option>
            <option value="Option2">Option2</option>
            <option value="Option3">Option3</option>
            <option value="Option4">Option4</option>
            <option value="Option5">Option5</option>
            <option value="Option6">Option6</option>
            <option value="Option7">Option7</option>
            <option value="Option8">Option8</option>
          </select>
        </div>
        <div className={classes.category}>
          <label className={classes.label}>Start Date</label>
          <input
            className={classes.input}
            onChange={startDateHandler}
            type="date"
            value={startDate}
            name="start-date"
            min="2022-05-01"
            max={today}
          />
        </div>
        <div className={classes.category}>
          <label className={classes.label}>End Date</label>
          <input
            className={classes.input}
            onChange={endDateHandler}
            type="date"
            value={endDate}
            name="end-date"
            min={startDate}
            max={today}
          />
        </div>
        <div className={classes.category}>
          <label className={classes.label}>Returned ?</label>
          <select
            value={returned}
            onChange={returnedHandler}
            className={classes.input}
            id="returned"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
            <option value="all">All</option>
          </select>
        </div>
        <button type="submit" className={classes.button}>
          Generate
        </button>
      </form>
      {filteredParcels && (
        <div className={classes.printdiv} onClick={handlePrint}>
          <MdPrint className={classes.icon} />
        </div>
      )}
      <ReportsTable
        componentRef={componentRef}
        filteredParcels={filteredParcels}
      />
    </div>
  );
};

export default Reports;
