import { getMoonPhase, getClosestNumber } from './helpers';

test('should return correct moon phase', () => {
  expect(getMoonPhase(2020, 10, 16)).toBe('newMoon');
  expect(getMoonPhase(2020, 10, 31)).toBe('fullMoon');
  expect(getMoonPhase(2020, 11, 30)).toBe('fullMoon');
  expect(getMoonPhase(2020, 12, 29)).toBe('fullMoon');
  expect(getMoonPhase(2021, 1, 13)).toBe('newMoon');
  expect(getMoonPhase(2021, 8, 7)).toBe('newMoon');
  expect(getMoonPhase(2021, 11, 19)).toBe('fullMoon');
})

test('should return closest number to the ref', () => {
  expect(getClosestNumber([1.5,1.9,2.5,2.8], 2)).toBe(1.9); 
  expect(getClosestNumber([4,23,7,39,19,0,9.7,14], 9)).toBe(9.7); 
})