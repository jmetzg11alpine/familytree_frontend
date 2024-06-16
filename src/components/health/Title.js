import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setColumnSelected } from '../../store/reducers/healthReducer';
import { jsonToCSV } from './helpers';

const Title = () => {
  const dispatch = useDispatch();
  const healthData = useSelector((state) => state.healthReducer.healthData);
  const columnSelected = useSelector((state) => state.healthReducer.columnSelected);
  const startDate = useSelector((state) => state.healthReducer.startDate);

  const updateColumnSelected = (e) => {
    dispatch(setColumnSelected(e.target.value));
  };

  const updateStartDate = (e) => {
    console.log(e.target.value);
    dispatch(setStartDate(e.target.value));
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
    <div className='header d-flex align-items-center justify-content-between'>
      <div className='header-info'>
        <div className='header-title'>Jesse's Health</div>
        <div className='header-viewing'>
          <Form.Select value={columnSelected} onChange={updateColumnSelected}>
            <option value='pressure'>Blood Pressure</option>
            <option value='weight'>Weight lbs</option>
            <option value='heart_beat'>Heart Beats per Minue</option>
            <option value='coffee'>Cups of Coffee</option>
          </Form.Select>
        </div>
      </div>
      <div className='header-date-picker'>
        <Form.Label>Start Date</Form.Label>
        <Form.Control type='date' value={startDate} onChange={updateStartDate} />
      </div>
      <div>
        <Button onClick={handleExport}>Export Data</Button>
      </div>
    </div>
  );
};
export default Title;
