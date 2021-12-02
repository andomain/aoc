import { part1, part2 } from "./day3";

const testInput = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
];

describe('Day 3', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(7);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(336);
    });
  });
});
