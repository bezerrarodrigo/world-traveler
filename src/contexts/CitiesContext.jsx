import {createContext, useContext, useEffect, useState} from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:3000';

function CitiesProvider({children}) {

  //states
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {

    async function getCities() {

      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }

    }

    getCities();

  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }


  return <CitiesContext.Provider value={{
    cities, isLoading, currentCity, getCity,
  }}>
    {children}
  </CitiesContext.Provider>;
}

function useCities() {
  const context = useContext(CitiesContext);
  if(context === undefined) throw new Error(
    'CitiesContext was used outside of CitiesProvider scope.');
  return context;
}

export {CitiesProvider, useCities};