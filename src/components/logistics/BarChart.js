import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import '../../chartConfig.js';

const BarChart = () => {
  const { delivery, process, names } = useSelector(
    (state) => state.logisticsReducer.data.time
  );
  const data = {
    labels: names,
    datasets: [
      {
        label: 'Delivery Time',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: delivery,
      },
      {
        label: 'Proccess Time',
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.6)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: process,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        // labels: { padding: 20 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='graph-item bar-graph-container'>
      <div className='title'>Delivery and Proccessing Time</div>
      <div className='bar-graph-container-graph '>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
export default BarChart;
