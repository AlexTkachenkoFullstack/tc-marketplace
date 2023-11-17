import React from 'react'
import styles from './UserPageCard.module.scss'
import clockSvg from 'assets/icons/clock.svg'
import favorite from 'assets/icons/favorite.svg'
import eyeOpen from 'assets/icons/eye-open.svg'
import { CommonBtn } from 'components/Buttons/CommonBtn'
import { Button } from 'components/Buttons/Button'
// import { CommonBtn } from 'components/Buttons/CommonBtn'
import add from 'assets/icons/add.svg'

import { ICar } from 'types/IСar'
import { CardProperty } from 'components/CardProperty/CardProperty'

type CardProps = {
    car: {
        fileUrl: string;
        // title: string;
        brand: string,
        model: string,
        price: number;
        views: number;
        phoneViews: number;
        likes: number;
        created: string;
        updated: string;
        description: string;
    }
}
const car: ICar = {
    id: 1234123,
    brand: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, optio natus quis fugit rerum veritatis incidunt obcaecati hic tempore? Laboriosam!',
    model: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, optio natus quis fugit rerum veritatis incidunt obcaecati hic tempore? Laboriosam!',
    year: 1993,
    price: 200000,
    mileage: 1000,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, optio natus quis fugit rerum veritatis incidunt obcaecati hic tempore? Laboriosam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, optio natus quis fugit rerum veritatis incidunt obcaecati hic tempore? Laboriosam!',
    transmission: 'astro',
    fuelType: 'laugh',
    engineDisplacement: 4,
    city: 'Kyiv',
    created: new Date().toDateString(),
    fileUrl: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_640.jpg',
    isFavorite: false
}


export default function UserPageCard({
    car
}: CardProps) {


    const getPriceString = (number: number) => {
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $`;
    }

    const mileageToString = (mileage: number) => {
        const string = mileage.toString()
        if (string.length < 4) return `${string} км`
        return `${string.split('').slice(0, -3).join('')} тис. км`
    }


    const getDateString = (dateString: string) => {
        const today = new Date()
        const carDate = new Date(dateString)
        type date = {
            year: number,
            month: number,
            day: number,
            time?: string
        }
        const dateNow: date = {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
        }
        const objectDate: date = {
            year: carDate.getFullYear(),
            month: carDate.getMonth(),
            day: carDate.getDate(),
            time: `${carDate.getHours()}:${(carDate.getMinutes() < 10 ? '0' : '') + carDate.getMinutes()}`
        }
        if (dateNow.month === objectDate.month &&
            dateNow.day - objectDate.day < 2) {
            return `${dateNow.day - objectDate.day ? 'вчора' : 'сьогодні'} o ${objectDate.time}`
        }
        return carDate.toLocaleString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' })

    }


    return (
        <div className={styles.container}>
            <img alt='car_image' src={car?.fileUrl || 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} className={styles.image} />
            <div className={styles.header}>
                <div>
                    <p className={styles.title}>{`${car?.brand} ${car?.model || 'Model'}`}</p>
                    <p className={styles.price}>{getPriceString(car?.price)}</p>
                </div>
            </div>
            <div className={styles.description}>
                <div className={styles.properties}>
                    {/* to do */}
                    {/* change property params when will be correct type or interface */}
                    <CardProperty icon={eyeOpen} name={`${car.views} переглядів` || 'нема переглядів'} />
                    {/* to do */}
                    {/* change property params when will be correct type or interface */}
                    <CardProperty icon={add} name={`${car.phoneViews}` || 'нема показів телефону'} />
                    {/* to do */}
                    {/* change property params when will be correct type or interface */}
                    <CardProperty icon={favorite} name={car.likes.toString()} />
                    {/* to do */}
                    {/* change property params when will be correct type or interface */}
                    <CardProperty icon={clockSvg} name={getDateString(car.created)} />
                    {/* to do */}
                    {/* change property params when will be correct type or interface 
                    Contact with backend and consult about car update date
                    */}
                    <CardProperty icon={clockSvg} name={getDateString(car.updated)} />
                </div>
                <p className={styles.description__text}>
                    {car?.description}
                </p>
                <div className={styles.description__buttons}>
                    <CommonBtn
                        children={'Редагувати'}
                        className={styles.button_primary}
                        onClick={() => { alert('redact') }}
                    />
                    <CommonBtn
                        children={'Видалити'}
                        className={styles.button_secondary}
                        onClick={() => { alert('delete') }}
                    />

                </div>
            </div>
        </div>
    )
}