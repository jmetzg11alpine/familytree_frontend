import { useEffect } from 'react';
import HealthTable from './HealthTable';
import { getData } from './helpers';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';

const Health = () => {
  const dispatch = useDispatch();
  const endDate = useSelector((state) => state.healthReducer.endDate);
  const timePeriod = useSelector((state) => state.healthReducer.timePeriod);
  console.log(endDate);

  useEffect(() => {
    getData(dispatch, endDate, timePeriod);
  }, [dispatch, timePeriod, endDate]);

  return (
    <div className='health-container'>
      <Header />
      <HealthTable />
    </div>
  );
};
export default Health;
