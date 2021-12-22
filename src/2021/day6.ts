import { rotateArray, sumArray } from '../lib/utils';

const STARTING_INTERVAL = 8;
const RESET_INTERVAL = 6;

const step = (ages: Array<number>, steps: number): Array<number> => {
  for (let i = 0; i < steps; i++) {
    const reproducers = ages[0];
    ages = rotateArray(ages);
    ages[RESET_INTERVAL] += reproducers;
  }

  return ages;
};

const getInitAges = (input: Array<string>): Array<number> => {
  const ages = Array(STARTING_INTERVAL + 1).fill(0);
  const init = input[0].split(',').map(Number);

  for (const age of init) {
    ages[age]++;
  }

  return ages;
};

function part1(input: Array<string>) {
  const ages = getInitAges(input);

  return sumArray(step(ages, 80));

}

function part2(input: Array<string>) {
  const ages = getInitAges(input);

  return sumArray(step(ages, 256));
}

export {
  part1,
  part2
};
