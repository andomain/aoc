export type BitArray = Array<string>

export const getMostCommonBits = (bitArray: BitArray, roundUp = true): string => {
  const numReadings = bitArray.length;
  const summedBits = bitArray[0].split('').map(Number);

  bitArray.slice(1).forEach(bitString => {
    bitString.split('').forEach((bit, idx) => {
      summedBits[idx] += Number(bit);
    });
  });

  return summedBits.map(sum => {
    const div = sum / numReadings;
    if (div === 0.5) {
      return roundUp ? 1 : 0;
    }
    return Math.round(sum / numReadings);
  }).join('');
};

// If performance becomes an issue then could be given its own implementation, however for now
// finding the max and inverting is acceptable
export const getLeastCommonBits = (bitArray: BitArray, roundUp = true): string => invertBitString(getMostCommonBits(bitArray, roundUp));

export const invertBitString = (bitString: string): string => bitString.split('').map(bit => Math.abs(Number(bit) - 1)).join('');

export const splitByEmptyLine = (input: Array<string>): string[][] => input
  .join('\n')
  .split(/\n{2,}/g)
  .map(lines => lines.split('\n'));

export const numBetween = (num: number, min: number, max: number) => num <= max && num >= min;

export const sumArray = (arr: Array<number>): number => arr.reduce((sum, item) => sum += item, 0);

export const rotateArray = <T>(arr: Array<T>): Array<T> => {
  const shifted = arr.shift();

  if (shifted !== undefined) {
    arr.push(shifted);

  }
  return arr;
};

export const sumRange = (max: number, min = 0): number => (max * (max + 1) - (min - 1) * min) / 2;
