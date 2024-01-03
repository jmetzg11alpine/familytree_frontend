import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

export const makeMap = (ref, setContent, setScreenPoint, setShowToolTip, data) => {
  const map = new Map({
    basemap: 'osm',
  });
  const view = new MapView({
    container: ref.current,
    map: map,
    center: [-35, 30],
    zoom: 3,
  });
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);
  data.forEach((item) => {
    const point = {
      type: 'point',
      longitude: item.coor.lng,
      latitude: item.coor.lat,
    };
    const simpleMarkerSymbol = {
      type: 'simple-marker',
      color: [48, 77, 109, 0.4],
      outline: {
        color: [48, 77, 109],
        width: 1,
      },
      size: item.size * 6,
    };
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
      attributes: { name: item.name, location: item.location },
    });
    graphicsLayer.add(pointGraphic);
  });
  view.on('pointer-move', (event) => {
    view.hitTest(event).then((response) => {
      if (response.results.length) {
        setContent(response.results[0].graphic.attributes);
        setScreenPoint(response.screenPoint);
        setShowToolTip(true);
      } else {
        setShowToolTip(false);
      }
    });
  });
  return view;
};

export const getData = async (setData) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV
      : process.env.REACT_APP_PROD;
  const response = await fetch(`${url}get_coor`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  setData(data);
};
