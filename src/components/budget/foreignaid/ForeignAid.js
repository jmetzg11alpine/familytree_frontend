import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { createIcon, getData, bounds, Title } from './helpers';
import 'leaflet/dist/leaflet.css';
import './foreignaidmap.css';

const ForeignAid = () => {
  const [mapData, setMapData] = useState([]);
  const [titleData, setTitleData] = useState({
    bar_data: [],
    total_amount: [],
    countries: [],
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [filters, setFilters] = useState({ country: 'all', year: 'all' });

  useEffect(() => {
    getData(setMapData, setTitleData, filters);
  }, [filters]);

  const MapEvents = () => {
    const map = useMapEvents({
      zoomend: () => {
        setMapZoom(map.getZoom());
      },
    });
    return null;
  };
  return (
    <div className='map-container'>
      <Title data={titleData} filters={filters} setFilters={setFilters} />
      {mapData.length > 1 ? (
        <MapContainer
          center={[0, 0]}
          zoom={mapZoom}
          scrollWheelZoom={true}
          style={{ height: '87vh', width: '100%' }}
          maxBounds={bounds}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            noWrap={true}
          />
          <MapEvents />
          {mapData.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={createIcon((point.size * mapZoom) / 10)}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
              }}
            >
              <Popup>{point.text}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
export default ForeignAid;
