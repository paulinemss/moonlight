import { getMoonPhase } from './helpers';

test('should return correct moon phase', () => {
  expect(getMoonPhase(2020, 10, 16)).toBe('newMoon');
  expect(getMoonPhase(2020, 10, 31)).toBe('fullMoon');
  expect(getMoonPhase(2020, 11, 30)).toBe('fullMoon');
  expect(getMoonPhase(2020, 12, 29)).toBe('fullMoon');
  expect(getMoonPhase(2021, 1, 13)).toBe('newMoon');
  expect(getMoonPhase(2021, 8, 7)).toBe('newMoon');
  expect(getMoonPhase(2021, 11, 19)).toBe('fullMoon');
})