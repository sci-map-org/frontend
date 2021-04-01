import { Box } from '@chakra-ui/react';
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
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { useElementSize } from '../../util/useElementSize';

export enum SubGoalStatus {
  Completed = 'Completed',
  Available = 'Available',
  Locked = 'Locked',
}

export type NodeData<T> = Partial<NodeOptions> & {
  meta: { data: T; status: SubGoalStatus };
};

export type EdgeData<T> = Partial<EdgeOptions> & {
  meta: { data: T };
};

export type DagreViewerProps<N, E> = {
  renderNode: (nodeData: NodeData<N>, sizing: { nodePxWidth: number; nodePxHeight: number }) => React.ReactElement<any>;
  nodes: NodeData<N>[];
  edges: EdgeData<E>[];
  renderingStage?: number;
  minNodeWidth?: number;
  maxNodeWidth?: number;
  nodeHeight: (nodePxWidth: number) => number;
  overflow?: 'visible' | 'hidden';
  horizontalSpacing?: number; // maybe function of something later ?
  verticalSpacing?: number;
  width?: string;
};

export const DagreViewer = <N, E>({
  renderNode,
  nodes,
  edges,
  renderingStage,
  nodeHeight,
  minNodeWidth,
  maxNodeWidth,
  overflow = 'visible',
  horizontalSpacing = 10,
  verticalSpacing = 10,
  width = '100%',
}: PropsWithChildren<DagreViewerProps<N, E>>) => {
  const [localStage, setLocalStage] = useState(0);
  const [showRealDag, setShowRealDag] = useState(false);
  const stage = useMemo(() => {
    return 100 * localStage + (renderingStage || 0);
  }, [localStage, renderingStage]);
  const [dagreWidth, setDagreWidth] = useState<number>();
  const [dagreHeight, setDagreHeight] = useState<number>();
  const [nodePxWidth, setNodePxWidth] = useState<number>();
  const [maxNodesPerRows, setMaxNodesPerRows] = useState<number>();
  const dagreContainerRef = useRef<HTMLDivElement>(null);
  const dagreSize = useElementSize(dagreContainerRef);

  const getNodeWidth = (dagreWidth: number, maxNodesPerRows: number, horizontalSpacing: number) => {
    const fittedNodeWidth = (dagreWidth - (maxNodesPerRows - 1) * horizontalSpacing) / maxNodesPerRows;
    if (maxNodeWidth && fittedNodeWidth > maxNodeWidth) return maxNodeWidth;
    if (minNodeWidth && fittedNodeWidth < minNodeWidth) return minNodeWidth;
    return fittedNodeWidth;
  };

  useEffect(() => {
    setShowRealDag(false);
    dagreSize && maxNodesPerRows && setNodePxWidth(getNodeWidth(dagreSize.width, maxNodesPerRows, horizontalSpacing));

    //TODO: remove once https://github.com/bobthekingofegypt/dagre-reactjs/issues/8 is solved (should avoid hiding the rebuilding)
    // then use setLocalStage(localStage + 1); instead

    setTimeout(() => {
      setShowRealDag(true);
    }, 0);
  }, [dagreSize]);

  useEffect(() => {
    if (!maxNodesPerRows) return;
    dagreSize && setNodePxWidth(getNodeWidth(dagreSize.width, maxNodesPerRows, horizontalSpacing));

    setShowRealDag(true);
  }, [maxNodesPerRows]);

  return (
    <Box ref={dagreContainerRef} w={width} position="relative" height={dagreHeight} overflow={overflow}>
      <Box height={dagreHeight} width={dagreWidth} position="absolute">
        {showRealDag && nodePxWidth && (
          <svg id="dagre" width="100%" height="100%">
            <DagreReact
              nodes={nodes}
              edges={edges}
              renderNode={(node: NodeOptions, reportSize: ReportSize, valueCache: ValueCache) => {
                return (
                  <Node key={node.id} node={node} reportSize={reportSize} valueCache={valueCache} html={true}>
                    {{
                      shape: (innerSize: Size) => <Rect node={node} innerSize={innerSize} />,
                      label: () =>
                        renderNode(node as NodeData<N>, { nodePxWidth, nodePxHeight: nodeHeight(nodePxWidth) }),
                    }}
                  </Node>
                );
              }}
              customPathGenerators={{ d3curve: generatePathD3Curve(nodePxWidth, nodeHeight(nodePxWidth)) }}
              customMarkerComponents={{
                circle: CircleMarker,
              }}
              defaultNodeConfig={{
                styles: {
                  shape: { styles: { borderWidth: 0, stroke: 'unset' } },
                },
              }}
              defaultEdgeConfig={{
                pathType: 'd3curve',
                labelPos: 'c',
                markerType: 'circle',
                styles: {
                  edge: {
                    styles: {
                      strokeWidth: '2px',
                      fill: '#ffffffff',
                    },
                  },
                },
              }}
              graphLayoutComplete={async (w, h) => {
                h && setDagreHeight(h);
                w && setDagreWidth(w);
              }}
              graphOptions={{
                rankdir: 'TB',
                align: 'UL',
                nodesep: horizontalSpacing,
                edgeSep: verticalSpacing,
                ranker: 'tight-tree',
                marginx: 0,
                marginy: 0,
              }}
              stage={stage}
            />
          </svg>
        )}
        {!showRealDag && (
          <svg id="fake_dagre" visibility="hidden">
            <DagreReact
              nodes={JSON.parse(JSON.stringify(nodes))}
              edges={JSON.parse(JSON.stringify(edges))}
              renderNode={(node: NodeOptions, reportSize: ReportSize, valueCache: ValueCache) => {
                return (
                  <Node key={node.id} node={node} reportSize={reportSize} valueCache={valueCache} html={true}>
                    {{
                      shape: (innerSize: Size) => <Rect node={node} innerSize={innerSize} />,
                      label: () => <Box w="1px" h="1px" />,
                    }}
                  </Node>
                );
              }}
              graphLayoutComplete={async (w, h) => {
                if (w) {
                  setMaxNodesPerRows(w);
                }
              }}
              graphOptions={{
                rankdir: 'TB',
                align: 'UL',
                nodesep: 0,
                edgeSep: 0,
                ranker: 'network-simplex', //'tight-tree',
                marginx: 0,
                marginy: 0,
              }}
              stage={stage}
            />
          </svg>
        )}
      </Box>
    </Box>
  );
};

