import styles from './Map.module.css';
import {useNavigate, useSearchParams} from 'react-router-dom';

export function Map() {

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <div className={styles.map}>
        <h1>Map</h1>
        <h2>Position: {lat}, {lng}</h2>
        <button onClick={() => setSearchParams({lat: 23, lng: 50})}>Change position</button>
      </div>
    </div>
  );
}