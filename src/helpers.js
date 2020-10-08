export function getMoonPhase(year, month, day) {
  let c = 0;
  let e = 0;
  let jd = 0;
  let b = 0;

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882; 
  b = parseInt(jd); 
  jd -= b; 
  b = Math.round(jd * 8);
  
  if (b >= 8 ) {
      b = 0; 
  }

  let currentMoon; 

  switch(b) {
    case 0: 
      currentMoon = 'newMoon';
      break;
    case 1:
      currentMoon = 'waxingCrescent';
      break;
    case 2: 
      currentMoon = 'firstQuarter';
      break;
    case 3: 
      currentMoon = 'waxingGibbous';
      break;
    case 4: 
      currentMoon = 'fullMoon';
      break;
    case 5:
      currentMoon = 'waningGibbous';
      break;
    case 6:
      currentMoon = 'lastQuarter';
      break;
    case 7:
      currentMoon = 'waningCrescent';
      break;
    default:
      currentMoon = 'Error'; 
  }

  return currentMoon; 
}

export function getNextMoon (now) {
  const start = new Date(now);
  const end = new Date('01/01/2050');

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const newD = new Date(d); 
    const newYear = newD.getFullYear();
    const newMonth = newD.getMonth();
    const newDay = newD.getDate(); 
    const moonPhase = getMoonPhase(newYear, newMonth, newDay);
    const nextMoon = {};

    if (moonPhase === 'newMoon' || moonPhase === 'fullMoon') {
      nextMoon.phase = moonPhase; 
      nextMoon.date = newD; 
      return nextMoon; 
    }
  }
}


export function getFriendlyDate (date) {
  if (date === 1 || date === 21 || date === 31) {
    return date += 'st';
  } else if (date === 2 || date === 22) {
    return date += 'nd';
  } else if (date === 3 || date === 23) {
    return date += 'rd';
  } else {
    return date += 'th'; 
  }
}

export function getGreeting (hour) {
  if (hour >= 4 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon';
  } else if (hour >= 18 || hour < 4) {
    return 'Good evening'; 
  }
}