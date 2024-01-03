import { useEffect, useState, useRef } from 'react';
import ToolTip from './ToolTip';
import { makeMap, getData } from './helpers';
import '@arcgis/core/assets/esri/themes/light/main.css';

const FamilyMap = () => {
  const mapDiv = useRef(null);
  const [data, setData] = useState(null);
  const [view, setView] = useState(null);
  const [showToolTip, setShowToolTip] = useState(false);
  const [content, setContent] = useState('hello');
  const [screenPoint, setScreenPoint] = useState(null);
  useEffect(() => {
    getData(setData);
  }, []);
  useEffect(() => {
    if (!mapDiv.current || !data) return;
    const mapView = makeMap(mapDiv, setContent, setScreenPoint, setShowToolTip, data);
    setView(mapView);
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [data]);
  return (
    <div ref={mapDiv} style={{ height: '95vh', width: '100%' }}>
      <ToolTip showToolTip={showToolTip} screenPoint={screenPoint} content={content} />
    </div>
  );
};
export default FamilyMap;
