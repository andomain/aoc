import { getLines, part1, part2 } from "./day5";

const testInput = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2',
];

describe('Day 5', () => {
  it('gets lines', () => {
    expect(getLines(['0,1 -> 1,2', '7,2 -> 3,0'])).toEqual([
      { start: { x: 0, y: 1 }, end: { x: 1, y: 2 } },
      { start: { x: 7, y: 2 }, end: { x: 3, y: 0 } },
    ]);
  });

  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(5);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(12);
    });
  });

});
