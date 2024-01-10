import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const CustomMap = ({ data, setContent, setScreenPoint, setShowToolTip }) => {
  const createCustomIcon = (item) => {
    return L.divIcon({
      className: 'custom-dot-marker',
      html: `<div style="background-color: rgba(48, 77, 109, 0.4); border: 1px solid rgb(48, 77, 109); width: ${
        item.size * 6
      }px; height: ${item.size * 6}px; border-radius: 50%;"></div>`,
      iconSize: [item.size * 6, item.size * 6],
      iconAnchor: [(item.size * 6) / 2, (item.size * 6) / 2],
    });
  };

  const MapEvents = () => {
    useMapEvents({
      mousemove(e) {
        setScreenPoint(e.containerPoint);
      },
      mouseout() {
        setShowToolTip(false);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[35, -50]} zoom={3} style={{ height: '95vh', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data &&
        data.map((item, index) => (
          <Marker
            key={index}
            position={[item.coor.lat, item.coor.lng]}
            icon={createCustomIcon(item)}
            eventHandlers={{
              mouseover: (e) => {
                setContent({ name: item.name, location: item.location });
                const containerPoint = e.target._map.mouseEventToContainerPoint(
                  e.originalEvent
                );
                setScreenPoint(containerPoint);
                setShowToolTip(true);
              },
              mouseout: () => {
                setShowToolTip(false);
              },
            }}
          />
        ))}
      <MapEvents />
    </MapContainer>
  );
};

export const getData = async (setData) => {
  const url = process.env.REACT_APP_URL;
  const response = await fetch(`${url}get_coor`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  setData(data);
};
