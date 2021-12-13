import { getNextInDirection, parseInput, part1, part2 } from "./day11";

const testInput = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
];

describe('getNextInDirection', () => {
  it('gets next in horizontal directions', () => {
    const input = parseInput([
      '......',
      '......',
      'L#.#.L',
      '......',
      '......',
      '......',
    ]);


    expect(getNextInDirection(input, 3, 2, { right: 1, down: 0 })).toBe('L');
    expect(getNextInDirection(input, 3, 2, { right: -1, down: 0 })).toBe('#');
  });

  it('gets next in vertical directions', () => {
    const input = parseInput([
      '...L..',
      '......',
      '...#..',
      '......',
      '...#..',
      '...L..',
    ]);


    expect(getNextInDirection(input, 3, 2, { right: 0, down: 1 })).toBe('#');
    expect(getNextInDirection(input, 3, 2, { right: 0, down: -1 })).toBe('L');
  });

  it('gets next in diagonal directions', () => {
    const input = parseInput([
      '.L...#',
      '......',
      '...#..',
      '......',
      '.....#',
      'L......',
    ]);


    expect(getNextInDirection(input, 3, 2, { right: 1, down: 1 })).toBe('#');
    expect(getNextInDirection(input, 3, 2, { right: 1, down: -1 })).toBe('#');
    expect(getNextInDirection(input, 3, 2, { right: -1, down: 1 })).toBe('L');
    expect(getNextInDirection(input, 3, 2, { right: -1, down: -1 })).toBe('L');
  });
});

describe('Day 11', () => {
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(37);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(26);
    });
  });
});
