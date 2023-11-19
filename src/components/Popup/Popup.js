import React, { useEffect, useState } from 'react';
import './Popup.scss';

const Popup = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const showPopup = () => {
    if (isVisible) {
      return (
        <div
          className="popup"
          style={{ color: props.color, background: props.bg }}>
          <h2>{props.text}</h2>
        </div>
      );
    }
  };

  return <>
    {showPopup()}
  </>;
};

export default Popup;
