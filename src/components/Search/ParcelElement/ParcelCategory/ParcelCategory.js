import React from 'react';

import classes from './ParcelCategory.module.css';

const ParcelCategory = (props) => {
  return (
    <div className={classes['category-container']}>
      <h5 className={classes.title}>{props.title}</h5>
      <div className={classes.info}>{props.info}</div>
    </div>
  );
};

export default ParcelCategory;
