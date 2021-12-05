import { getLeastCommonBits, getMostCommonBits, invertBitString, splitByEmptyLine } from ".";

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
});