const getOrigin = (points: Point[], width: number): Point => {
  const [p1, p2] = points;
  const theta = Math.atan((p2.y - p1.y) / (p2.x - p1.x));

  if (theta > Math.PI / 4) {
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
    return { x: 0, y: 0 };
  }
  return {
    x: p2.x - width / 2,
    y: p2.y - (width / 2) * Math.tan(theta),
  };
};

const generatePathD3Curve = (nodeWidth: number, nodeHeight: number) => (points: Array<Point>, ...args: any): string => {
  const origin = getOrigin(points, nodeWidth);

  if (origin.x !== 0) {
    points = [
      {
        x: origin.x,
        y: origin.y + nodeHeight / 2,
      },
      {
        x: origin.x,
        y: points[1].y,
      },
      ...points.slice(1),
    ];
  }

  const destination = getDestination(points, nodeWidth);
  if (destination.x !== 0) {
    points = [
      ...points.slice(0, points.length - 1),
      {
        x: destination.x,
        y: points[points.length - 2].y,
      },
      {
        x: destination.x,
        y: destination.y - nodeHeight / 2,
      },
    ];
  }

  let p: [number, number][] = points.map((point) => [point.x, point.y]);

  if (p.map(([x, y]) => x).every((x) => x === p[0][0])) {
    p = [p[0], p[p.length - 1]];
  }

  const c = d3.line().curve(circleCorners.radius(8))(p);
  return c!;
};

const CircleMarker: React.FC<MarkerProps> = ({ edgeMeta, markerId }) => {
  return (
    <marker id={markerId} markerWidth="20" markerHeight="10" refX="10" refY="10">
      <circle cx="10" cy="10" r="2" style={edgeMeta.styles.marker.styles} />
    </marker>
  );
};
