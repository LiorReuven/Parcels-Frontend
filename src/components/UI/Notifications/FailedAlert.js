import React, { useEffect } from 'react';
import { Howl } from 'howler';

import classes from './FailedAlert.module.css';

const FailedAlert = (props) => {
  useEffect(() => {
    const sound = new Howl({
      src: '/error2.mp3',
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

  return <div className={classes['failed-div']}>{props.children}</div>;
};

export default FailedAlert;
