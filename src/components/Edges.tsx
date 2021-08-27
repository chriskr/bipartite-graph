import React from "react";
import { Graph } from "./types";
import { Svg } from "./Atoms";

const DELTA_HEIGHT = 48;
const SVG_WIDTH = 120;
const DELAT_CONTROL_POINT = 0.5;

const scaledPoint = (x: number, y: number) =>
  `${x * SVG_WIDTH} ${y * DELTA_HEIGHT}`;

const Path = ({
  x0,
  y0,
  x1,
  y1,
}: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  key: number;
}) => {
  const d = `M ${scaledPoint(x0, y0)} C ${
    scaledPoint(
      x0 + DELAT_CONTROL_POINT,
      y0,
    )
  } ${scaledPoint(x1 - DELAT_CONTROL_POINT, y1)} ${scaledPoint(x1, y1)}`;
  return <path d={d} />;
};

export const Edges = ({
  redNodes,
  blueNodes,
  redNodesGraph,
}: {
  redNodes: string[];
  blueNodes: string[];
  redNodesGraph: Graph;
}) => {
  const redNodesIndex = Object.fromEntries(
    redNodes.map((node, index) => [node, index]),
  );

  const blueNodesIndex = Object.fromEntries(
    blueNodes.map((node, index) => [node, index]),
  );

  const points = Array.from(redNodesGraph).flatMap(([source, targets]) =>
    targets.map((target) => ({
      x0: 0,
      y0: redNodesIndex[source],
      x1: 1,
      y1: blueNodesIndex[target],
    }))
  );

  const height = Math.max(redNodes.length, blueNodes.length) * DELTA_HEIGHT;

  return (
    <Svg
      viewBox={`0 0 ${SVG_WIDTH} ${height}`}
      width={`${SVG_WIDTH}px`}
      height={`${height}px`}
    >
      <g
        stroke="hsl(0, 0%, 30%)"
        strokeWidth="1"
        fill="none"
        transform={`translate(0, ${(DELTA_HEIGHT - 16) / 2 - 0.5})`}
      >
        {points.map((
          pointsDict,
          index,
        ) => <Path {...pointsDict} key={index} />)}
      </g>
    </Svg>
  );
};
