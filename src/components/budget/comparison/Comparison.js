import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { getData, colors, toggleLine, getButtonStyles } from './helpers';
import '../../../chartConfig.js';
import './styles.css';

const Comparison = () => {
  const [agencies, setAgencies] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [lineData, setLineData] = useState({});

  useEffect(() => {
    getData(setAgencies, setXLabels, setLineData);
  }, []);

  const data = {
    labels: xLabels,
    datasets: agencies.map((agency, index) => {
      const color = colors[index];
      return {
        label: agency,
        data: lineData[agency].map((d) => d[1]),
        borderColor: color,
        backgroundColor: color,
        pointBorderColor: color,
        pointBackgroundColor: color,
        borderWidth: 3,
      };
    }),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '$ Billions',
        },
        ticks: {
          callback: function (value, index, values) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: { padding: 20, font: { size: 18 } },
        onHover: function (event, legendItem) {
          const chart = this.chart;
          chart.canvas.style.cursor = 'pointer';
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return (
              ' ' + tooltipItem.dataset.label + ' $' + tooltipItem.raw.toLocaleString()
            );
          },
        },
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
      },
    },
    datalabels: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Container className='p-4 comparison-container'>
      <Row>
        <Line data={data} options={options} />
      </Row>
    </Container>
  );
};
export default Comparison;
