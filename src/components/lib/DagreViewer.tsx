//@ts-ignore
import circleCorners from 'd3-curve-circlecorners';
import * as d3 from 'd3-shape';
import {
  DagreReact,
  EdgeOptions,
  MarkerProps,
  Node,
  NodeOptions,
  Point,
  Rect,
  ReportSize,
  Size,
  ValueCache,
} from 'dagre-reactjs';
import { PropsWithChildren, useState } from 'react';

type NodeData<T> = Partial<NodeOptions> & {
  meta: { data: T };
};

type EdgeData<T> = Partial<EdgeOptions> & {
  meta: { data: T };
};

type DagreViewerProps<N, E> = {
  renderNode: (nodeData: NodeData<N>) => React.ReactElement<any>;
  nodes: NodeData<N>[];
  edges: EdgeData<E>[];
};

export const DagreViewer = <N, E>({ renderNode, nodes, edges }: PropsWithChildren<DagreViewerProps<N, E>>) => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(1000);
  return (
    <svg id="dagre" width={width} height={height} overflow="visible">
      <DagreReact
        nodes={nodes}
        edges={edges}
        renderNode={(node: NodeOptions, reportSize: ReportSize, valueCache: ValueCache) => {
          return (
            <Node key={node.id} node={node} reportSize={reportSize} valueCache={valueCache} html={true}>
              {{
                shape: (innerSize: Size) => <Rect node={node} innerSize={innerSize} />,
                label: () => renderNode(node as NodeData<N>),
              }}
            </Node>
          );
        }}
        customPathGenerators={{ d3curve: generatePathD3Curve }}
        customMarkerComponents={{
          circle: CircleMarker,
        }}
        defaultNodeConfig={{
          styles: {
            shape: { styles: { borderWidth: 0, stroke: 'unset' } },
            // label: { styles: { fill: 'white', fillOpacity: 1 } },
          },
        }}
        defaultEdgeConfig={{
          pathType: 'd3curve',
          labelPos: 'c',
          markerType: 'circle',
          styles: {
            marker: {
              styles: {
                // strokeWidth: "1px",
                fill: '#276749',
              },
            },
            edge: {
              styles: {
                strokeWidth: '2px',
                fill: '#ffffffff',
                stroke: '#276749', //"#8a0000",
              },
            },
          },
        }}
        graphLayoutComplete={(w, h) => {
          w && setWidth(w);
          h && setHeight(h);
        }}
        graphOptions={{
          rankdir: 'TB',
          align: 'UL',
          nodesep: 20,
          edgeSep: 0,
          // ranker: "network-simplex",
          // ranker: "longest-path",
          ranker: 'tight-tree',
          marginx: 0,
          marginy: 0,
        }}
      />
    </svg>
  );
};
const width = 300;
const height = 160;
const getOrigin = (points: Point[], width: number): Point => {
  const [p1, p2] = points;
  const theta = Math.atan((p2.y - p1.y) / (p2.x - p1.x));

  if (
    theta >
    Math.PI / 4
    // (theta > Math.PI / 4 && theta < Math.PI / 2) ||
    // (theta < 0 && -theta > -Math.PI / 4)
  ) {
    return { x: 0, y: 0 };
  }
  return {
    x: p1.x - width / 2,
    y: p1.y - (width / 2) * Math.tan(theta),
  };
};

const getDestination = (points: Point[], width: number): Point => {
  const [p1, p2] = points.slice(points.length - 2, points.length);
  const theta = Math.atan((p2.y - p1.y) / (p2.x - p1.x));

  if (theta > 0) {
    //&& -theta < Math.PI / 4
    return { x: 0, y: 0 };
  }
  return {
    x: p2.x - width / 2,
    y: p2.y - (width / 2) * Math.tan(theta),
  };
};

const generatePathD3Curve = (points: Array<Point>, ...args: any): string => {
  const origin = getOrigin(points, width);

  if (origin.x !== 0) {
    points = [
      {
        x: origin.x,
        y: origin.y + height / 2,
      },
      {
        x: origin.x,
        y: points[1].y,
      },
      ...points.slice(1),
    ];
  }

  const destination = getDestination(points, width);
  if (destination.x !== 0) {
    points = [
      ...points.slice(0, points.length - 1),
      {
        x: destination.x, //origin.x,
        y: points[points.length - 2].y, // destination.y - height / 2  , //points[1].y,
      },
      {
        x: destination.x,
        y: destination.y - height / 2,
      },
    ];
  }

  let p: [number, number][] = points.map((point) => [point.x, point.y]);

  if (p.map(([x, y]) => x).every((x) => x === p[0][0])) {
    p = [p[0], p[p.length - 1]];
  }

  const c = d3.line().curve(circleCorners.radius(8))(p);
  // const c = d3.line().curve(d3.curveLinear)(p);
  return c!;
};

const CircleMarker: React.FC<MarkerProps> = ({ edgeMeta, markerId }) => {
  // return null;
  return (
    <marker id={markerId} markerWidth="20" markerHeight="10" refX="10" refY="10">
      <circle cx="10" cy="10" r="2" style={edgeMeta.styles.marker.styles} />
      {/* style={edgeMeta.styles.marker.styles}  */}
    </marker>
  );
};
