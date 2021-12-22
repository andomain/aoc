import { part1, part2, step } from './day11';
import Grid from '../lib/Grid';

const testInput = [
  '5483143223',
  '2745854711',
  '5264556173',
  '6141336146',
  '6357385478',
  '4167524645',
  '2176841721',
  '6882881134',
  '4846848554',
  '5283751526',
];

describe('Day 11', () => {
  describe('Grid behaviour', () => {
    it('steps', () => {
      const input = new Grid(10, 10, [
        [1, 1, 1, 1, 1],
        [1, 9, 9, 9, 1],
        [1, 9, 1, 9, 1],
        [1, 9, 9, 9, 1],
        [1, 1, 1, 1, 1],
      ]);

      const flashes = step(input);

      expect(flashes).toBe(9);
      expect(input.data).toEqual([
        [3, 4, 5, 4, 3],
        [4, 0, 0, 0, 4],
        [5, 0, 0, 0, 5],
        [4, 0, 0, 0, 4],
        [3, 4, 5, 4, 3],
      ]);
    });
  });


  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(1656);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(195);
    });
  });
});
