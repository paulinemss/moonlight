import React from 'react';
import newMoon from '../assets/newMoon.png';
import waxingCrescent from '../assets/waxingCrescent.png';
import firstQuarter from '../assets/firstQuarter.png';
import waxingGibbous from '../assets/waxingGibbous.png';
import fullMoon from '../assets/fullMoon.png';
import waningGibbous from '../assets/waningGibbous.png';
import lastQuarter from '../assets/lastQuarter.png';
import waningCrescent from '../assets/waningCrescent.png';

const images = {
  newMoon,
  waxingCrescent,
  firstQuarter,
  waxingGibbous,
  fullMoon,
  waningGibbous,
  lastQuarter,
  waningCrescent
}

function MoonCard (props) {
  const { moonPhase } = props; 

  return (
    <div className='mooncard__wrapper'>
      <div className='star star-1' />
      <div className='star star-2' />
      <div className='star star-3' />
      <div className='star star-4' />
      <div className='star star-5' />
      <div className='star star-6' />
      <div className='star star-7' />
      <div className='star star-8' />
      <div className='star star-9' />
      <div className='star star-10' />
      <div className='star star-11' />
      <div className='moon__wrapper'>
        <div 
          className='moon__image' 
          style={{ backgroundImage:`url(${images[moonPhase]})` }}>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default MoonCard; 