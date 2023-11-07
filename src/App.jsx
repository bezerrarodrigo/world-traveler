import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {Product} from './pages/Product/Product.jsx';
import {Homepage} from './pages/Homepage/Homepage.jsx';
import {Pricing} from './pages/Product/Pricing.jsx';
import {PageNotFound} from './pages/PageNotFound/PageNotFound.jsx';
import {AppLayout} from './pages/AppLayout/AppLayout.jsx';
import Login from './pages/Login/Login.jsx';
import {CityList} from './components/CityList/CityList.jsx';
import {CountryList} from './components/CountryList/CountryList.jsx';
import City from './components/City/City.jsx';
import Form from './components/Form/Form.jsx';
import {CitiesProvider} from './contexts/CitiesContext.jsx';

export default function App() {

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/app" element={<AppLayout/>}>
            <Route path="cities/:id" element={<City/>}/>
            <Route index element={<Navigate replace to="cities"/>}/>
            <Route path="cities" element={<CityList/>}/>
            <Route path="countries" element={<CountryList/>}/>
            <Route path="form" element={<Form/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}