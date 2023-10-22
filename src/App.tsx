import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/main.scss';

import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from 'pages/Favourites';
// import { useAppDispatch } from 'redux/hooks';
// import { loginThunk } from 'redux/auth/operations';

export const App: React.FC = () => {
//   const dispatch=useAppDispatch()
//   useEffect(()=>{
//     dispatch(loginThunk({email: "oleksandrtkachenko202@gmail.com", password: "Qrtyuiop1"})) 
// }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="favorites" element={<FavoritesPage />} />

        </Route>
      </Routes>
    </>
  );
};
