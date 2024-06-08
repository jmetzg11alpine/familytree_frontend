import { useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import '../../../chartConfig.js';

const PieChart = ({ data }) => {
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState('24px');

  useEffect(() => {
    const updateFontSize = () => {
      if (containerRef.current) {
        const style = getComputedStyle(containerRef.current);
        const newFontSize = style.getPropertyValue('--chart-font-size').trim() || '16';
        setFontSize(newFontSize);
      }
    };
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const pieData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.backgroundColor),
        borderColor: new Array(10).fill('#fff'),
        borderWidth: 1,
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
        callbacks: {
            title: function (tooltipItems) {
            const item = data[tooltipItems[0].dataIndex];
            return `${item.tooltip}`;
          },
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },

      datalabels: {
        color: 'black',
        textAlign: 'center',
        font: {
          weight: 'bold',
          size: fontSize,
        },
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <div ref={containerRef} className='agency-pie-container'>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default PieChart;
