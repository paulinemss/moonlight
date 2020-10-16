function getNumber (year, month, day) {
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

  return jd * 8; 
} 

export function getClosestNumber (arr, ref) {
  if (ref === 8) {
    arr = arr.map(num => num < 5 ? num + 8 : num)
  }

  arr.sort((a, b) => {
    return Math.abs(ref - a) - Math.abs(ref - b);
  })

  return arr[0];
}

function isItFullOrNew (num, currentDate, phase) {
  const start = new Date(currentDate);
  const end = new Date(currentDate); 

  start.setDate(start.getDate() - 5);
  end.setDate(end.getDate() + 5);

  const arrayOfPhases = []; 

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const newD = new Date(d); 
    const newYear = newD.getFullYear();
    const newMonth = newD.getMonth() + 1;
    const newDay = newD.getDate(); 
    const moonNumber = getNumber(newYear, newMonth, newDay);
    arrayOfPhases.push(moonNumber); 
  }

  let closestNum; 

  if (phase === 'full') {
    closestNum = getClosestNumber(arrayOfPhases, 4); 
    if (num < closestNum) {
      return 3; 
    } else if (num === closestNum) {
      return 4; 
    } else {
      return 5; 
    }
  } else if (phase === 'new') {
    closestNum = getClosestNumber(arrayOfPhases, 8);
    if (num < 5) {
      num += 8; 
    }
    if (num < closestNum) {
      return 7;
    } else if (num === closestNum) {
      return 0;
    } else {
      return 1; 
    }
  }
}

export function getMoonPhase (year, month, day) {
  const num = getNumber(year, month, day); 
  const currentDate = new Date(year, month-1, day);

  let roundedNum;

  if (num >= 7.5 || num <= 0.5) {
    roundedNum = isItFullOrNew(num, currentDate, 'new');
  } else if (num >= 3.5 && num <= 4.5) {
    roundedNum = isItFullOrNew(num, currentDate, 'full');
  } else {
    roundedNum = Math.round(num);
  }

  let currentMoon; 

  switch(roundedNum) {
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
  const today = new Date(now);
  const currentMoonPhase = getMoonPhase(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const start = new Date(now);
  const end = new Date('01/01/2050');

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const newD = new Date(d); 
    const moonPhase = getMoonPhase(newD.getFullYear(), newD.getMonth() + 1, newD.getDate());
    const nextMoon = {};

    if (moonPhase === 'newMoon' && currentMoonPhase !== 'newMoon') {
      nextMoon.phase = moonPhase; 
      nextMoon.date = newD; 
      return nextMoon; 
    } else if (moonPhase === 'fullMoon' && currentMoonPhase !== 'fullMoon') {
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