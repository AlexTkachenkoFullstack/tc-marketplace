import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './styles/main.scss';

import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from 'pages/Favourites';
import CatalogCard from 'components/CatalogCard/CatalogCard';

export const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="home" element={<Navigate to="/" replace />} />
                    <Route path='catalogcard' element={<CatalogCard description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas impedit ducimus, quibusdam quia nulla tempora vero obcaecati eaque eligendi voluptatibus voluptatem. Accusamus, quidem? Omnis necessitatibus corrupti fugit non ratione quis, sed dignissimos magni in ducimus sit doloribus excepturi praesentium saepe quasi facere consequatur. Nam praesentium atque quasi odio quas quaerat harum explicabo! Consequatur tempora dolorum magni repellendus ducimus totam dolores ut? Earum alias minima eos odio porro deserunt! Eos ipsum dolor quam laborum. Dolor, sapiente unde, temporibus mollitia nihil error sint enim quibusdam tempora commodi natus nulla illum voluptatum quos assumenda aut laboriosam alias impedit iusto hic accusamus? Doloremque aperiam ipsam labore id repudiandae cum sed culpa soluta minima, corporis quibusdam aliquid voluptatibus, iure laboriosam tempora assumenda. Debitis laudantium ipsa, nam vel inventore quaerat necessitatibus officiis et cumque nisi id nihil hic facere rem autem, error quas sit dolorem, eligendi quis? Iure sequi dicta sunt illum? Voluptate eligendi impedit iusto corrupti placeat, fugit consequatur possimus, cumque nemo, velit quidem harum accusantium sed. Veritatis repudiandae fuga earum quia incidunt accusamus quam, perferendis dicta aliquid ullam doloribus possimus voluptatum, illo ad error sunt sint ratione molestiae quaerat dolore aperiam quibusdam at commodi asperiores. Corporis necessitatibus explicabo voluptatibus modi incidunt, sit et dolore!' title='Volkswagen Touareg 2021' price='71 500 $' />} />
                    <Route path="favorites" element={<FavoritesPage />} />

                </Route>
            </Routes>
        </>
    );
};
