import { useEffect, useMemo, useRef } from 'react';
import { ConceptWithDependenciesDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import * as d3 from 'd3';
import * as d3Force from 'd3-force';

interface MinimapProps {
  concepts: ConceptWithDependenciesDataFragment[];
}
function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

// function dragstart() {
//   d3.select(this).classed('fixed', true);
// }

// function dragged(event, d) {
//   d.fx = clamp(event.x, 0, width);
//   d.fy = clamp(event.y, 0, height);
//   simulation.alpha(1).restart();
// }

// function click(event, d) {
//   delete d.fx;
//   delete d.fy;
//   d3.select(this).classed('fixed', false);
//   simulation.alpha(1).restart();
// }

export const Minimap: React.FC<MinimapProps> = ({ concepts }) => {
  const d3Container = useRef(null);
  const nodes = useMemo(
    () =>
      concepts.map((concept) => {
        return { id: concept._id, label: concept.name, conceptKey: concept.key, known: !!concept.known };
      }),
    []
  );

  const links = useMemo(
    () =>
      concepts
        .map((concept) => {
          return [
            // { data: { id: concept._id, label: concept.name, conceptKey: concept.key, known: !!concept.known } },
            ...(concept.referencedByConcepts || []).map(({ concept: referencedByConcept }) => ({
              target: nodes.findIndex((node) => node.id === concept._id),
              source: nodes.findIndex((node) => node.id === referencedByConcept._id),
              //   data: {
              //     id: `${concept._id}_${referencedByConcept._id}`,
              //     target: concept._id,
              //     source: referencedByConcept._id,
              //     label: 'REFERENCES',
              //   },
            })),
          ];
        })
        .flat(),
    []
  );
  useEffect(() => {
    if (d3Container) {
      console.log(concepts);
      const colorMap: any = {};

      const interp = d3.interpolateRainbow;
      nodes.forEach((node, i) => {
        colorMap[node.id] = interp(i / nodes.length);
      });
      // for (const [i, node] of dag.idescendants().entries()) {
      // }

      const svg = d3.select(d3Container.current).attr('viewBox', [0, 0, 400, 400]);
      const link = svg.selectAll('.link').data(links).join('line').classed('link', true);
      const node = svg
        .selectAll('.node')
        .data(nodes)
        .join('circle')
        .attr('r', 12)
        .attr('fill', (n) => colorMap[n.id])
        .classed('node', true);
      // .classed('fixed', (d) => d.fx !== undefined);

      const tick = () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      };

      // const drag = d3
      //   .drag()
      //   .on('start', function () {
      //     //   console.log(that);
      //     d3.select(this).classed('fixed', true);
      //   })
      //   .on('drag', function (event, d) {
      //     d.fx = clamp(event.x, 0, 400);
      //     d.fy = clamp(event.y, 0, 400);
      //     simulation.alpha(1).restart();
      //   });
      // node.call(drag).on('click', function (d) {
      //   delete d.fx;
      //   delete d.fy;
      //   d3.select(this).classed('fixed', false);
      //   simulation.alpha(1).restart();
      // });

      const simulation = d3
        .forceSimulation()
        .nodes(nodes)
        .force('charge', d3.forceManyBody().strength(-5))
        .force('center', d3.forceCenter(400 / 2, 400 / 2))
        // .force('link', d3.forceLink(links))
        .on('tick', tick);
      console.log('running');
    }
  }, [nodes, links]);
  return <svg ref={d3Container} width="400px" height="400px" />;
};
