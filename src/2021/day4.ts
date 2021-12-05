import { splitByEmptyLine } from './lib';

const MARK = -1;
type BingoNumbers = number[];
export type BingoCard = number[][];


export const getBingoGame = (input: Array<string>): { numbers: BingoNumbers, cards: BingoCard[] } => {
  const parsedStrings = splitByEmptyLine(input);
  const [[numberStr], ...cardsStrings] = parsedStrings;

  return {
    numbers: numberStr.match(/\d+/g)?.map(Number) || [],
    cards: cardsStrings.map(card => card.map(line => line.trim().split(/\s+/).map(Number))),
  };
};

export const playCard = (card: BingoCard, called: number): BingoCard => {
  return card.map(row => row.map(number => number === called ? MARK : number));
};

export const hasWon = (card: BingoCard): boolean => {
  const width = card[0].length;

  if (card.some(row => row.every(item => item === MARK))) {
    return true;
  }

  for (let i = 0; i < width; i++) {
    if (card.every(row => row[i] === MARK)) {
      return true;
    }
  }

  return false;
};

const sumRemainingNumbers = (card: BingoCard): number => card.reduce(
  (sum, row) => sum += row.reduce((rowSum, number) => {
    if (number === MARK) {
      return rowSum;
    }
    return rowSum += number;
  }, 0) as number, 0);

const playPart1 = (numbers: number[], cards: BingoCard[]): number => {
  let calledIndex = 0;
  let cardsInPlay = [...cards];

  while (calledIndex < numbers.length) {
    const called = numbers[calledIndex];

    cardsInPlay = cardsInPlay.map(card => playCard(card, called));

    for (const card of cardsInPlay) {
      if (hasWon(card)) {
        return sumRemainingNumbers(card) * called;
      }
    }
    calledIndex++;
  }

  return 0;
};

const playPart2 = (numbers: number[], cards: BingoCard[]): number => {
  let calledIndex = -1;
  let cardsInPlay = [...cards];
  let lastWon = null;
  let called = 0;

  while (calledIndex < numbers.length && cardsInPlay.length > 0) {
    calledIndex++;
    called = numbers[calledIndex];

    //! Messy impure update of lastWon
    cardsInPlay = cardsInPlay.map(card => playCard(card, called)).filter(card => {
      if (hasWon(card)) {
        lastWon = card;
        return false;
      }
      return true;
    });
  }

  if (!lastWon) {
    return 0;
  }

  return sumRemainingNumbers(lastWon) * called;
};

function part1(input: Array<string>) {
  const { numbers, cards } = getBingoGame(input);

  return playPart1(numbers, cards);
}

function part2(input: Array<string>) {
  const { numbers, cards } = getBingoGame(input);

  return playPart2(numbers, cards);
}

export {
  part1,
  part2
};
