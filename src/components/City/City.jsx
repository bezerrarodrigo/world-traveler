import styles from './City.module.css';
import {useParams, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Spinner from '../Spinner/Spinner.jsx';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));


const BASE_URL = 'http://localhost:3000';

function City() {
  // TEMP DATA
  const currentCity = {
    cityName: 'Lisbon',
    emoji: '🇵🇹',
    date: '2027-10-31T15:59:59.138Z',
    notes: 'My favorite city so far!',
  };

  //states
  const [city, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //router params
  const {id} = useParams();

  //query params
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');


  useEffect(() => {

    async function getCity() {

      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        setCity(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }

    }

    getCity();

  }, [id]);

  const {cityName, emoji, date, notes} = city;

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
      </div>
    </div>
  );
}

export default City;
