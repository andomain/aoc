import { part1, part2 } from './day6';

const testInput = ['3,4,3,1,2'];

describe('Day 6', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(5934);
    });

  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(26984457539);
    });
  });
});
