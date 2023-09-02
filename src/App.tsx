import Favorite from './pages/Favorite';
import Layout from './layouts';
import Home from './pages/Home';
import Register from './pages/Register';
import Basket from './pages/Basket';
import AddAdvertisementPage from './pages/AddAdvertisementPage';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProductCategory } from 'types';
import ProductsPage from 'pages/ProductsPage/ProductsPage';
import ProductDetailsPage from 'pages/ProductDetailsPage/ProductDetailsPage';

console.log(ProductCategory)
const App: React.FC=(props)=>{
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='register' element={<Register/>}/>
{/* -------------усі товари певної категорії----------- */}
            {Object.values(ProductCategory).map((category)=>(<Route key={category} path={category} element={<ProductsPage category={category}/>}/>))}
{/* -------------один товар певної категоріі------------- */}
            {Object.values(ProductCategory).map((category)=>(<Route key={category} path={category+'/:productId'} element={<ProductDetailsPage />}/>))}
            <Route path='favorite' element={<Favorite/>}/>
            <Route path='basket' element={<Basket/>}/>
            <Route path='addAdvertisement' element={<AddAdvertisementPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  );
}

export default App;
