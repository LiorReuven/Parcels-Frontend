import React from 'react';
import classes from './ColorPicker.module.css';


const ColorPicker = ({ value, onChange, ...rest }) => {
  return (
    <div className={classes.wrapper}>
      <input
        className={classes.value}
        type="text"
        readOnly
        value={value}
        onChange={onChange}
        {...rest}
      ></input>
      <input
        className={classes.picker}
        type="color"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default ColorPicker;
