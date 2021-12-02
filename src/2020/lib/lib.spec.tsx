import { logicalXor, numBetween, splitByEmptyLine } from '.';

describe('lib', () => {
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

  describe('logicalXor', () => {
    it('returns true if a and !b', () => {
      expect(logicalXor(true, false)).toBe(true);
    });

    it('returns true if !a and b', () => {
      expect(logicalXor(false, true)).toBe(true);
    });

    it('returns false if !a and !b', () => {
      expect(logicalXor(false, false)).toBe(false);
    });

    it('returns false if a and b', () => {
      expect(logicalXor(true, true)).toBe(false);
    });
  });

  describe('splitByEmptyLine', () => {
    it('splits by empty lines', () => {
      expect(splitByEmptyLine(['a', 'b', '', 'c', '', 'd', 'e'])).toEqual([['a', 'b'], ['c'], ['d', 'e']]);
    });
  });
});
