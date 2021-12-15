import { Graph } from "../lib/Graph";

const START = 'start';
const END = 'end';

const isUpperCase = (input: string): boolean => input === input.toUpperCase();

const countPaths = (graph: Graph<string>, allowDoubleSmallCave = false): number => {
  let result = 0;

  const traverseGraph = (visited: string[], hasVisitedDoubleSmallCave = false) => {
    const current = visited.at(-1)!;

    if (current === END) {
      result++;
      return;
    }

    graph.getEdges(current).filter((nextNode) => (
      isUpperCase(nextNode)
      || !visited.includes(nextNode)
      || (allowDoubleSmallCave && nextNode !== START && !hasVisitedDoubleSmallCave)
    )).forEach(nextNode => traverseGraph([...visited, nextNode], (hasVisitedDoubleSmallCave || (!isUpperCase(nextNode) && visited.includes(nextNode)))));
  };

  traverseGraph([START]);

  return result;
};

const buildGraph = (input: Array<string>): Graph<string> => {
  const graph = new Graph<string>();
  input.map(line => {
    const [start, end] = line.split('-');

    graph.addVertex(start);
    graph.addVertex(end);

    graph.addEdge(start, end);
  });

  return graph;
};

function part1(input: Array<string>) {
  const graph = buildGraph(input);

  return countPaths(graph);
}

function part2(input: Array<string>) {
  const graph = buildGraph(input);

  return countPaths(graph, true);
}

export {
  part1,
  part2
};
