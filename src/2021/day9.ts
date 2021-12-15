import Grid, { numberGridFromStrings } from "../lib/Grid";

const DFS = (grid: Grid<number>, x: number, y: number, visited: Set<string>): number => {
  visited.add(grid.label(x, y));
  let searched = 1;

  grid.neighbours(x, y).forEach(({ x: nextX, y: nextY }) => {
    if (!visited.has(grid.label(nextX, nextY)) && grid.get(nextX, nextY) < 9) {
      searched += DFS(grid, nextX, nextY, visited);
    }
  });

  return searched;
};

function part1(input: Array<string>) {
  const depths = numberGridFromStrings(input);
  let count = 0;

  depths.forEach((v, x, y) => {
    const current = depths.get(x, y);
    if (depths.neighbours(x, y).every(({ x: xNeighbour, y: yNeighbour }) => current < depths.get(xNeighbour, yNeighbour))) {
      count += current + 1;
    }
  });

  return count;
}

function part2(input: Array<string>) {
  const BASIN_BOUNDARY = 9;
  const depths = numberGridFromStrings(input);
  const visited: Set<string> = new Set();
  const basinSizes: number[] = [];

  depths.forEach((depth, x, y) => {
    if (depth < BASIN_BOUNDARY && !visited.has(depths.label(x, y))) {
      const size = DFS(depths, x, y, visited);
      basinSizes.push(size);
    }
  });

  const top3 = basinSizes.sort((a, b) => a - b).slice(-3);
  return top3.reduce((product, size) => product *= size, 1);
}

export {
  part1,
  part2
};
