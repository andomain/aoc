import Grid from "../lib/Grid";

const parseInput = (input: Array<string>): Grid<number> => new Grid(10, 10, input.map(line => line.split('').map(Number)));

export const step = (grid: Grid<number>): number => {
  const flashed: Set<string> = new Set();
  let flashCount = 0;
  let finished = false;

  grid.map(v => v + 1);

  while (!finished) {
    finished = true;

    grid.forEach((v, x, y) => {
      const id = grid.label(x, y);

      if (grid.get(x, y) > 9 && !flashed.has(id)) {
        finished = false;
        flashCount++;
        flashed.add(id);

        grid.set(x, y, 0);

        grid.neighbours(x, y, true).forEach(({ val, x: xNeighbour, y: yNeighbour }) => {
          const neighbourId = grid.label(xNeighbour, yNeighbour);
          if (!flashed.has(neighbourId)) {
            grid.set(xNeighbour, yNeighbour, val + 1);
          }
        });
      }
    });
  }

  return flashCount;
};

function part1(input: Array<string>, steps = 100) {
  const grid = parseInput(input);
  let flashes = 0;

  for (let i = 0; i < steps; i++) {
    flashes += step(grid);
  }

  return flashes;
}

function part2(input: Array<string>) {
  const grid = parseInput(input);
  let prevFlashCount = 0;
  let flashChange = 0;
  let stepCount = 0;

  while (flashChange !== 100) {
    stepCount++;
    const flashCount = step(grid);

    flashChange = flashCount - prevFlashCount;
    prevFlashCount = flashCount;
  }

  return stepCount;
}

export {
  part1,
  part2
};
