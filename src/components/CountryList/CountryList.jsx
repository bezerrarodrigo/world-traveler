import styles from './CountryList.module.css';
import Spinner from '../Spinner/Spinner.jsx';
import Message from '../Mesage/Message.jsx';
import CountryItem from '../CountryItem/CountryItem.jsx';

export function CountryList({cities, onLoading}) {

  const countries = cities.reduce((arrCities, city) => {

    if(!arrCities.map(el => el.country).includes(city.country)) {

      return [...arrCities, {country: city.country, emoji: city.emoji}];

    } else {
      return arrCities;
    }

  }, []);


  if(onLoading) return <Spinner/>;

  if(!countries.length) return <Message
    message="Add your first city by clicking on a city on the map!"/>;

  return (
    <ul className={styles.countryList}>
      {countries.map(country => {
        return <CountryItem country={country}/>;
      })}
    </ul>
  );
}