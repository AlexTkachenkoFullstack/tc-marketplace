import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/main.scss';

import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { UserPage } from 'pages/UserPage/UserPage';
import { FavoritesPage } from 'pages/Favourites';
import { LoginLayout } from 'pages/LoginPage/LoginLayout';
import { SignUpPage } from 'pages/LoginPage/SignUpPage/SignUpPage';
import { LoginPage } from 'pages/LoginPage/LoginPage/LoginPage';
import { ConfirmEmailPage } from 'pages/LoginPage/ConfirmEmailPage/ConfirmEmailPage';
import { RecoverPasswordPage } from 'pages/LoginPage/RecoverPasswordPage/RecoverPasswordPage';
import { NewPasswordPage } from 'pages/LoginPage/NewPasswordPage/NewPasswordPage';
import { AdvancedSearch } from './pages/AdvancedSearchPage/AdvancedSearch';
import RestrictedRoute from 'components/RestrictedRoute';
import { useAppDispatch } from 'redux/hooks';
import { fetchGoogleUser } from 'helpers/fetchGoogleUser';
import { Dispatch } from '@reduxjs/toolkit';
import { ItemPage } from 'pages/ItemPage';
import { TransportGalleryPage } from 'pages/TransportGalleryPage';
import { NewAnnouncement } from 'pages/NewAnnouncement/NewAnnouncement';
import MyAds from 'pages/UserPage/MyAds';
import Subscriptions from 'pages/UserPage/Subscriptions';
import PersonalInfo from 'pages/UserPage/PersonalInfo';
import Security from 'pages/UserPage/Security';
import StopList from 'pages/UserPage/StopList/StopList';
import UserProfile from 'pages/UserProfile/UserProfile';
export const App: React.FC = () => {
  const dispatch: Dispatch = useAppDispatch();
  useEffect(() => {
    fetchGoogleUser(dispatch);
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" my-adverts element={<Navigate to="/" replace />} />
          <Route path="user/" element={<UserPage />}>
            <Route path="my-adverts" element={<MyAds />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="stop-list" element={<StopList />} />
            <Route path="user-info" element={<PersonalInfo />} />
            <Route path="security" element={<Security />} />
          </Route>
          <Route path="user-profile/:id" element={<UserProfile />} />
          <Route path="advertisements" element={<NewAnnouncement />} />
          <Route path="advertisements/edit" element={<NewAnnouncement />} />
          <Route path="advanced-search" element={<AdvancedSearch />} />
          <Route path="login/" element={<LoginLayout />}>
            <Route
              path="sign-up"
              element={
                <RestrictedRoute redirectTo="/" component={<SignUpPage />} />
              }
            />
            <Route
              path="log-in"
              element={
                <RestrictedRoute redirectTo="/" component={<LoginPage />} />
              }
            />
            <Route
              path="finish-registration"
              element={
                <RestrictedRoute
                  redirectTo="/"
                  component={<ConfirmEmailPage />}
                />
              }
            />
            <Route
              path="recover"
              element={
                <RestrictedRoute
                  redirectTo="/"
                  component={<RecoverPasswordPage />}
                />
              }
            />
            <Route
              path="recover/new"
              element={
                <RestrictedRoute
                  redirectTo="/"
                  component={<NewPasswordPage />}
                />
              }
            />
          </Route>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="catalog/:id/" element={<ItemPage />} />
          <Route
            path="catalog/:id/gallery"
            element={<TransportGalleryPage />}
          />
        </Route>
      </Routes>
    </>
  );
};
