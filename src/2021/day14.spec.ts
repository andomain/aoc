import { part1, part2 } from "./day14";

const testInput = [
  'NNCB',
  '',
  'CH -> B',
  'HH -> N',
  'CB -> H',
  'NH -> C',
  'HB -> C',
  'HC -> B',
  'HN -> C',
  'NN -> C',
  'BH -> H',
  'NC -> B',
  'NB -> B',
  'BN -> B',
  'BB -> N',
  'BC -> B',
  'CC -> N',
  'CN -> C',
];

describe('Day 14', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(1588);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(2188189693529);
    });
  });
});
