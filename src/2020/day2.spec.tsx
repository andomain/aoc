import { part1, part2 } from './day2';

const testInput = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];

describe('Day 2', () => {
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
