import { splitByEmptyLine } from '../lib/utils';

type Rules = Map<string, string>;
type Count = Map<string, number>;

const parseInput = (input: Array<string>): { init: string, rules: Rules } => {
  const [[init], ruleStrings] = splitByEmptyLine(input);

  const rules: Rules = ruleStrings.reduce((lookup, ruleStr) => {
    const [a, b] = ruleStr.split(' -> ');
    return lookup.set(a, b);
  }, new Map());

  return { init, rules };
};

const incrCount = (count: Count, value: string, incr = 1): Count => {
  return count.set(value, (count.get(value) || 0) + incr);
};

const getMinMax = (count: Count) => Array.from(count.values()).reduce((record, count) => ({
  min: Math.min(record.min, count),
  max: Math.max(record.max, count),
}), { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

const runSteps = (input: Array<string>, steps: number): Count => {
  const { init, rules } = parseInput(input);

  const chars: Count = init.split('').reduce((count, char) => incrCount(count, char), new Map());
  let pairs: Count = new Map();

  for (let i = 0; i <= init.length - 2; i++) {
    const pair = `${init[i]}${init[i + 1]}`;
    pairs.set(pair, (pairs.get(pair) || 0) + 1);
  }

  for (let i = 0; i < steps; i++) {
    const newPairs: Count = new Map();
    for (const [pair, pairCount] of pairs) {
      const newChar = rules.get(pair)!;
      const pairA = `${pair[0]}${newChar}`;
      const pairB = `${newChar}${pair[1]}`;

      incrCount(newPairs, pairA, pairCount);
      incrCount(newPairs, pairB, pairCount);
      incrCount(chars, newChar, pairCount);
    }
    pairs = newPairs;
  }

  return chars;
};

function part1(input: Array<string>) {
  const { min, max } = getMinMax(runSteps(input, 10));
  return max - min;

}

function part2(input: Array<string>) {
  const { min, max } = getMinMax(runSteps(input, 40));
  return max - min;
}

export {
  part1,
  part2
};
