import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { setSelectedFilters } from '../../store/reducers/logisticsReducer';
const endDate = process.env.REACT_APP_LOGISTICS_END_DATE;
const startDate = process.env.REACT_APP_LOGISTICS_START_DATE;

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.logisticsReducer.filters);
  const selectedFilters = useSelector((state) => state.logisticsReducer.selectedFilters);

  const updateFilter = (e) => {
    const { name, value } = e.target;
    dispatch(setSelectedFilters({ [name]: value }));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Start Location</Form.Label>
            <Form.Select
              name='start_location'
              value={selectedFilters.start_location}
              onChange={updateFilter}
            >
              {filters.start_location.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>End Location</Form.Label>
            <Form.Select
              name='end_location'
              value={selectedFilters.end_location}
              onChange={updateFilter}
            >
              {filters.end_location.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Customer</Form.Label>
            <Form.Select
              name='customer'
              value={selectedFilters.customer}
              onChange={updateFilter}
            >
              {filters.customer.map((customer, index) => (
                <option key={index} value={customer}>
                  {customer}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Sales</Form.Label>
            <Form.Select
              name='sales'
              value={selectedFilters.sales}
              onChange={updateFilter}
            >
              {filters.sales.map((sales, index) => (
                <option key={index} value={sales}>
                  {sales}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Time Period</Form.Label>
            <Form.Select
              name='time_period'
              value={selectedFilters.time_period}
              onChange={updateFilter}
            >
              {filters.time_period.map((period, index) => (
                <option key={index} value={period}>
                  {period}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type='date'
              name='end_date'
              value={selectedFilters.end_date}
              onChange={updateFilter}
              min={startDate}
              max={endDate}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};
export default Filters;
