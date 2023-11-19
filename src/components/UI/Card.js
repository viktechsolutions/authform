import React from 'react';

import './Card.scss';

const Card = (props) => {
  const cardClasses = 'card' + (props.className ? ' ' + props.className : '');

  return (
    <div className={cardClasses}>{props.children}</div>
  );
};

export default Card;
