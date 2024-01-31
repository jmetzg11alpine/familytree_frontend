import { useEffect, useRef } from 'react';
import { select, scaleBand, scaleLinear, axisBottom, max, axisLeft } from 'd3';
import { useSelector } from 'react-redux';

const Edits = ({ size, data }) => {
  const country = useSelector((state) => state.profileReducer.country);
  const d3Container = useRef(null);
  const graphHeight = size.height * 0.92;
  const titleHeight = size.height * 0.08;
  const margin = {
    left: size.width * 0.05,
    right: size.width * 0.02,
    top: graphHeight * 0.02,
    bottom: graphHeight * 0.16,
  };

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = select(d3Container.current);
      svg.selectAll('*').remove();
      svg.attr('width', size.width).attr('height', graphHeight);
      const xAxis = scaleBand()
        .range([margin.left, size.width - margin.right])
        .domain(data.map((d) => d.name))
        .padding(0.05);
      svg
        .append('g')
        .attr('transform', `translate(0, ${graphHeight - margin.bottom})`)
        .call(axisBottom(xAxis).tickSize(0))
        .selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');
      const yAxis = scaleLinear()
        .domain([max(data, (d) => d.count), 0])
        .range([margin.top, graphHeight - margin.bottom]);
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
        .attr('height', (d) => graphHeight - yAxis(d.count) - margin.bottom)
        .attr('fill', '#63adf2');
    }
  }, [size, margin.left, margin.top, margin.bottom, margin.right, data, graphHeight]);
  return (
    <div>
      <div
        style={{
          height: titleHeight + 'px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3>{country === 'US' ? 'Changes count' : 'Количество изменений'}</h3>
      </div>
      <svg ref={d3Container} />
    </div>
  );
};
export default Edits;
