import { useEffect, useState } from 'react';
import { CustomMap, getData } from './helpers';
import ToolTip from './ToolTip';

const FamilyMap = () => {
  const [data, setData] = useState(null);
  const [content, setContent] = useState('');
  const [screenPoint, setScreenPoint] = useState('');
  const [showToolTip, setShowToolTip] = useState(false);
  useEffect(() => {
    getData(setData);
  }, []);
  return (
    <>
      <CustomMap
        data={data}
        setContent={setContent}
        setScreenPoint={setScreenPoint}
        setShowToolTip={setShowToolTip}
      />
      {showToolTip && <ToolTip screenPoint={screenPoint} content={content} />}
    </>
  );
};
export default FamilyMap;
