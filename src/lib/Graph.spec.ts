import { Graph } from "./Graph";

describe('Graph', () => {
  it('adds vertices', () => {
    const test = new Graph<number>();
    test.addVertex(1);
    test.addVertex(2);
    test.addVertex(3);

    expect(test.size).toBe(3);
  });

  it('only adds vertices once', () => {
    const test = new Graph<number>();
    test.addVertex(1);
    test.addVertex(1);
    expect(test.size).toBe(1);
  });

  it('adds undirected edges', () => {
    const test = new Graph<number>();
    test.addVertex(1);
    test.addVertex(2);
    test.addVertex(3);

    test.addEdge(2, 3);

    expect(test.getEdges(1)).toEqual([]);
    expect(test.getEdges(2)).toEqual([3]);
    expect(test.getEdges(3)).toEqual([2]);
  });

  it('adds directed edges', () => {
    const test = new Graph<number>();
    test.addVertex(1);
    test.addVertex(2);
    test.addVertex(3);

    test.addEdge(2, 3, true);

    expect(test.getEdges(1)).toEqual([]);
    expect(test.getEdges(2)).toEqual([3]);
    expect(test.getEdges(3)).toEqual([]);
  });

  it('tests for vertex', () => {
    const test = new Graph<string>();

    test.addVertex('a');
    test.addVertex('b');

    expect(test.has('b')).toBe(true);
    expect(test.has('c')).toBe(false);
  });

  it('prints', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => null);

    const test = new Graph<number>();
    test.addVertex(1);
    test.addVertex(2);
    test.addVertex(3);

    test.addEdge(2, 3, true);
    test.addEdge(1, 2);
    test.addEdge(1, 3);

    test.print();

    expect(log).toHaveBeenCalledTimes(3);
    expect(log).toHaveBeenCalledWith('1 -> 2 3');
    expect(log).toHaveBeenCalledWith('2 -> 3 1');
    expect(log).toHaveBeenCalledWith('3 -> 1');

  });
});
