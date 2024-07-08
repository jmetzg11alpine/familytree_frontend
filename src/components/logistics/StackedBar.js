import { Bar } from 'react-chartjs-2';
import '../../chartConfig.js';

const StackedBar = ({ data }) => {
  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        onHover: function (event, legendItem) {
          const chart = this.chart;
          chart.canvas.style.cursor = 'pointer';
        },
      },
      title: {
        display: true,
        text: 'Horizontal Stacked Bar Chart',
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };
  return (
    <div className='graph-item stacked-bar-container'>
      <div className='title'>Customer Sales Distribution</div>
      <div className='stacked-bar-container-graph'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
export default StackedBar;
