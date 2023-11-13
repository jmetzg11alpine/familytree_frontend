import { useEffect, useState } from 'react';

const tester = async (setResponse) => {
  // const url = 'http://localhost:8000/'
  const url = '/backend'

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setResponse(data.message);
  } catch (error) {
    console.error('ERROR!!!!', error)
  }
};
const Container = () => {
  const [response, setResponse] = useState('original');
  useEffect(() => {
    tester(setResponse);
  }, []);
  return <div><div><h1>Family Tree</h1></div><div></div>{response}</div>;
};
export default Container;
