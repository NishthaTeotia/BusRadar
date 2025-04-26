import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import styles from './Map.module.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const acIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1534/1534011.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const nonAcIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/401/401061.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function Routing({ userCoords, destCoords }) {
  const map = useMap();

  useEffect(() => {
    if (!userCoords || !destCoords) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(userCoords[0], userCoords[1]), L.latLng(destCoords[0], destCoords[1])],
      lineOptions: { styles: [{ color: 'blue', weight: 5 }] },
      routeWhileDragging: false,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [userCoords, destCoords, map]);

  return null;
}

function Map() {
  const { state } = useLocation();
  const { userLocation, destination, busType } = state || {};

  const [userCoords, setUserCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [buses, setBuses] = useState([]);

  const geocode = async (query, setter) => {
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: query, format: 'json', limit: 1 },
      });

      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setter([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert(`Location not found: ${query}`);
      }
    } catch (err) {
      console.error('Geocode error', err);
    }
  };

  useEffect(() => {
    console.log("Received state from router:", state);
    if (userLocation) geocode(userLocation, setUserCoords);
    if (destination) geocode(destination, setDestCoords);
  }, [userLocation, destination]);

  useEffect(() => {
    const fetchBuses = async () => {
      if (!userCoords || !destCoords || !busType) return;

      try {
        const res = await axios.get('http://localhost:5000/api/buses/filter', {
          params: {
            source: userLocation,
            destination: destination,
            type: busType,
          }
        });

        console.log("Buses from backend:", res.data);
        setBuses(res.data);
      } catch (err) {
        console.error('Error fetching buses:', err);
      }
    };

    fetchBuses();
  }, [userCoords, destCoords, busType, userLocation, destination]);

  if (!userCoords || !destCoords) {
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>Loading map...</p>;
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.busList}>
        <h3 className={styles.busHeading}>Available Buses on this Route:</h3>
        <div className={styles.busItems}>
          {buses.length === 0 ? (
            <p>No buses found for this route.</p>
          ) : (
            buses
              .filter((bus) => bus.type?.toLowerCase() === busType?.toLowerCase())
              .map((bus) => (
                <div key={bus.route_id} className={styles.busCard}>
                  <p><strong>{bus.route_name}</strong></p>
                  <p>Bus Type: {bus.preference}</p>
                  <p>From: {bus.from}</p>
                  <p>To: {bus.to}</p>
                </div>
              ))
          )}
        </div>
      </div>

      <div className={styles.leafletMap}>
        <MapContainer center={userCoords} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={userCoords}><Popup>Your Location</Popup></Marker>
          <Marker position={destCoords}><Popup>Destination</Popup></Marker>
          <Routing userCoords={userCoords} destCoords={destCoords} />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
