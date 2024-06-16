import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { DeleteModule, getChartData } from './helpers';
import { Trash } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDeleteModule,
  setSpecificEntry,
  setColumnSelected,
} from '../../store/reducers/healthReducer';

const HealthTable = () => {
  const dispatch = useDispatch();
  const healthData = useSelector((state) => state.healthReducer.healthData);
  const columnSelected = useSelector((state) => state.healthReducer.columnSelected);
  const startDate = useSelector((state) => state.healthReducer.startDate);

  const handleClick = (column) => {
    dispatch(setColumnSelected(column));
  };
  const handleDelete = (entry) => {
    dispatch(setDeleteModule(true));
    dispatch(setSpecificEntry({ id: entry.id, timestamp: entry.timestamp }));
  };

  const clickColumn = { backgroundColor: '#d3d3d3' };

  useEffect(() => {
    getChartData(dispatch, columnSelected, startDate);
  }, [columnSelected, dispatch, startDate]);

  return (
    <div className='health-table-container'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th
              style={columnSelected === 'pressure' ? clickColumn : null}
              className='clickable-column'
              onClick={() => handleClick('pressure')}
            >
              Blood Pressure
            </th>
            <th
              style={columnSelected === 'weight' ? clickColumn : null}
              className='clickable-column'
              onClick={() => handleClick('weight')}
            >
              Weight
            </th>
            <th
              style={columnSelected === 'heart_beat' ? clickColumn : null}
              className='clickable-column'
              onClick={() => handleClick('heart_beat')}
            >
              Heart Beat
            </th>
            <th
              style={columnSelected === 'coffee' ? clickColumn : null}
              className='clickable-column'
              onClick={() => handleClick('coffee')}
            >
              Coffee
            </th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {healthData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.timestamp}</td>
              <td>{entry.pressure}</td>
              <td>{entry.weight}</td>
              <td>{entry.heart_beat}</td>
              <td>{entry.coffee}</td>
              <td>{entry.notes}</td>
              <td>
                <Button
                  variant='link'
                  className='icon-button'
                  onClick={() => handleDelete(entry)}
                >
                  <Trash className='text-danger' />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModule />
    </div>
  );
};
export default HealthTable;
