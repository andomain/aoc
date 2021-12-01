const parseInput = (input: string[]) => input.map(Number);

function part1(input: Array<string>) {
  let [current, ...depths] = parseInput(input);
  let score = 0;

  for (let reading of depths) {
    if (reading > current) {
      score++;
    }
    current = reading;
  }

  return score;
}

function part2(input: Array<string>) {
  let currentDepth = 0;
  let score = 0;

  const parsedInput = parseInput(input);

  for (let index = 0; index < input.length - 3; index++) {
    const nextDepth = parsedInput[index] + parsedInput[index + 1] + parsedInput[index + 2];
    if (nextDepth > currentDepth) {
      score++;
    }
    currentDepth = nextDepth;
  }

  return score;
}

export {
  part1,
  part2
}
