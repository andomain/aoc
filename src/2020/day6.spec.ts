import { part1, part2 } from "./day6";

const testInput = [
  'abc',
  '',
  'a',
  'b',
  'c',
  '',
  'ab',
  'ac',
  '',
  'a',
  'a',
  'a',
  'a',
  '',
  'b',
];


describe('Day 6', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(11);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(6);
    });
  });
});
