import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Product} from './pages/Product/Product.jsx';
import {Homepage} from './pages/Homepage/Homepage.jsx';
import {Pricing} from './pages/Product/Pricing.jsx';
import {PageNotFound} from './pages/PageNotFound/PageNotFound.jsx';
import {AppLayout} from './pages/AppLayout/AppLayout.jsx';
import Login from './pages/Login/Login.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/app" element={<AppLayout/>}>
          <Route index element={<p>List of cities</p>}/>
          <Route path="cities" element={<p>List of cities</p>}/>
          <Route path="countries" element={<p>List of countries</p>}/>
          <Route path="form" element={<p>Form</p>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}