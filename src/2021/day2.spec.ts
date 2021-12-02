import { navigate, part1, part2 } from "./day2";

const testInput = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];

describe("Day 2", () => {
  describe('Navigation', () => {
    it('applies navigation functions to a position', () => {
      const navigatorFn = jest.fn().mockImplementation(pos => pos);
      const startPos = { height: 1, depth: 2, aim: 0 };
      navigate(
        ['forward 5', 'down 10'],
        navigatorFn,
        startPos
      );

      expect(navigatorFn).toHaveBeenCalledTimes(2);
      expect(navigatorFn).toHaveBeenCalledWith(startPos, { dir: 'forward', amount: 5 });
      expect(navigatorFn).toHaveBeenCalledWith(startPos, { dir: 'down', amount: 10 });
    });
  });

  describe("Part 1", () => {
    it("is correct", () => {
      expect(part1(testInput)).toBe(150);
    });
  });

  describe("Part 2", () => {
    it("is correct", () => {
      expect(part2(testInput)).toBe(900);
    });
  });
});
