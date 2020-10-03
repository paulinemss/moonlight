import React from 'react';

function Card (props) {
  return (
    <div className='card__wrapper'>{props.children}</div>
  )
}

export default Card; 