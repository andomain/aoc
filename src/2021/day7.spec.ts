import { part1, part2 } from './day7';

const testInput = ['16,1,2,0,4,2,7,1,2,14'];

describe('Day 7', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(37);
    });

  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(168);
    });
  });
});
