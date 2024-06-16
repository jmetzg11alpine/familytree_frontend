import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getYLabel } from './helpers';
import '../../chartConfig.js';

const Chart = () => {
  const chartData = useSelector((state) => state.healthReducer.chartData);
  const columnSelected = useSelector((state) => state.healthReducer.columnSelected);

  const minYValue = Math.min(...chartData.map((entry) => entry.y));
  const minYScale = minYValue > 2 ? minYValue - 2 : 0;

  const data = {
    datasets: [
      {
        label: 'My Dataset',
        data: chartData.map((entry) => ({
          x: new Date(entry.x),
          y: entry.y,
          pressure: entry.pressure,
          coffee: entry.coffee,
          weight: entry.weight,
          notes: entry.notes,
          heart_beat: entry.heart_beat,
        })),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgba(75,192,192,0.2)',
        pointBorderColor: 'rgba(75,192,192,1)',
        showLine: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            const { pressure, weight, coffee, heart_beat, notes } = tooltipItem.raw;
            return [
              `Blood Pressure: ${pressure}`,
              `Weight: ${weight}`,
              `Coffee Cups: ${coffee}`,
              `Heart Beats: ${heart_beat}`,
              `notes: ${notes}`,
            ];
          },
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
          tooltipFormat: 'hh:mm MMM dd, yyyy',
          displayFormats: {
            day: 'MMM dd',
          },
        },
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: getYLabel(columnSelected),
        },
        min: minYScale,
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? value : '';
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
};
export default Chart;
