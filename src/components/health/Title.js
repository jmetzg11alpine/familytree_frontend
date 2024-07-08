import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEndDate,
  setColumnSelected,
  setTimePeriod,
} from '../../store/reducers/healthReducer';
import { getMaxDate, jsonToCSV } from './helpers';

const Title = () => {
  const dispatch = useDispatch();
  const healthData = useSelector((state) => state.healthReducer.healthData);
  const columnSelected = useSelector((state) => state.healthReducer.columnSelected);
  const endDate = useSelector((state) => state.healthReducer.endDate);
  const timePeriod = useSelector((state) => state.healthReducer.timePeriod);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    getMaxDate(dispatch, setMaxDate);
  }, [dispatch]);

  const updateColumnSelected = (e) => {
    dispatch(setColumnSelected(e.target.value));
  };

  const updateTimePeriod = (e) => {
    dispatch(setTimePeriod(e.target.value));
  };

  const updateEndDate = (e) => {
    dispatch(setEndDate(e.target.value));
  };

  const handleExport = () => {
    const csvData = jsonToCSV(healthData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'jesse_health_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='header'>
      <div className='header-title'>Jesse's Health</div>
      <div className='header-form-grouping'>
        <Form.Label>Measurment</Form.Label>
        <Form.Select value={columnSelected} onChange={updateColumnSelected}>
          <option value='pressure'>Blood Pressure</option>
          <option value='weight'>Weight lbs</option>
          <option value='heart_beat'>Heart Beats per Minue</option>
          <option value='coffee'>Cups of Coffee</option>
        </Form.Select>
      </div>
      <div className='header-form-grouping'>
        <Form.Label>Time Period</Form.Label>
        <Form.Select value={timePeriod} onChange={updateTimePeriod}>
          <option value='week'>Week</option>
          <option value='month'>Month</option>
          <option value='all'>All</option>
        </Form.Select>
      </div>
      <div className='header-form-grouping'>
        <Form.Label>End Date</Form.Label>
        {maxDate && endDate && (
          <Form.Control
            type='date'
            value={endDate}
            max={maxDate}
            onChange={updateEndDate}
          />
        )}
      </div>
      <div>
        <Button onClick={handleExport}>Export Data</Button>
      </div>
    </div>
  );
};
export default Title;
