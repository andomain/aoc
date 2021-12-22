import { part1, part2 } from './day13';

const testInput = [
  '6,10',
  '0,14',
  '9,10',
  '0,3',
  '10,4',
  '4,11',
  '6,0',
  '6,12',
  '4,1',
  '0,13',
  '10,12',
  '3,4',
  '3,0',
  '8,4',
  '1,10',
  '2,14',
  '8,10',
  '9,0',
  '',
  'fold along y = 7',
  'fold along x = 5',
];

describe('Day13', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(17);
    });
  });

  describe('Part 2', () => {
    it('applies multiple folds', () => {
      const result = part2(testInput);

      expect(result.data).toEqual([
        ['#', '#', '#', '#', '#'],
        ['#', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '#'],
        ['#', '#', '#', '#', '#'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ]);
    });
  });
});
