type Grid = number[][];

const parseInput = (input: Array<string>): Grid => input.map(line => line.split('').map(Number));

export const increment = (grid: Grid): Grid => grid.map(line => line.map(cell => cell + 1));

const pointKey = (x: number, y: number): string => `${x}/${y}`;

export const printGrid = (grid: Grid) => {
  console.log(grid.map(row => row.join('')).join("\n"));
};

export const incrementSurroundings = (grid: Grid, x: number, y: number, exclude: Set<string>): Grid => {
  for (let yDir = -1; yDir <= 1; yDir++) {
    for (let xDir = -1; xDir <= 1; xDir++) {
      const id = pointKey(x + xDir, y + yDir);
      if (yDir === -1 && y === 0 || (yDir === 1 && y === grid.length - 1)) {
        continue;
      }
      if (
        (xDir === -1 && x === 0)
        || (xDir === 1 && x === grid[0].length - 1)
        || (xDir === 0 && yDir === 0)) {
        continue;
      }

      if (exclude.has(id)) {
        continue;
      }

      grid[y + yDir][x + xDir] += 1;
    }
  }
  return grid;
};

export const step = (grid: Grid): { updated: Grid, flashCount: number } => {
  let flashCount = 0;
  const flashed: Set<string> = new Set();
  grid = increment(grid);
  let finished = false;

  while (!finished) {
    finished = true;

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const id = pointKey(x, y);

        if (grid[y][x] > 9 && !flashed.has(id)) {
          finished = false;
          flashCount++;
          flashed.add(id);

          grid[y][x] = 0;
          grid = incrementSurroundings(grid, x, y, flashed);
        }
      }
    }

  }

  return { updated: grid, flashCount };
};

function part1(input: Array<string>, steps = 100) {
  let grid = parseInput(input);
  let flashes = 0;

  for (let i = 0; i < steps; i++) {
    const { updated, flashCount } = step(grid);
    grid = updated;
    flashes += flashCount;
  }

  return flashes;
}

function part2(input: Array<string>) {
  let grid = parseInput(input);
  let prevFlashCount = 0;
  let flashChange = 0;
  let stepCount = 0;

  while (flashChange !== 100) {
    stepCount++;
    const { updated, flashCount } = step(grid);
    grid = updated;
    flashChange = flashCount - prevFlashCount;
    prevFlashCount = flashCount;
  }

  return stepCount;


}

export {
  part1,
  part2
};
