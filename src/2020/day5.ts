export const searchBinaryPartition = (input: string[], min: number, max: number, upperSymbol: string) => {
  let initialRange = [min, max - 1];

  for (const symbol of input) {
    const [min, max] = initialRange;
    if (symbol === upperSymbol) {
      initialRange = [min, min + Math.floor((max - min) / 2)];
    } else {
      initialRange = [min + Math.ceil((max - min) / 2), max];
    }
  }

  return initialRange[0];
};

export const getSeatId = (boardingPass: string): number => {
  const chars = boardingPass.split('');
  const rowId = searchBinaryPartition(chars.slice(0, 7), 0, 128, 'F');
  const columnId = searchBinaryPartition(chars.slice(7), 0, 8, 'L');
  return rowId * 8 + columnId;
};

function part1(input: Array<string>) {
  return input.reduce((max, boardingPass) => Math.max(max, getSeatId(boardingPass)), 0);
}

function part2(input: Array<string>) {
  const ids = new Set(input.map(getSeatId));
  const min = Math.min(...ids);
  const max = Math.max(...ids);

  for (let id = min + 1; min < max; id++) {
    if (!ids.has(id)) {
      return id;
    }
  }
}

export {
  part1,
  part2
};
