// FBFBBFFRLR: row 44, column 5, seat ID 357.
// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.

const testInput = [
  'FBFBBFFRLR',
  'BFFFBBFRRR',
  'FFFBBBFRRR',
  'BBFFBBFRLL',
];

import * as day5 from "./day5";

describe('Day 5', () => {
  describe('getSeatId', () => {
    it('calculates seat ID', () => {
      expect(day5.getSeatId('FBFBBFFRLR')).toBe(357);
      expect(day5.getSeatId('BFFFBBFRRR')).toBe(567);
      expect(day5.getSeatId('FFFBBBFRRR')).toBe(119);
      expect(day5.getSeatId('BBFFBBFRLL')).toBe(820);
    });
  });

  describe('Part 1', () => {
    it('is correct', () => {
      expect(day5.part1(testInput)).toBe(820);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      jest.spyOn(day5, 'getSeatId').mockImplementation(id => Number(id));
      expect(day5.part2(['2', '3', '4', '5', '6', '8', '9', '10'])).toBe(7);
    });
  });
});
