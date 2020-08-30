import { Box } from '@chakra-ui/core';
import Cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import dynamic from 'next/dynamic';
import { ConceptWithDependenciesDataFragment } from '../../graphql/concepts/concepts.fragments.generated';

const CytoscapeComponent = dynamic(import('react-cytoscapejs'), { ssr: false });
Cytoscape.use(dagre);

export const ConceptMappingVisualisation: React.FC<{
  concepts: ConceptWithDependenciesDataFragment[];
  direction: 'LR' | 'TB' | 'RL' | 'BT';
  width: string;
  height: string;
  layoutPadding?: number;
  layoutRankSep?: number;
  layoutNodeSep?: number;
  layoutNodeDimensionsIncludeLabels?: boolean;
}> = ({
  concepts,
  direction,
  width,
  height,
  layoutPadding,
  layoutRankSep,
  layoutNodeSep,
  layoutNodeDimensionsIncludeLabels,
}) => {
  const elements = concepts
    .map((concept) => {
      return [
        { data: { id: concept._id, label: concept.name, known: !!concept.known } },
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
    <Box width={width}>
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={[
          {
            selector: 'node',
            style: {
              backgroundColor: (ele) => (ele.data('known') ? 'green' : 'gray'),
              label: 'data(label)',
              //   padding: '0px',
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
        style={{ width, height, backgroundColor: 'rgb(250,250,250)' }}
        minZoom={0.4}
        maxZoom={2}
      />
    </Box>
  );
};

export const HorizontalConceptMappingVisualisation: React.FC<{
  concepts: ConceptWithDependenciesDataFragment[];
}> = ({ concepts }) => {
  return (
    <ConceptMappingVisualisation
      direction="LR"
      width="1000px"
      height="400px"
      concepts={concepts}
      layoutNodeSep={40}
      layoutPadding={20}
    />
  );
};

export const VerticalConceptMappingVisualisation: React.FC<{
  concepts: ConceptWithDependenciesDataFragment[];
  width?: string;
}> = ({ concepts, width }) => {
  return (
    <ConceptMappingVisualisation
      direction="TB"
      width={width || '500px'}
      height="800px"
      concepts={concepts}
      layoutPadding={2}
      layoutNodeSep={6}
      layoutNodeDimensionsIncludeLabels
    />
  );
};
