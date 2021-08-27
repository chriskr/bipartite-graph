import { Graph } from "./types";
import zip from "lodash/zip";

const r = String.raw;
const reNode = r` *[a-zA-Z0-9]+(?: +[a-zA-Z0-9]+)* *`;
const rePath = r`${reNode}(?:-${reNode})+`;
const reSep = r`(?:[,\n]+)`;
const re = new RegExp(r`(?:${reSep})?(${rePath})`, "gy");
const trim = (s: string) => s.trim();
const uniq = <T>(list: T[]) => Array.from(new Set(list));

export const parseRawGraph = (rawGraph: string) => {
  const graph: Graph = new Map();
  while (true) {
    const match = re.exec(rawGraph);
    if (!match) break;
    const path = match[1].split("-").map(trim);
    const pairs = zip(path.slice(0, -1), path.slice(1));
    pairs.forEach(([source, target]) => {
      graph.set(source!, uniq([...(graph.get(source!) || []), target!]));
      graph.set(target!, uniq([...(graph.get(target!) || []), source!]));
    });
  }
  return graph;
};
