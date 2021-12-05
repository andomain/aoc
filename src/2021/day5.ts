import { numBetween } from "../2020/lib";

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
  max.width = Math.max(max.width, line.start.x, line.end.x) + 1;
  max.height = Math.max(max.height, line.start.y, line.end.y) + 1;
  return max;
}, { width: 0, height: 0 });

export const getPoint = (input: string): Point => {
  const [x, y] = input.split(/,/);

  return { x: Number(x), y: Number(y) };
};

export const getLines = (input: Array<string>): Line[] => {
  return input.map((line) => {
    const [startString, endString] = line.split(' -> ');

    return {
      start: getPoint(startString),
      end: getPoint(endString),
    };
  });
};

export const isOnLine = (point: Point, line: Line): boolean => {
  const minX = Math.min(line.start.x, line.end.x);
  const maxX = Math.max(line.start.x, line.end.x);
  const minY = Math.min(line.start.y, line.end.y);
  const maxY = Math.max(line.start.y, line.end.y);

  return numBetween(point.x, minX, maxX) && numBetween(point.y, minY, maxY);
};

export const plotLine = (grid: Grid, line: Line): Grid => {
  return grid.map((row, y) => row.map((col, x) => {
    return isOnLine({ x, y }, line) ? col + 1 : col;
  }));
};

export const isHorizontal = (line: Line): boolean => (
  line.start.x === line.end.x
);

export const isVertical = (line: Line): boolean => (
  line.start.y === line.end.y
);

function part1(input: Array<string>) {
  const lines = getLines(input);
  const { width, height } = getSize(lines);
  let grid: Grid = new Array(height).fill(new Array(width).fill(0));

  const verticalOrHorizontalLines = lines.filter(line => isHorizontal(line) || isVertical(line));

  for (const line of verticalOrHorizontalLines) {
    grid = plotLine(grid, line);
  }

  return grid.reduce((sum, row) => sum += row.reduce((rowSum, column) => {
    if (column >= 2) {
      return rowSum + 1;
    }
    return rowSum;
  }, 0), 0);
}

function part2(input: Array<string>) {
}

export {
  part1,
  part2
};
