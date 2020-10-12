import React from 'react';
import { getNextMoon } from '../helpers';
import data from '../data/moon';
import newMoon from '../assets/newMoon.png';
import fullMoon from '../assets/fullMoon.png';

const images = {
  newMoon,
  fullMoon
}

function NextMoon (props) {
  const { now } = props; 
  const nextMoonObj = getNextMoon(now); 
  const nextMoonPhase = nextMoonObj.phase; 
  const nextMoonDate = nextMoonObj.date; 

  return (
    <div className='nextmoon__main'>
      <div className='nextmoon__iconwrapper'>
        <img 
          className='nextmoon__icon' 
          src={images[nextMoonPhase]}
          alt='small moon icon'
        />
      </div>
      <div className='nextmoon__text'>
        <h3>
          Coming up: {data[nextMoonPhase]["name"]} on {nextMoonDate.getDate()}/{nextMoonDate.getMonth() + 1}
        </h3>

        {nextMoonPhase === 'newMoon'
          ? <p>
              The New Moon is a great time to start a new project, make plans, and build healthy habits. 
            </p>
          : <p>
              The Full Moon is a great time to celebrate recent achievements, practice self-care and enjoy the night. 
            </p>
        }
      </div>
    </div>
  )
}

export default NextMoon; 