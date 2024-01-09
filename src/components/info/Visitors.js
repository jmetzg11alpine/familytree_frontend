import { useRef, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as d3 from 'd3';

const getData = async (setData, timeRange) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
  const response = await fetch(`${url}get_visitors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ timeRange }),
  });
  const data = await response.json();
  setData(data);
};

const buttonStyle = {
  padding: '0 4px',
  margin: '0  2px',
};

const Visitors = ({ size }) => {
  const d3Container = useRef(null);
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('week');

  const handleTimeRange = (timeRange) => {
    setTimeRange(timeRange);
  };

  useEffect(() => {
    getData(setData, timeRange);
  }, [timeRange]);

  console.log(data);
  const graphHeight = size.height * 0.92;
  const titleHeight = size.height * 0.08;
  const margin = {
    left: size.width * 0.08,
    right: size.width * 0.02,
    top: graphHeight * 0.04,
    bottom: graphHeight * 0.09,
  };
  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll('*').remove();
      svg.attr('width', size.width).attr('height', graphHeight);
      const xAxis = d3
        .scaleBand()
        .range([margin.left, size.width - margin.right])
        .domain(data.map((d) => d.date));
      svg
        .append('g')
        .attr('transform', `translate(0, ${graphHeight - margin.bottom})`)
        .call(d3.axisBottom(xAxis).tickSize(0))
        .selectAll('text')
        .attr('transform', `translate(-10, 0)rotate(-45)`)
        .style('text-anchor', 'end');
      const maxCount = d3.max(data, (d) => d.count) + 2;
      const minCount = d3.min(data, (d) => d.count - 2, 0);
      const calculateTickInterval = (maxCount) => {
        if (maxCount - minCount <= 15) return 1;
        if (maxCount - minCount <= 25) return 5;
        return 10;
      };
      const tickInterval = calculateTickInterval(maxCount);
      const tickValues = d3.range(minCount, maxCount + 1, tickInterval);
      const yAxis = d3
        .scaleLinear()
        .domain([maxCount, minCount])
        .range([margin.top, graphHeight - margin.bottom]);
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          d3
            .axisLeft(yAxis)
            .tickValues(tickValues)
            .tickFormat(d3.format('d'))
            .tickSizeOuter(0)
        );
      const line = d3
        .line()
        .x((d) => xAxis(d.date) + xAxis.bandwidth() / 2)
        .y((d) => yAxis(d.count))
        .curve(d3.curveBasis);
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#304d6d')
        .attr('stroke-width', 3)
        .attr('d', line);
    }
  }, [size, margin.left, margin.top, margin.bottom, margin.right, data]);
  return (
    <div>
      <div className='d-flex pt-2' style={{ height: titleHeight + 'px' }}>
        <h3 className='me-5'>Unique Visitors</h3>
        <Button
          style={buttonStyle}
          variant={timeRange === 'week' ? 'info' : 'primary'}
          onClick={() => handleTimeRange('week')}
        >
          Week
        </Button>
        <Button
          style={buttonStyle}
          variant={timeRange === 'month' ? 'info' : 'primary'}
          onClick={() => handleTimeRange('month')}
        >
          Month
        </Button>
        <Button
          style={buttonStyle}
          variant={timeRange === 'all' ? 'info' : 'primary'}
          onClick={() => handleTimeRange('all')}
        >
          All
        </Button>
      </div>
      <svg ref={d3Container} />
    </div>
  );
};
export default Visitors;
