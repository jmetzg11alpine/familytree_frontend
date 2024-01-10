import { useEffect, useRef } from 'react';
import { select, scaleBand, scaleLinear, axisBottom, max, axisLeft } from 'd3';

const Edits = ({ size, data }) => {
  const d3Container = useRef(null);
  const margin = {
    left: size.width * 0.08,
    right: size.width * 0.02,
    top: size.height * 0.15,
    bottom: size.height * 0.15,
  };

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = select(d3Container.current);
      svg.selectAll('*').remove();
      svg.attr('width', size.width).attr('height', size.height);
      const xAxis = scaleBand()
        .range([margin.left, size.width - margin.right])
        .domain(data.map((d) => d.name))
        .padding(0.05);
      svg
        .append('g')
        .attr('transform', `translate(0, ${size.height - margin.bottom})`)
        .call(axisBottom(xAxis).tickSize(0))
        .selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');
      const yAxis = scaleLinear()
        .domain([max(data, (d) => d.count), 0])
        .range([margin.top, size.height - margin.bottom]);
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(axisLeft(yAxis).tickSizeOuter(0));
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xAxis(d.name))
        .attr('y', (d) => yAxis(d.count))
        .attr('width', xAxis.bandwidth())
        .attr('height', (d) => size.height - yAxis(d.count) - margin.bottom)
        .attr('fill', '#63adf2');
      svg
        .append('text')
        .attr('x', size.width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', `${size.width * 0.03}px`)
        .text('Changes Made by Users');
    }
  }, [size, margin.left, margin.top, margin.bottom, margin.right, data]);
  return (
    <div>
      <svg ref={d3Container} />
    </div>
  );
};
export default Edits;
