import { useEffect, useRef, useState } from 'react';
import Edits from './Edits';
import Visitors from './Visitors';
import HistoryTable from './HistoryTable';
import DisplayInfo from './DisplayInfo';
import '../../styles/info.css';

const getData = async (setEdits, setTable) => {
  const url = process.env.REACT_APP_URL;
  const response = await fetch(`${url}get_info`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  setEdits(data.edits);
  setTable(data.table);
};

const Info = () => {
  const editsRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [edits, setEdits] = useState([]);
  const [table, setTable] = useState([]);
  useEffect(() => {
    getData(setEdits, setTable);
    const updateSize = () => {
      if (editsRef.current) {
        setTimeout(() => {
          const rect = editsRef.current.getBoundingClientRect();
          setSize({
            width: rect.width,
            height: rect.height,
          });
        }, 1);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  return (
    <div className='info-container'>
      <div ref={editsRef} className='info-item'>
        <Edits size={size} data={edits} />
      </div>
      <div className='info-item'>
        <HistoryTable size={size} data={table} />
      </div>
      <div className='info-item'>
        <Visitors size={size} />
      </div>
      <div className='info-item'>
        <DisplayInfo size={size} />
      </div>
    </div>
  );
};
export default Info;
