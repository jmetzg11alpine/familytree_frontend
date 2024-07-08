import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from './Filters';
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import MultipleLines from './MultipleLines';
import RoutesTable from './RoutesTable';
import PieChart from './PieChart';
import BarChart from './BarChart';
import OrderTable from './OrderTable';
import { getData } from './helpers';
import './styles.css';
import StackedBar from './StackedBar';

const Logistics = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.logisticsReducer.selectedFilters);
  const filtersRetrieved = useSelector(
    (state) => state.logisticsReducer.filtersRetrieved
  );
  const data = useSelector((state) => state.logisticsReducer.data);

  useEffect(() => {
    getData(dispatch, selectedFilters, filtersRetrieved);
  }, [dispatch, selectedFilters, filtersRetrieved]);
  return (
    <div className='logistics-container'>
      <Filters />
      <div className='graph-container'>
        <InfoBox />
        <LineGraph />
        <MultipleLines data={data.rpm} title={'rpm'} />
        <MultipleLines data={data.warehouse_capacity} title={'warehouse'} />
        <PieChart allData={data.proportions} />
        <RoutesTable data={data.routes} />
        <StackedBar data={data.sales_customers} />
        <BarChart />
      </div>
      <OrderTable data={data.table} />
    </div>
  );
};
export default Logistics;
