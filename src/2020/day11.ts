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

type Direction = { right: number, down: number };

const Direction: { [key: string]: Direction } = {
  UP: { right: 0, down: -1 },
  DOWN: { right: 0, down: 1 },
  RIGHT: { right: 1, down: 0 },
  LEFT: { right: -1, down: 0 },
  UPRIGHT: { right: 1, down: -1 },
  DOWNRIGHT: { right: 1, down: 1 },
  UPLEFT: { right: -1, down: -1 },
  DOWNLEFT: { right: -1, down: 1 },
};

export type SeatPlan = Status[][];

type UpdateResult = {
  updated: SeatPlan,
  hasChanged: boolean,
}

type LookFn = (seatplan: SeatPlan, x: number, y: number) => SeatCount;

const getImmediateSurroundings: LookFn = (seatplan, x, y) => {
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

export const getNextInDirection = (seatplan: SeatPlan, x: number, y: number, direction: Direction): Status => {
  let checkX = x + direction.right;
  let checkY = y + direction.down;

  let checkSpace = seatplan[checkY]?.[checkX];

  while (checkSpace === Status.floor) {
    checkX += direction.right;
    checkY += direction.down;
    checkSpace = seatplan[checkY]?.[checkX];
  }

  return checkSpace;
};

export const getNextInAllDirections: LookFn = (seatplan, x, y) => {
  let empty = 0;
  let occupied = 0;
  let floor = 0;

  for (const dir of Object.values(Direction)) {
    const checkSpace = getNextInDirection(seatplan, x, y, dir);

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

const initSeatplan = (width: number, height: number): SeatPlan => new Array(height).fill('.').map(() => new Array(width));

export const parseInput = (input: Array<string>): SeatPlan => input.map(line => line.split('')) as Status[][];

const countOccupied = (seatplan: SeatPlan): number => seatplan.reduce((sum, row) => sum += row.reduce((rowSum, space) => {
  return rowSum += space === Status.occupied ? 1 : 0;
}, 0), 0);


const updateSeatplan = (seatplan: SeatPlan, lookFn: LookFn, occupiedThreshold = 4): UpdateResult => {
  let stable = true;
  const height = seatplan.length;
  const width = seatplan[0].length;
  const updated = initSeatplan(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const space = seatplan[y][x];
      const surroundings = lookFn(seatplan, x, y);

      if (space === Status.floor) {
        updated[y][x] = Status.floor;
        continue;
      }

      if (space === Status.empty && surroundings.occupied === 0) {
        stable = false;
        updated[y][x] = Status.occupied;
        continue;
      }

      if (space === Status.occupied && surroundings.occupied >= occupiedThreshold) {
        stable = false;
        updated[y][x] = Status.empty;
        continue;
      }

      updated[y][x] = space;
    }
  }

  return { updated, hasChanged: stable };
};

function part1(input: Array<string>) {
  let current: SeatPlan = parseInput(input);
  let stable = false;

  while (!stable) {
    const { updated, hasChanged } = updateSeatplan(current, getImmediateSurroundings);

    current = updated;
    stable = hasChanged;
  }

  return countOccupied(current);
}

function part2(input: Array<string>) {
  let current: SeatPlan = input.map(line => line.split('')) as Status[][];
  let stable = false;

  while (!stable) {
    const { updated, hasChanged } = updateSeatplan(current, getNextInAllDirections, 5);

    current = updated;
    stable = hasChanged;
  }

  return countOccupied(current);
}

export {
  part1,
  part2
};
