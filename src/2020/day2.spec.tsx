import { getParts, part1, part2 } from './day2';

const testInput = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];

describe('Day 2', () => {
  it('gets parts', () => {
    expect(getParts('1-4 d: abcde')).toEqual({
      a: 1,
      b: 4,
      char: 'd',
      password: 'abcde',
    });
  });

  it('throws if incorrect input', () => {
    expect(() => getParts('')).toThrow();
  });

  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(2);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(1);
    });
  });
});
