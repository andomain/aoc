import Grid, { numberGridFromStrings } from "./Grid";

describe('Grid', () => {
  it('initialises', () => {
    const test = new Grid(2, 2);
    expect(test.data).toEqual([[0, 0], [0, 0]]);
  });

  it('initialises with data', () => {
    const init = [['a', 'b'], ['c', 'd']];
    const test = new Grid(2, 2, init);

    expect(test.data).toEqual(init);
  });

  it('maps data', () => {
    const init = [[0, 1], [2, 3]];
    const test = new Grid(2, 2, init);

    test.map(v => v + 1);

    expect(test.data).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('applys function to each entry', () => {
    const fn = jest.fn();
    const test = new Grid(2, 2, [[0, 1], [2, 3]]);

    test.forEach(fn);

    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenCalledWith(0, 0, 0);
    expect(fn).toHaveBeenCalledWith(1, 1, 0);
    expect(fn).toHaveBeenCalledWith(2, 0, 1);
    expect(fn).toHaveBeenCalledWith(3, 1, 1);
  });

  it('gets all neighbours', () => {
    const init = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    const test = new Grid(4, 4, init);

    const corner = test.neighbours(3, 0);
    const diagCorner = test.neighbours(3, 0, true);
    expect(corner).toEqual(expect.arrayContaining([
      { val: 2, x: 2, y: 0 },
      { val: 7, x: 3, y: 1 },
    ]));
    expect(diagCorner).toEqual(expect.arrayContaining([
      { val: 2, x: 2, y: 0 },
      { val: 7, x: 3, y: 1 },
      { val: 6, x: 2, y: 1 },
    ]));

    const center = test.neighbours(1, 1);
    const diagCenter = test.neighbours(1, 1, true);

    expect(center).toEqual(expect.arrayContaining([
      { val: 1, x: 1, y: 0 },
      { val: 4, x: 0, y: 1 },
      { val: 6, x: 2, y: 1 },
      { val: 9, x: 1, y: 2 },
    ]));
    expect(diagCenter).toEqual(expect.arrayContaining([
      { val: 1, x: 1, y: 0 },
      { val: 4, x: 0, y: 1 },
      { val: 6, x: 2, y: 1 },
      { val: 9, x: 1, y: 2 },

      { val: 0, x: 0, y: 0 },
      { val: 2, x: 2, y: 0 },
      { val: 8, x: 0, y: 2 },
      { val: 10, x: 2, y: 2 },
    ]));
  });

  it('prints', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => null);

    const init = [[0, 1], [2, 3]];
    const test = new Grid(2, 2, init);

    test.print();

    expect(log).toHaveBeenCalledWith('01\n23');
  });

  it('gets and sets values', () => {
    const init = [[0, 1], [2, 3]];
    const test = new Grid(2, 2, init);

    expect(test.get(0, 1)).toBe(2);
    test.set(0, 1, 9);
    expect(test.get(0, 1)).toBe(9);
  });

  it('labels cells', () => {
    const init = [[0, 1], [2, 3]];
    const test = new Grid(2, 2, init);

    expect(test.label(1, 0)).toBe('(1,0)');
  });

  it('creates slices', () => {
    const init = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    const test = new Grid(4, 4, init);

    const startSlice = test.slice({ x: 2, y: 2 });
    expect(startSlice.data).toEqual([[10, 11], [14, 15]]);

    const endSlice = test.slice({ x: 1, y: 1 }, { x: 3, y: 2 });
    expect(endSlice.data).toEqual([
      [5, 6, 7],
      [9, 10, 11],
    ]);
  });

  describe('Mirror', () => {
    let init: number[][];

    beforeEach(() => {
      init = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ];
    });

    it('X', () => {
      const test = new Grid(4, 4, init);
      test.mirrorX();
      expect(test.data).toEqual([
        [3, 2, 1, 0],
        [7, 6, 5, 4],
        [11, 10, 9, 8],
        [15, 14, 13, 12],
      ]);
    });

    it('Y', () => {
      console.log('HEY', init);
      const test = new Grid(4, 4, init);
      test.mirrorY();
      test.print();
      expect(test.data).toEqual([
        [12, 13, 14, 15],
        [8, 9, 10, 11],
        [4, 5, 6, 7],
        [0, 1, 2, 3],
      ]);
    });
  });
});

describe('numberGridFromStrings', () => {
  it('creates instance', () => {
    const input = ['123', '456'];

    const grid = numberGridFromStrings(input);

    expect(grid).toBeInstanceOf(Grid);
    expect(grid.data).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });
});
