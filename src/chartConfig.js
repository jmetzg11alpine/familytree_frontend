import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Filler
);
export default ChartJS;
