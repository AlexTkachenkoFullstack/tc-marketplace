import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './styles/main.scss';

import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from 'pages/Favourites';
import { LoginPage } from 'pages/LoginPage/LoginPage';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="favorites" element={<FavoritesPage />} />

        </Route>
      </Routes>
    </>
  );
};
