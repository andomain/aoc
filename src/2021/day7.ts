import { sumRange } from "./lib";

type FuelFn = (start: number, end: number) => number;

const parseInput = (input: Array<string>): Array<number> => {
  return input[0].split(',').map(Number).sort((a, b) => a - b);
};

const constantRate: FuelFn = (start: number, end: number) => Math.abs(end - start);
const variableRate: FuelFn = (start: number, end: number) => sumRange(Math.abs(end - start));

const getMinFuel = (sortedPositions: Array<number>, fuelFn: FuelFn): number => {
  let minFuel = Number.MAX_SAFE_INTEGER;
  const length = sortedPositions.length;

  for (let i = sortedPositions[0]; i <= sortedPositions[length - 1]; i++) {
    const fuel = sortedPositions.reduce((sum, position) => sum += fuelFn(position, i), 0);

    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
};

function part1(input: Array<string>) {
  const startPositions = parseInput(input);

  return getMinFuel(startPositions, constantRate);
}


function part2(input: Array<string>) {
  const startPositions = parseInput(input);

  return getMinFuel(startPositions, variableRate);
}

export {
  part1,
  part2
};
