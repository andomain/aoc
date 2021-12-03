import { part1, part2 } from "./day9";

const testInput = [
  '35',
  '20',
  '15',
  '25',
  '47',
  '40',
  '62',
  '55',
  '65',
  '95',
  '102',
  '117',
  '150',
  '182',
  '127',
  '219',
  '299',
  '277',
  '309',
  '576',
];

describe('Day 9', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput, 5)).toBe(127);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput, 5)).toBe(62);
    });
  });
});
