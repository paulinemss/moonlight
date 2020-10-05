import React from 'react';

function MoonCard (props) {
  return (
    <div className='mooncard__wrapper'>
      <div className='moon__wrapper'>
        <div className='moon__image'></div>
      </div>
      {props.children}
    </div>
  )
}

export default MoonCard; 