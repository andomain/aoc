export const numBetween = (num: number, min: number, max: number) => num <= max && num >= min;

export const logicalXor = (a: boolean, b: boolean): boolean => (a && !b) || (!a && b);

export const splitByEmptyLine = (input: Array<string>): string[][] => input
  .join('\n')
  .split(/\n{2,}/g)
  .map(lines => lines.split('\n'));
