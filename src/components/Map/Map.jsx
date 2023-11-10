import styles from './Map.module.css';
import {useNavigate} from 'react-router-dom';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import {useEffect, useState} from 'react';
import {useCities} from '../../contexts/CitiesContext.jsx';
import {useGeolocation} from '../../hooks/useGeolocation.js';
import {Button} from '../Button/Button.jsx';
import {useUrlLocation} from '../../hooks/useUrlLocation.js';

export function Map() {

  //cities context
  const {cities} = useCities();

  //hooks
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation(
  );

  const [lat, lng] = useUrlLocation();

  // remember marker position when change location (sync)
  useEffect(() => {
    if(lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  // keep sync
  useEffect(() => {
    if(geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);


  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your position'}
      </Button>}
      <MapContainer className={styles.map} center={mapPosition} zoom={6}
                    scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => {
          return (
            <Marker key={city.id}
                    position={[city.position.lat, city.position.lng]}>
              <Popup>
                {city.emoji} {city.cityName}
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position, 6);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}