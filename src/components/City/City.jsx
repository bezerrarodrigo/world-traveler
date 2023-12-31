import styles from './City.module.css';
import {useParams, useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import Spinner from '../Spinner/Spinner.jsx';
import {useCities} from '../../contexts/CitiesContext.jsx';
import {BackButton} from '../BackButton/BackButton.jsx';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function City() {

  //router params
  const {id} = useParams();

  //context
  const {currentCity, getCity, isLoading} = useCities();

  //query params
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  useEffect(() => {
    getCity(id);
  }, [id]);


  const {cityName, emoji, date, notes} = currentCity;

  if(isLoading) return <Spinner/>;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      <div className={styles.row}>
        <h6>Position:</h6>
        <p>Lat: {lat}, Lng: {lng}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton/>
      </div>
    </div>
  );
}

export default City;
