import { part1, part2 } from "./day10";

const input1 = [
  '16', '10', '15', '5', '1', '11', '7', '19', '6', '12', '4',
];

const input2 = [
  '28', '33', '18', '42', '31', '14', '46', '20', '48', '47', '24', '23',
  '49', '45', '19', '38', '39', '11', '1', '32', '25', '35', '8', '17',
  '7', '9', '4', '2', '34', '10', '3',
];

describe('Day 10', () => {
  describe('Part 1', () => {
    it('case 1', () => {
      expect(part1(input1)).toBe(35);
    });

    it('case 2', () => {
      expect(part1(input2)).toBe(220);
    });
  });

  describe('Part 2', () => {
    it('case 1', () => {
      expect(part2(input1)).toBe(8);
    });

    it('case 2', () => {
      expect(part2(input2)).toBe(19208);
    });
  });
});
