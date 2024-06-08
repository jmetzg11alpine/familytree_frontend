import { useEffect, useState } from 'react';
import PieChart from './PieChart';
import { Row, Col, Table } from 'react-bootstrap';
import './agency.css';

const defaultData = () => {
  return [
    { name: 'sample', value: 44 },
    { name: 'sample2', value: 22 },
  ];
};

const Agency = () => {
  const [mainData, setMainData] = useState(defaultData);
  const [otherData, setOtherData] = useState(defaultData);
  const [listOther, setListOther] = useState([]);
  const getData = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}agency_budget`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setMainData(data.main_data);
    setOtherData(data.other_data);
    setListOther(data.list_other_budgets);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='agency-container'>
      <Row>
        <Col className='agency-col' xs={12} md={6}>
          <h3>Major Budget 2024</h3>
          {mainData.length > 5 && <PieChart data={mainData} />}
        </Col>
        <Col className='agency-col' xs={12} md={6}>
          <h3>Other Budget 2024</h3>
          {otherData.length > 5 && <PieChart data={otherData} />}
        </Col>
      </Row>
      <Row className='agency-text-container'>
        <div className='ps-4 pb-2'>
          *Most of the Treasury's budget goes towards national and public debt.
        </div>
        <div className='agency-text-table-container'>
          <Table striped bordered hover size='sm' responsive='sm'>
            <thead>
              <tr>
                <th>#</th>
                <th>{`Samllest ${listOther.length} Agencies`}</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {listOther.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
    </div>
  );
};
export default Agency;
