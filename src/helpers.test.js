import { getMoonPhase } from './helpers';

test('should return correct moon phase', () => {
  expect(getMoonPhase(2020, 10, 31)).toBe('fullMoon');
})