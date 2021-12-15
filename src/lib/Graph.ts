import { IPrintable } from "../types";

type Edges<T> = Map<T, T[]>;

export class Graph<T extends IPrintable> {
  private adjList: Edges<T>;

  constructor() {
    this.adjList = new Map();
  }

  addVertex(v: T): void {
    if (this.adjList.has(v)) {
      return;
    }
    this.adjList.set(v, []);
  }

  addEdge(v: T, w: T, directed = false): void {
    this.adjList.get(v)?.push(w);

    if (!directed) {
      this.adjList.get(w)?.push(v);
    }
  }

  getEdges(v: T): T[] {
    return this.adjList.get(v) || [];
  }

  print() {
    const vertices = this.adjList.keys();

    for (const vertex of vertices) {
      const edges = this.getEdges(vertex);
      const edgeString = edges.reduce((str, edge) => {
        return str += `${edge.toString()} `;
      }, '');
      // let conc = '';

      // for (const edge of edges) {
      //   conc += edge.toString() + " ";
      // }

      console.log(vertex.toString() + " -> " + edgeString.trim());
    }
  }

  has(v: T): boolean {
    return this.adjList.has(v);
  }

  get size() {
    return this.adjList.size;
  }
}
