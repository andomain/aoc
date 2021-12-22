import Grid from '../lib/Grid';
import { splitByEmptyLine } from '../lib/utils';

const DOT = '#';
const EMPTY = '.';

type Cell = typeof DOT | typeof EMPTY;
type Line = { dir: 'x' | 'y', val: number }

const buildPaper = (dots: Array<string>): Grid<Cell> => {
  const { dotCoords, width, height } = dots.reduce((lookup, str) => {
    const [x, y] = str.split(',').map(Number);
    lookup.width = Math.max(x + 1, lookup.width);
    lookup.height = Math.max(y + 1, lookup.height);
    lookup.dotCoords.add(coordLabel(x, y));
    return lookup;
  }, { width: 0, height: 0, dotCoords: new Set<string>() });

  const paper = new Grid<Cell>(width, height);
  paper.map((_, x, y) => dotCoords.has(coordLabel(x, y)) ? '#' : '.');

  return paper;
};

const coordLabel = (x: number, y: number) => `(${x},${y})`;

const applyFold = (paper: Grid<Cell>, fold: Line): Grid<Cell> => {
  const folded = paper.slice({ x: 0, y: 0, [fold.dir]: fold.val + 1 });
  paper = paper.slice({ x: 0, y: 0 }, { x: paper.width, y: paper.height, [fold.dir]: fold.val - 1 });

  if (fold.dir === 'y') {
    folded.mirrorY();
  } else {
    folded.mirrorX();
  }

  paper.map((v, x, y) => (v === DOT || folded.get(x, y) === DOT) ? DOT : EMPTY);
  return paper;
};

const getFoldLine = (foldString: string): Line => {
  const foldParts = new RegExp(/fold along ([xy])\s*=\s*([0-9]+)/).exec(foldString);

  if (!foldParts) {
    throw new Error(`Unknown fold line ${foldString}`);
  }

  const [, dir, val] = foldParts;

  return { dir, val: Number(val) } as Line;
};

function part1(input: Array<string>) {
  const [dotStrings, foldStrings] = splitByEmptyLine(input);
  let paper = buildPaper(dotStrings);

  const fold = getFoldLine(foldStrings[0]);
  paper = applyFold(paper, fold);

  let count = 0;
  paper.forEach(v => count += v === DOT ? 1 : 0);

  return count;
}

function part2(input: Array<string>) {
  const [dotStrings, foldStrings] = splitByEmptyLine(input);
  let paper = buildPaper(dotStrings);

  for (const foldString of foldStrings) {
    const fold = getFoldLine(foldString);

    paper = applyFold(paper, fold);
  }

  return paper;
}

export {
  part1,
  part2
};
