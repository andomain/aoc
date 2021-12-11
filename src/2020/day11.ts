enum Status {
  floor = '.',
  empty = 'L',
  occupied = '#',
}

type SeatCount = {
  empty: number,
  occupied: number,
  floor: number,
}

const Direction = {
  UP: { right: 0, down: -1 },
  DOWN: { right: 0, down: 1 },
  RIGHT: { right: 1, down: 0 },
  LEFT: { right: -1, down: 0 },
  UPRIGHT: { right: 1, down: -1 },
  DOWNRIGHT: { right: 1, down: 1 },
  UPLEFT: { right: -1, down: -1 },
  DOWNLEFT: { right: -1, down: 1 },
};

type SeatPlan = string[][];

const getSurroundings = (seatplan: SeatPlan, x: number, y: number): SeatCount => {
  let empty = 0;
  let occupied = 0;
  let floor = 0;

  for (const { right, down } of Object.values(Direction)) {
    const checkSpace = seatplan[y + down]?.[x + right];
    if (checkSpace !== undefined) {
      empty += checkSpace === Status.empty ? 1 : 0;
      occupied += checkSpace === Status.occupied ? 1 : 0;
      floor += checkSpace === Status.floor ? 1 : 0;
    }
  }

  return {
    empty,
    occupied,
    floor,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printGrid = (grid: SeatPlan) => {
  console.log(grid.map(line => line.join('')).join('\n'));
};

function part1(input: Array<string>) {
  let current: SeatPlan = input.map(line => line.split(''));
  const width = input[0].length;
  const height = input.length;
  let stable = false;

  while (!stable) {
    stable = true;
    const updated = new Array(height).fill(0).map(_ => new Array(width));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const space = current[y][x];
        const surroundings = getSurroundings(current, x, y);

        if (space === Status.floor) {
          updated[y][x] = Status.floor;
          continue;
        }

        if (space === Status.empty && surroundings.occupied === 0) {
          stable = false;
          updated[y][x] = Status.occupied;
          continue;
        }

        if (space === Status.occupied && surroundings.occupied >= 4) {
          stable = false;
          updated[y][x] = Status.empty;
          continue;
        }

        updated[y][x] = space;
      }
    }

    current = updated;
  }

  return current.reduce((sum, row) => sum += row.reduce((rowSum, space) => {
    return rowSum += space === Status.occupied ? 1 : 0;
  }, 0), 0);


}

function part2(input: Array<string>) {
}

export {
  part1,
  part2
};
