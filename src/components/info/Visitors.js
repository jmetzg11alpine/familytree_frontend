import { useRef, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  select,
  scaleBand,
  axisBottom,
  max,
  min,
  range,
  scaleLinear,
  axisLeft,
  line,
  curveBasis,
  format,
} from 'd3';

const getData = async (setData, timeRange) => {
  const url = process.env.REACT_APP_URL;
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

  const graphHeight = size.height * 0.92;
  const titleHeight = size.height * 0.08;
  const margin = {
    left: size.width * 0.05,
    right: size.width * 0.02,
    top: graphHeight * 0.04,
    bottom: graphHeight * 0.09,
  };
  useEffect(() => {
    if (data && d3Container.current) {
      const svg = select(d3Container.current);
      svg.selectAll('*').remove();
      svg.attr('width', size.width).attr('height', graphHeight);
      const xAxis = scaleBand()
        .range([margin.left, size.width - margin.right])
        .domain(data.map((d) => d.date));
      svg
        .append('g')
        .attr('transform', `translate(0, ${graphHeight - margin.bottom})`)
        .call(axisBottom(xAxis).tickSize(0))
        .selectAll('text')
        .attr('transform', `translate(-10, 0)rotate(-45)`)
        .style('text-anchor', 'end');
      const maxCount = max(data, (d) => d.count) + 2;
      const minCount = min(data, (d) => d.count, 0);
      const calculateTickInterval = (maxCount) => {
        if (maxCount - minCount <= 15) return 1;
        if (maxCount - minCount <= 25) return 5;
        return 10;
      };
      const tickInterval = calculateTickInterval(maxCount);
      const tickValues = range(minCount, maxCount + 1, tickInterval);
      const yAxis = scaleLinear()
        .domain([maxCount, minCount])
        .range([margin.top, graphHeight - margin.bottom]);
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          axisLeft(yAxis).tickValues(tickValues).tickFormat(format('d')).tickSizeOuter(0)
        );
      const dataLine = line()
        .x((d) => xAxis(d.date) + xAxis.bandwidth() / 2)
        .y((d) => yAxis(d.count))
        .curve(curveBasis);
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#304d6d')
        .attr('stroke-width', 3)
        .attr('d', dataLine);
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
        <h3 className='mx-2'>Unique Visitors</h3>
        <div style={{ display: 'flex' }}>
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
      </div>
      <svg ref={d3Container} />
    </div>
  );
};
export default Visitors;
