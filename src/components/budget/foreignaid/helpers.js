import { Row, Col, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import '../../../chartConfig.js';
import L from 'leaflet';
const url = process.env.REACT_APP_URL;

export const createIcon = (size) => {
  return L.divIcon({
    className: 'budget-custom-dot-marker',
    html: `<div style="width: ${size * 6}px; height: ${size * 6}px;"></div>`,
    iconSize: [size * 6, size * 6],
    iconAnchor: [(size * 6) / 2, (size * 6) / 2],
  });
};

export const getData = async (setMapData, setTitleData, filters) => {
  const response = await fetch(`${url}foreign_aid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  const data = await response.json();
  setMapData(data.map_data);
  setTitleData(data.title_data);
};

const corner1 = L.latLng(-90, -180);
const corner2 = L.latLng(90, 180);
export const bounds = L.latLngBounds(corner1, corner2);

const makeText = (year, country) => {
  if (year === 'all' && country === 'all') {
    return 'USA spenindg abroad (10 yrs.)';
  } else if (year === 'all' && country !== 'all') {
    return `USA spending in ${country} (10 yrs.)`;
  } else if (year !== 'all' && country === 'all') {
    return `USA spending in ${year}`;
  } else {
    return `USA spending in ${country} in ${year}`;
  }
};

export const Title = ({ data, filters, setFilters }) => {
  const barData = data.bar_data;
  const totalAmount = data.total_amount;
  const countries = data.countries;
  return (
    <Row className='budget-map-title'>
      <Col>
        <Selectors countries={countries} filters={filters} setFilters={setFilters} />
      </Col>
      <Col className='foreign-aid-total-container'>
        <Row>{makeText(filters.year, filters.country)}</Row>
        <Row>${totalAmount.toLocaleString('en-US', { maxiumFractionDigits: 0 })}</Row>
      </Col>
      <Col className='foreign-aid-bar-graph-contianer'>
        <BarGraph barData={barData} />
      </Col>
    </Row>
  );
};

const Selectors = ({ countries, filters, setFilters }) => {
  const years = ['all'];
  for (let i = 2015; i < 2025; i++) {
    years.push(i);
  }
  return (
    <div className='foreign-aid-year-selector'>
      <div>
        <Form.Group className='form-row'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            as='select'
            value={filters.country}
            onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value }))}
          >
            <option value=''>Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      <div>
        <Form.Group className='form-row'>
          <Form.Label>Years</Form.Label>
          <Form.Control
            as='select'
            value={filters.year}
            onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

const BarGraph = ({ barData }) => {
  const data = {
    labels: barData.map((tuple) => tuple[0]),
    datasets: [
      {
        data: barData.map((tuple) => tuple[1]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return (
              '$' +
              value.toLocaleString('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
              })
            );
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let value = context.parsed.y;
            let formattedValue = value.toLocaleString('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            });
            return '$' + formattedValue;
          },
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
};
