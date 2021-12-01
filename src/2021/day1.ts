const parseInput = (input: string[]) => input.map(Number);

function part1(input: Array<string>) {
  const parsedInput = parseInput(input);

  return parsedInput.reduce((score, depth, idx) => {
    if (idx === 0 || depth < parsedInput[idx - 1]) {
      return score;
    }

    return score + 1;
  }, 0);
}

function part2(input: Array<string>) {
  let currentDepth = 0;
  let score = 0;

  const parsedInput = parseInput(input);

  for (let index = 0; index < input.length - 3; index += 1) {
    const nextDepth = parsedInput[index] + parsedInput[index + 1] + parsedInput[index + 2];
    if (nextDepth > currentDepth) {
      score += 1;
    }
    currentDepth = nextDepth;
  }

  return score;
}

export { part1, part2 };
