import React, { useEffect } from 'react';
import { Howl } from 'howler';

import classes from './SuccessAlert.module.css';

const SuccessAlert = (props) => {
  useEffect(() => {
    const sound = new Howl({
      src: '/success2.mp3',
      html5: true,
    });

    sound.play();

    const timer = setTimeout(
      () => props.setNotification({ canShow: false }),
      5000
    );

    return () => {
      sound.stop();
      clearTimeout(timer);
    };
  });

  return <div className={classes['success-div']}>{props.children}</div>;
};

export default SuccessAlert;
