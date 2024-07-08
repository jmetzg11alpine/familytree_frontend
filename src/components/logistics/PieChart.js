import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import '../../chartConfig.js';

const PieChart = ({ allData }) => {
  const [dataSet, setDataset] = useState('sales_orders');
  const [data, setData] = useState(null);
  useEffect(() => {
    if (allData) {
      if (dataSet === 'sales_orders') {
        setData(allData.sales_orders);
      } else if (dataSet === 'sales_units') {
        setData(allData.sales_units);
      } else if (dataSet === 'customer_orders') {
        setData(allData.customer_orders);
      } else {
        setData(allData.customer_units);
      }
    }
  }, [dataSet, allData]);

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: { padding: 20 },
        onHover: function (event, legendItem) {
          const chart = this.chart;
          chart.canvas.style.cursor = 'pointer';
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className='graph-item pie-container'>
      <div className='title'>Proportions</div>
      <div className='pie-button-graph-container'>
        <div className='pie-buttons'>
          <Button
            size='sm'
            className={`btn-custom ${dataSet === 'sales_orders' ? 'active' : ''}`}
            onClick={() => setDataset('sales_orders')}
          >
            Sales Orders
          </Button>
          <Button
            size='sm'
            className={`btn-custom ${dataSet === 'sales_units' ? 'active' : ''}`}
            onClick={() => setDataset('sales_units')}
          >
            Sales Units
          </Button>
          <Button
            size='sm'
            className={`btn-custom ${dataSet === 'customer_orders' ? 'active' : ''}`}
            onClick={() => setDataset('customer_orders')}
          >
            Customer Orders
          </Button>
          <Button
            size='sm'
            className={`btn-custom ${dataSet === 'customer_units' ? 'active' : ''}`}
            onClick={() => setDataset('customer_units')}
          >
            Customer Units
          </Button>
        </div>
        <div className='pie-graph-container'>
          {data &&
            data.labels &&
            (data.labels.length > 1 ? (
              <Pie options={options} data={data} />
            ) : (
              <div className='pie-100-percent'>100%</div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default PieChart;
