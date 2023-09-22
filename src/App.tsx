/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import './index.css';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from 'pages/Favourites';

export const App: FC = () => {
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
