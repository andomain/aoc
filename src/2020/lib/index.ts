export const numBetween = (num: number, min: number, max: number) => {
  return num <= max && num >= min;
}

export const logicalXor = (a: boolean, b: boolean): boolean => {
  return (a && !b) || (!a && b);
}
