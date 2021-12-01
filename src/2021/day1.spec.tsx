import { part1, part2 } from "./day1";

const testInput = [
  "199",
  "200",
  "208",
  "210",
  "200",
  "207",
  "240",
  "269",
  "260",
  "263",
];

describe("Day 1", () => {
  describe("Part 1", () => {
    it("is correct", () => {
      expect(part1(testInput)).toBe(7);
    });
  });

  describe("Part 2", () => {
    it("is correct", () => {
      expect(part2(testInput)).toBe(5);
    });
  });
});
