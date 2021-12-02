export const numBetween = (num: number, min: number, max: number) => num <= max && num >= min;

export const logicalXor = (a: boolean, b: boolean): boolean => (a && !b) || (!a && b);
