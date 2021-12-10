enum Code {
  OK,
  CORRUPT,
  INCOMPLETE,
}

type Status = {
  code: Code,
  data?: string | string[],
}

const OPENING_CHARS = [
  '[',
  '(',
  '{',
  '<',
];

const charMap: { [key: string]: string } = {
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>',
};

type ScoreMap = { [key: string]: number }

const corruptScore: ScoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completeScore: ScoreMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const isOpeningChar = (char: string): boolean => OPENING_CHARS.indexOf(char) > -1;

const isMatchingClosingChar = (char: string, openingChar: string): boolean => {
  return char === charMap[openingChar];
};

const parseLine = (line: string): Status => {
  const openers: string[] = [];

  for (const char of line) {
    if (isOpeningChar(char)) {
      openers.push(char);
      continue;
    }

    if (isMatchingClosingChar(char, openers.slice(-1)[0])) {
      openers.pop();
    } else {
      return {
        code: Code.CORRUPT,
        data: char,
      };
    }
  }

  if (openers.length > 0) {
    return {
      code: Code.INCOMPLETE,
      data: openers.reverse().map(char => charMap[char]),
    };
  }

  return {
    code: Code.OK,
  };
};

const getLinesByStatus = (lines: string[], statusCode: Code): Status[] => lines
  .map(parseLine)
  .filter(({ code }) => code === statusCode);

function part1(input: Array<string>) {
  const invalidChars = getLinesByStatus(input, Code.CORRUPT)
    .map(({ data }) => data as string);

  return invalidChars.reduce((sum, char) => sum += corruptScore[char], 0);
}

function part2(input: Array<string>) {
  const autocomplete: string[][] = getLinesByStatus(input, Code.INCOMPLETE)
    .map(({ data }) => data as string[]);

  const scores = autocomplete.map(chars => chars.reduce((score, char) => {
    return score * 5 + completeScore[char];
  }, 0));

  const sorted = scores.sort((a, b) => a - b);
  return sorted[(sorted.length - 1) / 2];
}

export {
  part1,
  part2
};

