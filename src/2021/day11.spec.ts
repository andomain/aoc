import { part1, part2, increment, incrementSurroundings, step } from './day11';
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
    it('increments the grid', () => {
      const grid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      expect(increment(grid)).toEqual([
        [2, 3, 4],
        [5, 6, 7],
        [8, 9, 10],
      ]);
    });

    it('steps', () => {
      const input = [
        [1, 1, 1, 1, 1],
        [1, 9, 9, 9, 1],
        [1, 9, 1, 9, 1],
        [1, 9, 9, 9, 1],
        [1, 1, 1, 1, 1],
      ];

      const { updated, flashCount } = step(input);

      expect(flashCount).toBe(9);
      expect(updated).toEqual([
        [3, 4, 5, 4, 3],
        [4, 0, 0, 0, 4],
        [5, 0, 0, 0, 5],
        [4, 0, 0, 0, 4],
        [3, 4, 5, 4, 3],
      ]);
    });


    describe('neightbours', () => {
      it('increments', () => {
        const grid = [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 0, 1, 2],
          [3, 4, 5, 6],
        ];

        const result = incrementSurroundings(grid, 1, 1, new Set());

        expect(result).toEqual([
          [2, 3, 4, 4],
          [6, 6, 8, 8],
          [10, 1, 2, 2],
          [3, 4, 5, 6],
        ]);
      });

      it('doesnt increment off the edge', () => {
        const grid = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ];

        expect(incrementSurroundings(grid, 0, 0, new Set())).toEqual([
          [1, 3, 3],
          [5, 6, 6],
          [7, 8, 9],
        ]);
      });
    });
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
