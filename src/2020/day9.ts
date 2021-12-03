const PREAMBLE = 25;

const validateStreamPosition = (stream: number[], index: number, preamble: number): boolean => {
  const candidate = stream[index];
  const parts = stream.slice(index - preamble, index)
    .filter(number => number < candidate);

  const validPartCount = parts.length;

  for (let i = 0; i < validPartCount; i++) {
    const a = parts[i];
    for (let j = 1; j < validPartCount; j++) {
      const b = parts[j];
      if (a + b === candidate) {
        return true;
      }
    }
  }

  return false;
};

const findWeakness = (stream: number[], target: number) => {
  const length = stream.length;

  for (let i = 0; i < length; i++) {
    let sum = stream[i];
    const parts = [sum];

    for (let j = i + 1; j < length; j++) {
      sum += stream[j];
      parts.push(stream[j]);

      if (sum === target) {
        return Math.min(...parts) + Math.max(...parts);
      } else if (sum > target) {
        break;
      }
    }
  }

  return -1;
};

function part1(input: Array<string>, preamble = PREAMBLE): number {
  const stream = input.map(Number);

  const streamSize = stream.length;

  for (let i = preamble; i < streamSize; i++) {
    if (!validateStreamPosition(stream, i, preamble)) {
      return stream[i];
    }
  }

  throw new Error('No target found');
}

function part2(input: Array<string>, preamble = PREAMBLE) {
  const target = part1(input, preamble);

  const stream = input.map(Number);

  return findWeakness(stream, target);
}

export {
  part1,
  part2
};
