import Favorite from './pages/Favorite';
import Layout from './layouts';
import Home from './pages/Home';
import Register from './pages/Register';
import Basket from './pages/Basket';
import AddAdvertisementPage from './pages/AddAdvertisementPage';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';



export interface IAppProps{

}

const App: React.FC<IAppProps>=(props)=>{
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='register' element={<Register/>}/>
            <Route path='favorite' element={<Favorite/>}/>
            <Route path='basket' element={<Basket/>}/>
            <Route path='addAdvertisement' element={<AddAdvertisementPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  );
}

export default App;
