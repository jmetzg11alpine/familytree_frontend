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
    <div className='px-2 mt-2'>
      <Row className='mb-3'>
        <Col sm={12} md={3}>
          <Form.Control
            type='datetime-local'
            name='timestamp'
            value={newEntry.timestamp}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={3}>
          <Form.Control
            type='text'
            name='pressure'
            placeholder='pressure'
            value={newEntry.pressure}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={3}>
          <Form.Control
            type='text'
            name='weight'
            placeholder='weight'
            value={newEntry.weight}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={3}>
          <Form.Control
            type='text'
            name='heartBeat'
            placeholder='heart beat'
            value={newEntry.heartBeat}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={3}>
          <Form.Control
            type='number'
            name='coffee'
            placeholder='coffee'
            value={newEntry.coffee}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md={6}>
          <Form.Control
            type='text'
            name='notes'
            placeholder='notes'
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
