import { useEffect } from 'react';
import HealthTable from './HealthTable';
import { getData } from './helpers';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';

const Health = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.healthReducer.startDate);

  useEffect(() => {
    getData(dispatch, startDate);
  }, [dispatch, startDate]);

  return (
    <div className='health-container'>
      <Header />
      <HealthTable />
    </div>
  );
};
export default Health;
