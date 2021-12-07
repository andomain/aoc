import { numBetween } from "./lib";

export type Point = {
  x: number,
  y: number,
};

export type Line = {
  start: Point,
  end: Point,
};

export type Grid = number[][];

export const getSize = (lines: Line[]): { width: number, height: number } => lines.reduce((max, line) => {
  max.width = Math.max(max.width, Math.max(line.start.x, line.end.x) + 1);
  max.height = Math.max(max.height, Math.max(line.start.y, line.end.y) + 1);
  return max;
}, { width: 0, height: 0 });

export const getLines = (input: Array<string>): Line[] => {
  return input.map((line) => {
    const [, startX, startY, endX, endY] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)!;

    return {
      start: { x: Number(startX), y: Number(startY) },
      end: { x: Number(endX), y: Number(endY) },
    };
  });
};

export const isOnLine = (point: Point, line: Line): boolean => {
  const minX = Math.min(line.start.x, line.end.x);
  const maxX = Math.max(line.start.x, line.end.x);
  const minY = Math.min(line.start.y, line.end.y);
  const maxY = Math.max(line.start.y, line.end.y);

  // y = mx + c
  const gradient = (line.end.y - line.start.y) / (line.end.x - line.start.x);
  const c = line.end.y - gradient * line.end.x;

  if (!numBetween(point.x, minX, maxX) || !numBetween(point.y, minY, maxY)) {
    return false;
  }

  if (gradient === 0) {
    return point.y === line.start.y;
  }

  if (Math.abs(gradient) === Infinity) {
    return point.x === line.start.x;
  }

  return point.y === gradient * point.x + c;
};

export const plotLine = (grid: Grid, line: Line): Grid => {
  const newGrid = grid.map((row, y) => row.map((col, x) => {
    return isOnLine({ x, y }, line) ? col + 1 : col;
  }));
  return newGrid;
};

export const isHorizontal = (line: Line): boolean => (
  line.start.x === line.end.x
);

export const isVertical = (line: Line): boolean => (
  line.start.y === line.end.y
);


export const countMultipleOverlaps = (grid: Grid): number => grid.reduce((sum, row) => sum += row.reduce((rowSum, column) => {
  if (column >= 2) {
    return rowSum + 1;
  }
  return rowSum;
}, 0), 0);

const plotGrid = (grid: Grid) => console.log(grid.map(row => row.join('')).join("\n").replace(/0/g, '.'));

function part1(input: Array<string>) {
  const lines = getLines(input);
  const { width, height } = getSize(lines);
  let grid: Grid = new Array(height).fill(new Array(width).fill(0));

  const verticalOrHorizontalLines = lines.filter(line => isHorizontal(line) || isVertical(line));

  for (const line of verticalOrHorizontalLines) {
    grid = plotLine(grid, line);
  }

  return countMultipleOverlaps(grid);
}

function part2(input: Array<string>) {
  const lines = getLines(input);
  const { width, height } = getSize(lines);
  let grid: Grid = new Array(height).fill(new Array(width).fill(0));

  for (const line of lines) {
    grid = plotLine(grid, line);
  }

  plotGrid(grid);
  return countMultipleOverlaps(grid);
}

export {
  part1,
  part2
};
