import { Color, ColorMap, Graph, Vertex } from "./types";

const getConnected = (graph: Graph, vertex: Vertex): Vertex[] =>
  graph.get(vertex) || [];

const getVerticesCount = (graph: Graph) =>
  new Set([...Array.from(graph.keys()), ...Array.from(graph.values()).flat()])
    .size;

const getVisitor = (graph: Graph, colorMap: ColorMap) => {
  const isRedBlueColorable = (
    vertex: Vertex,
    targetColor: Color = Color.BLUE,
  ): boolean => {
    if (colorMap.has(vertex)) return colorMap.get(vertex) === targetColor;

    colorMap.set(vertex, targetColor);

    return getConnected(graph, vertex).every((connectedVertex) =>
      isRedBlueColorable(
        connectedVertex,
        targetColor === Color.BLUE ? Color.RED : Color.BLUE,
      )
    );
  };
  return isRedBlueColorable;
};

export const getRedBlueSubgraphs = (graph: Graph) => {
  const keys = Array.from(graph.keys());
  const colorMap = new Map<Vertex, Color>();
  if (keys.length === 0) {
    return { error: "", colorMap };
  }
  const isRedBlueColorable = getVisitor(graph, colorMap)(keys[0], Color.RED);
  const isConnected = getVerticesCount(graph) === colorMap.size;
  const error = !isRedBlueColorable
    ? "is not red blue colorable"
    : !isConnected
    ? "not connected graph"
    : "";
  return { error, colorMap };
};
