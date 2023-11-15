import React from 'react';
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
import {AdvancedSearch} from './pages/AdvancedSearchPage/AdvancedSearch'
import RestrictedRoute from 'components/RestrictedRoute';
// import { useAppDispatch } from 'redux/hooks';
// import { loginThunk } from 'redux/auth/operations';

export const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="home" element={<Navigate to="/" replace />} />
                    <Route path="user" element={<UserPage />} />
                    <Route path="advanced-search" element={<AdvancedSearch/>} />
                    <Route path="login/" element={<LoginLayout />}>
                        <Route path="sign-up" element={<RestrictedRoute redirectTo='/' component={<SignUpPage />} />} />
                        <Route path="log-in" element={<RestrictedRoute redirectTo='/' component={<LoginPage />} />} />
                        <Route path="finish-registration" element={<RestrictedRoute redirectTo='/' component={<ConfirmEmailPage />} />} />
                        <Route path="recover" element={<RestrictedRoute redirectTo='/' component={<RecoverPasswordPage />} />} />
                        <Route path="recover/new" element={<RestrictedRoute redirectTo='/' component={<NewPasswordPage />} />} />
                    </Route>
                    <Route path="favorites" element={<FavoritesPage />} />

                </Route>
            </Routes>
        </>
    );
};
