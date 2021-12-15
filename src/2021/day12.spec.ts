import { part1, part2 } from "./day12";

const testInput1 = [
  'start-A',
  'start-b',
  'A-c',
  'A-b',
  'b-d',
  'A-end',
  'b-end',
];

describe('Day 12', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput1)).toBe(10);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput1)).toBe(12);
    });
  });
});

