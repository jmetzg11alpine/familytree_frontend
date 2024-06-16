import { Row, Col, Button, Form } from 'react-bootstrap';
import { SubmitModule } from './helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setSubmitModule, setNewEntry } from '../../store/reducers/healthReducer';

const FormSection = () => {
  const dispatch = useDispatch();
  const newEntry = useSelector((state) => state.healthReducer.newEntry);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewEntry({ ...newEntry, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(setSubmitModule(true));
  };

  const isAddButtonDisabled = !Object.values(newEntry)
    .filter((field, index) => index !== 5)
    .every((field) => field);
  return (
    <div className='px-2'>
      <Row>
        <h3 className='mt-2'>Submit New Entry</h3>
      </Row>
      <Row className='mb-2'>
        <Col sm={12} md={3}>
          <Form.Label>Date and Time</Form.Label>
          <Form.Control
            type='datetime-local'
            name='timestamp'
            value={newEntry.timestamp}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={3}>
          <Form.Label>Pressure</Form.Label>
          <Form.Control
            type='text'
            name='pressure'
            value={newEntry.pressure}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={3}>
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type='text'
            name='weight'
            value={newEntry.weight}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={3}>
          <Form.Label>Heart Beats</Form.Label>
          <Form.Control
            type='text'
            name='heartBeat'
            value={newEntry.heartBeat}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={3}>
          <Form.Label>Coffee</Form.Label>
          <Form.Control
            type='number'
            name='coffee'
            value={newEntry.coffee}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={6}>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type='text'
            name='notes'
            value={newEntry.notes}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={3} className='d-flex align-self-end'>
          <Button
            className='w-100 submit-button'
            disabled={isAddButtonDisabled}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
      <SubmitModule />
    </div>
  );
};
export default FormSection;
