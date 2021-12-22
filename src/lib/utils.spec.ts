import { numBetween, splitByEmptyLine } from "./utils";

describe('splitByEmptyLine', () => {
  it('splits by empty lines', () => {
    expect(splitByEmptyLine(['a', 'b', '', 'c', '', 'd', 'e'])).toEqual([['a', 'b'], ['c'], ['d', 'e']]);
  });
});

describe('numBetween', () => {
  it('returns true if number is between range', () => {
    expect(numBetween(3, 1, 10)).toBe(true);
  });
  it('returns true if number is the lower limit', () => {
    expect(numBetween(1, 1, 10)).toBe(true);
  });
  it('returns true if number is the upper limit', () => {
    expect(numBetween(10, 1, 10)).toBe(true);
  });
  it('returns false if number is outside range', () => {
    expect(numBetween(13, 1, 10)).toBe(false);
  });
});
