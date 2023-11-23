import {createContext, useContext, useEffect, useReducer} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:3000";


const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {...state, isLoading: true}
    case "cities/loaded":
      return {...state, isLoading: false, cities: action.payload}
    case "city/loaded":
      return {...state, isLoading: false, currentCity: action.payload}
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case "city/deleted":
      return {
        ...state, isLoading: false, cities: state.cities.filter((city) => {
          return city.id !== action.payload;
        }), currentCity: {}
      }
    case "rejected":
      return {...state, isLoading: false, error: action.payload}
    default:
      throw new Error("Unknown action type.")
  }

}

function CitiesProvider({children}) {

  const [{
    cities,
    isLoading,
    currentCity,
    error
  }, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    async function getCities() {
      dispatch({type: "loading"})
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({
          type: "cities/loaded",
          payload: data
        })
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities..."
        })
      }
    }

    getCities();
  }, []);

  async function getCity(id) {

    if (id === currentCity.id) return;
    console.log(Number(id), currentCity.id)

    dispatch({type: "loading"})
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({
        type: "city/loaded",
        payload: data
      })
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city."
      })
    }
  }

  async function addCity(newCity) {
    dispatch({type: "loading"})
    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({
        type: "city/created",
        payload: data
      })
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city!"
      })
    }
  }

  async function deleteCity(id) {
    dispatch({type: "loading"})
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "city/deleted",
        payload: id
      })
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the data!"
      })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of CitiesProvider scope.");
  return context;
}

export {CitiesProvider, useCities};
