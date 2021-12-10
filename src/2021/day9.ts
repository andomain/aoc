const pointKey = (x: number, y: number): string => `${x}/${y}`;

const isSafeDirection = (grid: number[][], x: number, y: number): boolean => {
  return (x >= 0 && y >= 0 && x < grid[0].length && y < grid.length);
};

const DFS = (grid: number[][], startX: number, startY: number, visited: Set<string>): number => {
  const SEARCH = [
    { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
  ];

  visited.add(pointKey(startX, startY));
  let searched = 1;

  for (const searchDir of SEARCH) {
    const searchX = startX + searchDir.x;
    const searchY = startY + searchDir.y;

    if (isSafeDirection(grid, searchX, searchY) && !visited.has(pointKey(searchX, searchY)) && grid[searchY][searchX] < 9) {
      searched += DFS(grid, searchX, searchY, visited);
    }
  }
  return searched;
};

const parseInput = (input: Array<string>) => input.map(row => row.split('').map(Number));

function part1(input: Array<string>) {
  const depths = parseInput(input);

  const gridHeight = depths.length;
  const gridWidth = depths[0].length;

  const getAdjacentPoints = (x: number, y: number): number[][] => {
    const points: number[][] = [];
    if (x > 0) {
      points.push([x - 1, y]);
    }
    if (x < gridWidth - 1) {
      points.push([x + 1, y]);
    }

    if (y > 0) {
      points.push([x, y - 1]);
    }

    if (y < gridHeight - 1) {
      points.push([x, y + 1]);
    }

    return points;
  };

  let count = 0;

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (getAdjacentPoints(x, y).every(([checkX, checkY]) => depths[y][x] < depths[checkY][checkX])) {
        count += (depths[y][x] + 1);
      }
    }
  }
  return count;
}

function part2(input: Array<string>) {
  const BASIN_BOUNDARY = 9;
  const depths = parseInput(input);
  const gridHeight = depths.length;
  const gridWidth = depths[0].length;
  const visited: Set<string> = new Set();
  const basinSizes = [];

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (depths[y][x] < BASIN_BOUNDARY && !visited.has(pointKey(x, y))) {
        const size = DFS(depths, x, y, visited);
        basinSizes.push(size);
      }
    }
  }

  const top3 = basinSizes.sort((a, b) => a - b).slice(-3);
  return top3.reduce((product, size) => product *= size, 1);
}

export {
  part1,
  part2
};
