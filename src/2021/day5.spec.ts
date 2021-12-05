import { getLines, getSize, getPoint, isOnLine, Line, part1 } from "./day5";

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
  it('converts strings to Points', () => {
    expect(getPoint('1,2')).toEqual({ x: 1, y: 2 });
  });

  it('gets lines', () => {
    expect(getLines(['0,1 -> 1,2', '7,2 -> 3,0'])).toEqual([
      { start: { x: 0, y: 1 }, end: { x: 1, y: 2 } },
      { start: { x: 7, y: 2 }, end: { x: 3, y: 0 } },
    ]);
  });

  it('gets max height/width', () => {
    expect(getSize([
      { start: { x: 5, y: 3 }, end: { x: 5, y: 1 } },
      { start: { x: 1, y: 7 }, end: { x: 8, y: 2 } },
    ])).toEqual({ width: 9, height: 8 });
  });

  it('checks if a point is on a line', () => {
    const horizontalLine: Line = { start: { x: 1, y: 3 }, end: { x: 4, y: 3 } };
    const verticalLine: Line = { start: { x: 2, y: 1 }, end: { x: 2, y: 4 } };

    expect(isOnLine({ x: 2, y: 3 }, horizontalLine)).toBe(true);
    expect(isOnLine({ x: 0, y: 3 }, horizontalLine)).toBe(false);
    expect(isOnLine({ x: 5, y: 3 }, horizontalLine)).toBe(false);

    expect(isOnLine({ x: 2, y: 3 }, verticalLine)).toBe(true);
    expect(isOnLine({ x: 2, y: 0 }, verticalLine)).toBe(false);
    expect(isOnLine({ x: 2, y: 5 }, verticalLine)).toBe(false);
  });

  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(5);
    });
  });

});
