import React from 'react';

function Greeting (props) {
  const { username } = props
  return (
    <div className='greeting__wrapper'>
      <h1>Good morning, 
        <span className='greeting__username'> {username}</span>
      </h1>
    </div> 
  )
}

export default Greeting; 