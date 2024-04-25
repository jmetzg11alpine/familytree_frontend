import { useEffect, useState } from 'react';
import PieChart from './PieChart';
import { Row, Col } from 'react-bootstrap';
import '../../../styles/agency.css';

const defaultData = () => {
  return [
    { name: 'sample', value: 44 },
    { name: 'sample2', value: 22 },
  ];
};

const Agency = () => {
  const [mainData, setMainData] = useState(defaultData);
  const [otherData, setOtherData] = useState(defaultData);
  const [sentence, setSentence] = useState('');
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
    setSentence(data.sentence);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='agency-container'>
      <Row>
        <Col className='agency-col' xs={12} md={6}>
          <h3>Major Budget Allocations</h3>
          {mainData.length > 5 && <PieChart data={mainData} />}
        </Col>
        <Col className='agency-col' xs={12} md={6}>
          <h3>Other Budget Allocations</h3>
          {otherData.length > 5 && <PieChart data={otherData} />}
        </Col>
      </Row>
      <Row className='agency-text-container'>
        <div>{sentence.one}</div>
        <div>{sentence.two}</div>
      </Row>
    </div>
  );
};
export default Agency;
