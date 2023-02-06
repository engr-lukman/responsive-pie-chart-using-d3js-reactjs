import * as d3 from 'd3';
import { FC, useEffect, useRef } from 'react';

import Spinner from 'components/Spinner';
import { useResizeObserver } from 'hooks/useResizeObserver';

const PieChart: FC<IChart> = ({ data, svgWrapperRef, padding }) => {
  const dimensions: any = useResizeObserver(svgWrapperRef);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef?.current || !dimensions) return;

    const innerWidth = dimensions?.width;
    const innerHeight = dimensions?.height;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    const svg = d3.select(svgRef?.current);
    svg.selectAll('*').remove();

    const pieGenerator = d3
      .pie<IData>()
      .value(({ value }) => value)
      .sort(null);

    const arcGenerator = d3
      .arc<d3.PieArcDatum<IData>>()
      .innerRadius(0)
      .outerRadius(radius - padding);

    const slices = pieGenerator([...data]);

    // Draw the pie
    svg
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .append('g')
      .attr('transform', `translate(${innerWidth / 2}, ${innerHeight / 2})`)
      .selectAll('path')
      .data(slices)
      .join('path')
      .attr('fill', (d) => d?.data?.fillColor)
      .attr('d', arcGenerator);

    // Draw the legends box
    svg
      .selectAll('.legends')
      .data(slices)
      .join('rect')
      .attr('transform', `translate(${innerWidth - innerWidth * 0.25})`)
      .attr('y', (d, i) => i * 15 + 10)
      .attr('width', 12)
      .attr('height', 12)
      .style('fill', (d) => d?.data?.fillColor);

    // Draw the legends text
    svg
      .selectAll('.legends-text')
      .data(slices)
      .join('text')
      .attr('transform', `translate(${innerWidth - innerWidth * 0.25 + 20})`)
      .attr('y', (d, i) => i * 15 + 20)
      .text((d) => d?.data?.label)
      .style('font-size', 10)
      .style('fill', (d) => d?.data?.fillColor);

    // Draw the arc text
    svg
      .append('g')
      .attr('transform', `translate(${innerWidth / 2}, ${innerHeight / 2})`)
      .selectAll('text')
      .data(slices)
      .join('text')
      .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
      .style('fill', 'white')
      .style('font-size', 10)
      .attr('dy', '5px')
      .text((d) => d?.data?.value);
  }, [data, dimensions]);

  if (!dimensions) {
    return (
      <div className="flex w-full justify-center items-center py-2">
        <Spinner className="text-gray-300 h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="d3js">
      <svg ref={svgRef} />
    </div>
  );
};

interface IData {
  label: string;
  value: number;
  fillColor: string;
}

interface IChart {
  data: IData[];
  svgWrapperRef: any;
  padding: number;
}

export default PieChart;
