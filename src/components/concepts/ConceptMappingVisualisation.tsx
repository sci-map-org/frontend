import { Box } from '@chakra-ui/core';
import Cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ConceptWithDependenciesDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { theme } from '../../theme/theme';

const CytoscapeComponent = dynamic(import('react-cytoscapejs'), { ssr: false });
Cytoscape.use(dagre);

export const ConceptMappingVisualisation: React.FC<{
  domainKey: string;
  concepts: ConceptWithDependenciesDataFragment[];
  direction: 'LR' | 'TB' | 'RL' | 'BT';
  width: string;
  height: string;
  layoutPadding?: number;
  layoutRankSep?: number;
  layoutNodeSep?: number;
  layoutNodeDimensionsIncludeLabels?: boolean;
  isLoading?: boolean;
}> = ({
  domainKey,
  concepts,
  direction,
  width,
  height,
  layoutPadding,
  layoutRankSep,
  layoutNodeSep,
  layoutNodeDimensionsIncludeLabels,
  isLoading,
}) => {
  const elements = concepts
    .map((concept) => {
      return [
        { data: { id: concept._id, label: concept.name, conceptKey: concept.key, known: !!concept.known } },
        ...(concept.referencedByConcepts || []).map(({ concept: referencedByConcept }) => ({
          data: {
            id: `${concept._id}_${referencedByConcept._id}`,
            target: concept._id,
            source: referencedByConcept._id,
            label: 'REFERENCES',
          },
        })),
      ];
    })
    .flat();

  const layout = {
    name: 'dagre',
    rankSep: layoutRankSep || 200,
    ranker: 'network-simplex', // 'network-simplex', 'tight-tree' 'longest-path'
    rankDir: direction.split('').reverse().join(''), // Since the arrows direction is not the one expected in a DAG, needs to do that
    animate: false,
    padding: layoutPadding || 10,
    nodeSep: layoutNodeSep || 10,
    nodeDimensionsIncludeLabels: layoutNodeDimensionsIncludeLabels || false,
  };

  return (
    <Box width={width} cursor="pointer">
      {!isLoading && (
        <CytoscapeComponent
          elements={elements}
          layout={layout}
          cy={(cy) =>
            cy.nodes().on('click', (e, data) => {
              const [node] = e.target;
              Router.push(
                '/domains/[key]/concepts/[conceptKey]',
                `/domains/${domainKey}/concepts/${node._private.data.conceptKey}`
              );
            })
          }
          stylesheet={[
            {
              selector: 'node',
              style: {
                backgroundColor: (ele) => (ele.data('known') ? theme.colors.main : 'gray'),
                label: 'data(label)',
              },
            },
            {
              selector: 'edge',
              style: {
                width: 3,
                'curve-style': 'straight',
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
              },
            },
          ]}
          style={{ width, height }}
          minZoom={0.4}
          maxZoom={2}
          userZoomingEnabled={false}
          // @ts-ignore
          userPanningEnabled={false}
          boxSelectionEnabled={false}
          autoungrabify
        />
      )}
    </Box>
  );
};

export const HorizontalConceptMappingVisualisation: React.FC<{
  concepts: ConceptWithDependenciesDataFragment[];
  isLoading?: boolean;
  domainKey: string;
}> = ({ concepts, isLoading, domainKey }) => {
  return (
    <ConceptMappingVisualisation
      domainKey={domainKey}
      direction="LR"
      width="1000px"
      height="400px"
      concepts={concepts}
      layoutNodeSep={40}
      layoutPadding={20}
      isLoading={isLoading}
    />
  );
};

export const VerticalConceptMappingVisualisation: React.FC<{
  concepts: ConceptWithDependenciesDataFragment[];
  width?: string;
  isLoading?: boolean;
  domainKey: string;
}> = ({ concepts, width, isLoading, domainKey }) => {
  return (
    <ConceptMappingVisualisation
      domainKey={domainKey}
      direction="TB"
      width={width || '500px'}
      height="800px"
      concepts={concepts}
      layoutPadding={2}
      layoutNodeSep={6}
      layoutNodeDimensionsIncludeLabels
      isLoading={isLoading}
    />
  );
};
