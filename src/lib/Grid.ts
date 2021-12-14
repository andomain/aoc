type GridFn<T, S = T> = (v: T, x: number, y: number) => S;

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];
const directionsWithDiagonals = [...directions, [1, 1], [1, -1], [-1, 1], [-1, -1]];

export default class Grid<T> {
  public data: T[][];

  constructor(public width: number, public height: number, init?: T[][]) {
    this.data = init ? init : Array(height).fill(0).map(() => Array(width).fill(0));
  }

  map(fn: GridFn<T>) {
    this.data = this.data.map((row, y) => row.map((cell, x) => fn(cell, x, y)));
  }

  forEach(fn: GridFn<T, void>): void {
    this.data.forEach((row, y) => row.forEach((cell, x) => fn(cell, x, y)));
  }

  get(x: number, y: number): T {
    return this.data[y][x];
  }

  set(x: number, y: number, v: T): void {
    this.data[y][x] = v;
  }

  neighbours(x: number, y: number, diagonals = false): {
    val: T,
    x: number,
    y: number,
  }[] {
    const dirs = diagonals ? directionsWithDiagonals : directions;
    const neighbours = [];

    for (const [dX, dY] of dirs) {
      const val = this.data[y + dY]?.[x + dX];

      if (val !== undefined) {
        neighbours.push({ val, x: x + dX, y: y + dY });
      }
    }

    return neighbours;
  }

  label(x: number, y: number): string {
    return `(${x},${y})`;
  }

  print(): void {
    console.log(this.data.map(row => row.join('')).join("\n"));
  }
}
