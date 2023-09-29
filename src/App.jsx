import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Product} from './pages/Product/Product.jsx';
import {Homepage} from './pages/Homepage/Homepage.jsx';
import {Pricing} from './pages/Product/Pricing.jsx';
import {PageNotFound} from './pages/PageNotFound/PageNotFound.jsx';
import {AppLayout} from './pages/AppLayout/AppLayout.jsx';
import Login from './pages/Login/Login.jsx';
import {CityList} from './components/CityList/CityList.jsx';
import {useEffect, useState} from 'react';

const BASE_URL = 'http://localhost:3000';

export default function App() {

  //states
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/app" element={<AppLayout/>}>
          <Route index element={<CityList cities={cities} onLoading={isLoading}/>}/>
          <Route path="cities" element={<CityList cities={cities} onLoading={isLoading}/>}/>
          <Route path="countries" element={<p>List of countries</p>}/>
          <Route path="form" element={<p>Form</p>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}