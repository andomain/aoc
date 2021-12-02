const parseInput = (lines: string[]) => lines.map(Number).sort((a, b) => a - b);

const TARGET_SUM = 2020;

const getTwoArrayElementsThatSumTo = (inputArray: number[], target: number): number[] => {
  let startIndex = 0;
  let endIndex = inputArray.length - 1;

  while (startIndex < endIndex) {
    const a = inputArray[startIndex];
    const b = inputArray[endIndex];
    const sum = a + b;

    if (sum === target) {
      return [a, b];
    }

    if (sum < target) {
      startIndex += 1;
    } else endIndex -= 1;
  }

  throw new Error(`Could not find 2 elements summing to ${target}`);
};

const getThreeElementsThatSumTo = (inputArray: number[], target: number): number[] => {
  let startIndex = 0;
  const maxIndex = inputArray.length - 1;

  while (startIndex <= maxIndex) {
    try {
      const tmp = inputArray[startIndex];
      const [a, b] = getTwoArrayElementsThatSumTo(inputArray.slice(startIndex + 1), target - tmp);
      return [tmp, a, b];
    } catch (err) {
      startIndex += 1;
    }
  }
  throw new Error(`Could not find 3 elements summing to ${target}`);
};

function part1(input: Array<string>) {
  const parsedInput = parseInput(input);
  const [a, b] = getTwoArrayElementsThatSumTo(parsedInput, TARGET_SUM);
  return a * b;
}

function part2(input: Array<string>) {
  const parsedInput = parseInput(input);
  const [a, b, c] = getThreeElementsThatSumTo(parsedInput, TARGET_SUM);
  return a * b * c;
}

export { part1, part2 };
