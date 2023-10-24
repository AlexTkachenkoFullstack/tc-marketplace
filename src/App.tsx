import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './styles/main.scss';

import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from 'pages/Favourites';
// import { SignUpPage } from 'pages/LoginPage/SignUpPage/SignUpPage';
import { LoginLayout } from 'pages/LoginPage/LoginLayout';
import { SignUpPage } from 'pages/LoginPage/SignUpPage/SignUpPage';
import { LoginPage } from 'pages/LoginPage/LoginPage/LoginPage';
import { ConfirmEmailPage } from 'pages/LoginPage/ConfirmEmailPage/ConfirmEmailPage';
import { RecoverPasswordPage } from 'pages/LoginPage/RecoverPasswordPage/RecoverPasswordPage';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="login/" element={<LoginLayout />}>
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="log-in" element={<LoginPage />} />
            <Route path="finish-registration" element={<ConfirmEmailPage />} />
            <Route path="recover" element={<RecoverPasswordPage />} />
          </Route>

          <Route path="favorites" element={<FavoritesPage />} />

        </Route>
      </Routes>
    </>
  );
};
