import { useEffect, useState } from 'react';

const tester = async (setResponse) => {
  const url = 'http://localhost:8000/';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  setResponse(data.message);
};
const Container = () => {
  const [response, setResponse] = useState('');
  useEffect(() => {
    tester(setResponse);
  }, []);
  return <div>{response}</div>;
};
export default Container;
