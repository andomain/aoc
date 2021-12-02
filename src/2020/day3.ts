type Position = {
  right: number,
  down: number,
};

const TREE = '#';

const traverseMap = (map: Array<string>, slope: Position) => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;
  const position: Position = { right: 0, down: 0 };

  let trees = 0;

  while (position.down < mapHeight) {
    if (map[position.down][position.right] === TREE) {
      trees += 1;
    }

    position.down += slope.down;
    position.right = (position.right + slope.right) % mapWidth;
  }

  return trees;
};

function part1(input: Array<string>) {
  const slope: Position = { down: 1, right: 3 };
  return traverseMap(input, slope);

}

function part2(input: Array<string>) {
  const slopes: Position[] = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  return slopes.reduce((sum, slope) => sum *= traverseMap(input, slope), 1);
}

export {
  part1,
  part2
};
