import { BingoCard, getBingoGame, hasWon, part1, part2, playCard } from "./day4";

const testInput = [
  '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
  '',
  '22 13 17 11  0',
  ' 8  2 23  4 24',
  '21  9 14 16  7',
  ' 6 10  3 18  5',
  ' 1 12 20 15 19',
  '',
  ' 3 15  0  2 22',
  ' 9 18 13 17  5',
  '19  8  7 25 23',
  '20 11 10 24  4',
  '14 21 16 12  6',
  '',
  '14 21 17 24  4',
  '10 16 15  9 19',
  '18  8 23 26 20',
  '22 11 13  6  5',
  ' 2  0 12  3  7',
];

describe('Day 4', () => {
  const { numbers, cards } = getBingoGame(testInput);

  it('gets game parts', () => {
    expect(numbers).toEqual([
      7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1,
    ]);

    expect(cards[1]).toEqual([
      [3, 15, 0, 2, 22],
      [9, 18, 13, 17, 5],
      [19, 8, 7, 25, 23],
      [20, 11, 10, 24, 4],
      [14, 21, 16, 12, 6],
    ]);
  });

  it('updates a card', () => {
    expect(playCard(cards[0], 10)).toEqual([
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, -1, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ]);
  });

  it('detects a winning card', () => {
    const wonRow: BingoCard = [
      [1, 2, 3, 4, 5],
      [-1, -1, -1, -1, -1],
      [11, 12, 13, 14, 15],
    ];
    const wonCol: BingoCard = [
      [1, 2, -1, 4, 5],
      [6, 7, -1, 9, 10],
      [11, 12, -1, 14, 15],
    ];
    const lostCard: BingoCard = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
    ];

    expect(hasWon(wonRow)).toBe(true);
    expect(hasWon(wonCol)).toBe(true);
    expect(hasWon(lostCard)).toBe(false);
  });

  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(4512);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(1924);
    });
  });
});
