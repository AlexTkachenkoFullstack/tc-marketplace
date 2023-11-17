import React from 'react';
import Card, { CardProps } from './Card/Card';
import UserPageCard from 'components/UserPageCard/UserPageCard';
import styles from '../MyAds.module.scss';
import CatalogCard from 'components/CatalogCard/CatalogCard';

const dataArray: CardProps['data'][] = [
    {
        imageUrl: "https://images.unsplash.com/photo-1597353946119-888dbb405217?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // title: "Volkswagen Touareg 2021",
        brand: 'Volkswagen',
        model: 'Touareg',
        price: 71500,
        views: 60,
        phoneViews: 32,
        likes: 0,
        createdAt: 'Вчора о 12:00',
        updatedAt: 'Оновлення',
        description: 'Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там '
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1597353946119-888dbb405217?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        brand: 'Volkswagen',
        model: 'Touareg',
        price: 71500,
        views: 60,
        phoneViews: 32,
        likes: 0,
        createdAt: 'Вчора о 12:00',
        updatedAt: 'Оновлення',
        description: 'Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там '
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1597353946119-888dbb405217?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        brand: 'Volkswagen',
        model: 'Touareg',
        price: 71500,
        views: 60,
        phoneViews: 32,
        likes: 0,
        createdAt: 'Вчора о 12:00',
        updatedAt: 'Оновлення',
        description: 'Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там '
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1597353946119-888dbb405217?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        brand: 'Volkswagen',
        model: 'Touareg',
        price: 71500,
        views: 60,
        phoneViews: 32,
        likes: 0,
        createdAt: 'Вчора о 12:00',
        updatedAt: 'Оновлення',
        description: 'Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там '
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1597353946119-888dbb405217?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        brand: 'Volkswagen',
        model: 'Touareg',
        price: 71500,
        views: 60,
        phoneViews: 32,
        likes: 0,
        createdAt: 'Вчора о 12:00',
        updatedAt: 'Оновлення',
        description: 'Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там Якийсь довгий опис чогось там'
    },
];
export const qntActive = dataArray.length;
const ActiveCard: React.FC = () => {

    return (
        <div>
            <CatalogCard />
            {dataArray.length > 0 ? (
                dataArray.map((data, index) => (
                    // <Card key={index} data={data} />
                    <UserPageCard car={{
                        fileUrl: data.imageUrl,
                        model: data.model,
                        brand: data.brand,
                        price: data.price,
                        views: data.views,
                        phoneViews: data.phoneViews,
                        likes: data.likes,
                        created: data.createdAt,
                        updated: data.updatedAt,
                        description: data.description
                    }} />
                ))
            ) : (
                <p className={styles.empty}>На даний момент відсутні активні оголошення</p>
            )}
        </div>
    );
};

export default ActiveCard;