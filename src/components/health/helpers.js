import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setHealthData,
  setNewEntry,
  setSubmitModule,
  setDeleteModule,
  setChartData,
  setEndDate,
} from '../../store/reducers/healthReducer';
import { defaultNewEntry } from '../../store/reducers/healthReducer';
const url = process.env.REACT_APP_URL;

export const getMaxDate = async (dispatch, setMaxDate) => {
  const response = await fetch(`${url}get_health_max_date`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const resp = await response.json();
  const date = resp.split('T')[0];
  dispatch(setEndDate(date));
  setMaxDate(date);
};

export const getData = async (dispatch, endDate, timePeriod) => {
  const response = await fetch(`${url}get_health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endDate, timePeriod }),
  });
  const resp = await response.json();
  dispatch(setHealthData(resp.data));
};

export const getChartData = async (dispatch, column, endDate, timePeriod) => {
  console.log(endDate);
  const response = await fetch(`${url}get_health_chart_data`, {
    method: 'POST',
    body: JSON.stringify({ column, endDate, timePeriod }),
  });
  const data = await response.json();
  dispatch(setChartData(data.data));
};

const addEntry = async (newEntry) => {
  const response = await fetch(`${url}add_health_entry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEntry),
  });
  const data = await response.json();
  console.log(data);
};

const getDayAndHourString = () => {
  const date = new Date();
  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  const hour = date.getHours();
  return `${dayOfWeek}${hour}`;
};

export const SubmitModule = () => {
  const dispatch = useDispatch();
  const submitModule = useSelector((state) => state.healthReducer.submitModule);
  const newEntry = useSelector((state) => state.healthReducer.newEntry);
  const columnSelected = useSelector((state) => state.healthReducer.columnSelected);
  const [password, setPassword] = useState('');
  const [blockSubmit, setBlockSubmit] = useState(true);
  const [daysHourString, setDaysHourString] = useState('');
  const startDate = useSelector((state) => state.healthReducer.startDate);

  const handleSubmit = () => {
    addEntry(newEntry);
    setBlockSubmit(true);
    dispatch(setSubmitModule(false));
    getData(dispatch, startDate);
    getChartData(dispatch, columnSelected, startDate);
    dispatch(setNewEntry(defaultNewEntry()));
    setPassword('');
  };

  const handleCancel = () => {
    dispatch(setSubmitModule(false));
    setBlockSubmit(true);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setDaysHourString(getDayAndHourString);
  }, []);

  useEffect(() => {
    if (password === daysHourString) {
      setBlockSubmit(false);
    } else {
      setBlockSubmit(true);
    }
  }, [password, daysHourString]);
  return (
    <Modal show={submitModule}>
      <Modal.Header>Submit</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='text' value={password} onChange={handleChange} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={blockSubmit} onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={handleCancel} variant='secondary'>
          Cancle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const deleteEntry = async (id) => {
  const response = await fetch(`${url}delete_health_entry`, {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id }),
  });
  const data = await response.json();
  console.log(data);
};

export const DeleteModule = () => {
  const dispatch = useDispatch();
  const deleteModule = useSelector((state) => state.healthReducer.deleteModule);
  const specificEntry = useSelector((state) => state.healthReducer.specificEntry);
  const [password, setPassword] = useState('');
  const [blockSubmit, setBlockSubmit] = useState(true);
  const [daysHourString, setDaysHourString] = useState('');
  const startDate = useSelector((state) => state.healthReducer.startDate);
  const columnSelected = useSelector((state) => state.healthReducer.columnSelected);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCancel = () => {
    dispatch(setDeleteModule(false));
  };

  const handleDelete = async (id) => {
    deleteEntry(id);
    getData(dispatch, startDate);
    getChartData(dispatch, columnSelected, startDate);
    dispatch(setDeleteModule(false));
    setPassword('');
  };

  useEffect(() => {
    setDaysHourString(getDayAndHourString);
  }, []);

  useEffect(() => {
    if (password === daysHourString) {
      setBlockSubmit(false);
    } else {
      setBlockSubmit(true);
    }
  }, [password, daysHourString]);

  return (
    <Modal show={deleteModule}>
      <Modal.Header>Delete Record</Modal.Header>
      <Modal.Body>
        <div>
          Are you sure you want to delete the record at {specificEntry.timestamp}?
        </div>
        <Form>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='text' value={password} onChange={handleChange} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={blockSubmit}
          variant='danger'
          onClick={() => handleDelete(specificEntry.id)}
        >
          Delete
        </Button>
        <Button onClick={handleCancel} variant='secondary'>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const getYLabel = (column) => {
  switch (column) {
    case 'pressure':
      return 'Systolic Blood Pressure';
    case 'coffee':
      return 'Cups';
    case 'heart_beat':
      return 'Beats per Minute';
    default:
      return 'Pounds';
  }
};

export const jsonToCSV = (json) => {
  const keys = Object.keys(json[0]).filter((key) => key !== 'id');
  const headers = keys.join(',');
  const rows = json.map((obj) => keys.map((key) => `"${obj[key]}"`).join(',')).join('\n');
  return `${headers}\n${rows}`;
};
