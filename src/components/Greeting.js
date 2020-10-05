import React from 'react';

function Greeting (props) {
  const { username, now } = props
  const hour = now.getHours();
  let hello; 

  if (hour > 4 && hour < 12) {
    hello = 'Good morning';
  } else if (hour > 12 && hour < 18) {
    hello = 'Good afternoon';
  } else if (hour > 18 || hour < 4) {
    hello = 'Good evening'; 
  }

  return (
    <div className='greeting__wrapper'>
      <h1>
        {hello}, 
        <span className='greeting__username'> {username}</span>
      </h1>
    </div> 
  )
}

export default Greeting; 