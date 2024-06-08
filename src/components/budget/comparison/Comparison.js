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
  const [activeLines, setActiveLines] = useState({});

  useEffect(() => {
    setActiveLines(() => {
      return agencies.reduce((acc, agency, index) => {
        acc[agency] = index === 0 || index === 6;
        return acc;
      }, {});
    });
  }, [agencies]);

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
        hidden: !activeLines[agency],
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
        labels: {
          filter: function (item, chart) {
            return !chart.getDatasetMeta(item.datasetIndex).hidden;
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            console.log(tooltipItem);
            return (
              ' ' + tooltipItem.dataset.label + ' $' + tooltipItem.raw.toLocaleString()
            );
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Container className='p-4 comparison-container'>
      <Row className='mb-3'>
        {agencies.slice(0, 4).map((agency, index) => {
          const buttonStyle = getButtonStyles(activeLines, agency, index);
          return (
            <Col key={agency}>
              <Button
                style={buttonStyle}
                onClick={() => toggleLine(agency, setActiveLines)}
              >
                {agency}
              </Button>
            </Col>
          );
        })}
      </Row>
      <Row className='mb-3'>
        {agencies.slice(4).map((agency, index) => {
          const buttonStyle = getButtonStyles(activeLines, agency, index + 4);
          return (
            <Col kye={agency} sm={3}>
              <Button
                style={buttonStyle}
                onClick={() => toggleLine(agency, setActiveLines)}
              >
                {agency}
              </Button>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Line data={data} options={options} />
      </Row>
    </Container>
  );
};
export default Comparison;
