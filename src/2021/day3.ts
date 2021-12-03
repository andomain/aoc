import { getLeastCommonBits, getMostCommonBits, invertBitString } from "./lib";

type ReferenceGenerator = (input: Array<string>) => string;

export const filterArrayByReferenceFn = (input: Array<string>, referenceFn: ReferenceGenerator): Array<string> => {
  let candidates = [...input];
  let filterIndex = 0;

  while (candidates.length > 1) {
    const refString = referenceFn(candidates);
    candidates = candidates.filter(candidate => candidate[filterIndex] === refString[filterIndex]);
    filterIndex++;
  }

  return candidates;
};

function part1(input: Array<string>) {
  const gammaRate = getMostCommonBits(input);
  const epsilonRate = invertBitString(gammaRate);

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function part2(input: Array<string>) {
  const oxygenRatings = filterArrayByReferenceFn(input, getMostCommonBits);
  const oxygenRating = parseInt(oxygenRatings[0], 2);

  const scrubberRatings = filterArrayByReferenceFn(input, getLeastCommonBits);
  const scrubberRating = parseInt(scrubberRatings[0], 2);

  return oxygenRating * scrubberRating;
}

export {
  part1,
  part2
};
