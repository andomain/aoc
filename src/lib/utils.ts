export const rotateArray = <T>(arr: Array<T>): Array<T> => {
  const shifted = arr.shift();

  if (shifted !== undefined) {
    arr.push(shifted);

  }
  return arr;
};

export const splitByEmptyLine = (input: Array<string>): string[][] => input
  .join('\n')
  .split(/\n{2,}/g)
  .map(lines => lines.split('\n'));

export const numBetween = (num: number, min: number, max: number) => num <= max && num >= min;

export const sumArray = (arr: Array<number>): number => arr.reduce((sum, item) => sum += item, 0);

export const sumRange = (max: number, min = 0): number => (max * (max + 1) - (min - 1) * min) / 2;
