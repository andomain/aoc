import { getLeastCommonBits, getMostCommonBits, invertBitString, numBetween, splitByEmptyLine } from ".";

describe('lib', () => {
  describe('getMostCommonBits', () => {
    it('gets most common bits (rounds up)', () => {
      const testInput = [
        '10001',
        '10111',
        '11110',
        '00010',
        '00010',
        '11111',
      ];
      expect(getMostCommonBits(testInput)).toBe('10111');
    });

    it('gets most common bits (rounds down)', () => {
      const testInput = [
        '10001',
        '10111',
        '11110',
        '00010',
        '00010',
        '11111',
      ];
      expect(getMostCommonBits(testInput, false)).toBe('10010');
    });
  });

  describe('getLeastCommonBits', () => {
    it('gets least common bits (rounds up)', () => {
      const testInput = [
        '10001',
        '10111',
        '11110',
        '00010',
        '00010',
        '11111',
      ];
      expect(getLeastCommonBits(testInput)).toBe('01000');
    });

    it('gets least common bits (rounds down)', () => {
      const testInput = [
        '10001',
        '10111',
        '11110',
        '00010',
        '00010',
        '11111',
      ];
      expect(getLeastCommonBits(testInput, false)).toBe('01101');
    });
  });

  it('inverts a bitstring', () => {
    expect(invertBitString('10110')).toBe('01001');
  });

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
});
