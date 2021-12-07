export type Point = {
  x: number,
  y: number,
};

export type Line = {
  start: Point,
  end: Point,
};

export type Grid = Map<string, number>;

export const getLines = (input: Array<string>): Line[] => input.map((line) => {
  const [, startX, startY, endX, endY] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)!;

  return {
    start: { x: Number(startX), y: Number(startY) },
    end: { x: Number(endX), y: Number(endY) },
  };
});

export const getEquation = (line: Line): { gradient: number, c: number } => {
  // y = mx + c
  const gradient = Number((line.end.y - line.start.y) / (line.end.x - line.start.x));
  const c = Number(line.end.y - gradient * line.end.x);

  return { gradient, c };
};

const plotPoint = (grid: Grid, point: Point): void => {
  const key = `${point.x}/${point.y}`;
  const current = grid.get(key) || 0;
  grid.set(key, current + 1);
};

export const plotLine = (grid: Grid, line: Line) => {
  const { gradient, c } = getEquation(line);

  let x = line.start.x;
  let y = line.start.y;


  if (Math.abs(gradient) === Infinity) {
    const direction = Math.sign(gradient);

    while (y !== line.end.y) {
      plotPoint(grid, { x, y });
      y += direction;
    }
  } else {
    const direction = Math.sign(line.end.x - line.start.x);
    while (x !== line.end.x || y !== line.end.y) {
      plotPoint(grid, { x, y });

      x += direction;
      y = gradient * x + c;
    }
  }

  // Plot last point
  plotPoint(grid, { x, y });
};

export const isHorizontal = (line: Line): boolean => (
  line.start.x === line.end.x
);

export const isVertical = (line: Line): boolean => (
  line.start.y === line.end.y
);


export const countMultipleOverlaps = (grid: Grid): number =>
  Array.from(grid.values()).reduce((sum, count) => sum += count > 1 ? 1 : 0, 0);


function part1(input: Array<string>) {
  const lines = getLines(input);
  const grid: Grid = new Map();

  const verticalOrHorizontalLines = lines.filter(line => isHorizontal(line) || isVertical(line));

  for (const line of verticalOrHorizontalLines) {
    plotLine(grid, line);
  }

  const result = countMultipleOverlaps(grid);

  return result;
}

function part2(input: Array<string>) {
  const lines = getLines(input);
  const grid: Grid = new Map();

  for (const line of lines) {
    plotLine(grid, line);
  }

  return countMultipleOverlaps(grid);
}

export {
  part1,
  part2
};
