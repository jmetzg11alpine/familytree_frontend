import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import '../../chartConfig.js';
import { useSelector } from 'react-redux';
import { grapherHelper } from './helpers.js';

const LineGraph = () => {
  const [data, setData] = useState(null);
  const [button, setButton] = useState('orders');
  const orderCount = useSelector((state) => state.logisticsReducer.data.order_count);
  const unitCount = useSelector((state) => state.logisticsReducer.data.unit_count);
  const margin = useSelector((state) => state.logisticsReducer.data.margin);
  const labelRef = useRef(grapherHelper(button));
  useEffect(() => {
    if (button === 'orders') {
      setData(orderCount);
    } else if (button === 'units') {
      setData(unitCount);
    } else {
      setData(margin);
    }
    labelRef.current = grapherHelper(button);
  }, [button, orderCount, unitCount, margin]);

  const chartData = {
    datasets: [
      {
        label: labelRef.current,
        data: data,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.6,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: labelRef.current,
        },
        ticks: {
          callback: function (value) {
            if (button === 'margin') {
              return value + '%';
            }
            return value.toLocaleString();
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className='graph-item line-container'>
      <div className='title'>{labelRef.current}</div>
      <div className='graph-container'>
        <Line data={chartData} options={options} />
      </div>
      <div className='button-container'>
        <Button
          size='sm'
          className={`btn-custom ${button === 'orders' ? 'active' : ''}`}
          onClick={() => setButton('orders')}
        >
          Orders
        </Button>
        <Button
          size='sm'
          className={`btn-custom ${button === 'units' ? 'active' : ''}`}
          onClick={() => setButton('units')}
        >
          Units
        </Button>
        <Button
          size='sm'
          className={`btn-custom ${button === 'margin' ? 'active' : ''}`}
          onClick={() => setButton('margin')}
        >
          Margin
        </Button>
      </div>
    </div>
  );
};
export default LineGraph;
