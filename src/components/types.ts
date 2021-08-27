export enum Color {
  RED = 1,
  BLUE,
}
export type Vertex = string;
export type Graph = Map<Vertex, Vertex[]>;
export type ColorMap = Map<Vertex, Color>;
