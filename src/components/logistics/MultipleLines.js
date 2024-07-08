import { Line } from 'react-chartjs-2';
import '../../chartConfig.js';
import { grapherHelper } from './helpers.js';

const MultipleLines = ({ data, title }) => {
  const info = grapherHelper(title);
  const chartData = {
    datasets: data,
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        onHover: function (event, legendItem) {
          const chart = this.chart;
          chart.canvas.style.cursor = 'pointer';
        },
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
          text: info.ylabel,
        },
        ticks: {
          callback: function (value) {
            if (title === 'rpm') {
              return '$' + value.toFixed(2);
            }
            return value + '%';
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className='graph-item multiple-line-container'>
      <div className='title'>{info.title}</div>
      <div className='multiple-line-graph'>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
export default MultipleLines;
