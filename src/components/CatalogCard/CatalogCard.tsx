import { useRef, useState } from 'react'
import styles from './CatalogCard.module.scss'
import clockSvg from 'assets/icons/clock.svg'
import { CommonBtn } from 'components/Buttons/CommonBtn'
import LikeImg from 'assets/icons/favorite.svg';
import add from 'assets/icons/add.svg'
import ActiveLikeImg from 'assets/icons/favorite-active.svg';
import option_dots from 'assets/icons/option_dots.svg'
import { ICar } from 'types/IСar';
import { CardProperty } from 'components/CardProperty/CardProperty';

type Props = {
    car?: ICar
}

export default function CatalogCard({ car }: Props) {
    const [isLiked, setIsLiked] = useState(false)
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const mileageToString = (mileage: number) => {
        const string = mileage.toString()
        if (string.length < 4) return `${string} км`
        return `${string.split('').slice(0, -3).join('')} тис. км`
    }

    const optionClickHandle = () => {
        setOptionsVisible(prev => !prev)
    }

    const getPriceString = (number: number) => {
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $`;
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


    const optionHanler = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        switch (event.currentTarget.innerText) {
            case 'Не показувати цю машину':
                // #BIV 
                // replace here with function
                alert(`here should be don't show car func`);
                break;
            case 'Не показувати повідомлення від цього автора':
                setModalVisible(true)
                break
            default:
                // #BIVcomment
                // temp for test, should shift default to top  
                alert('ooops something go wrong')
                break;
        }
    }

    const modalButtonHundler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        switch (event.currentTarget.innerText) {
            case 'yes':
                alert('here will be bock user func')
                setModalVisible(false)
                break;
            default:
                setModalVisible(false)
        }
    }


    return (
        <>
            <div className={styles.container}>
                <img alt='car_image' src={car?.fileUrl || 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} className={styles.image} />
                <div className={styles.header}>
                    <div>
                        <p className={styles.title}>{`${car?.brand || 'brand'} ${car?.model || 'Model'}`}</p>
                        <p className={styles.price}>{getPriceString(car?.price || 2000000 /* 20000 temp value for test, this should delete */)}</p>
                    </div>
                    <div>
                        <div className={styles.buttons}>
                            <CommonBtn
                                iconPath={isLiked ? ActiveLikeImg : LikeImg}
                                className={styles.likeBtn}
                                onClick={() => setIsLiked(!isLiked)}
                            />
                            <button
                                className={styles.optionBtn}
                                onClick={optionClickHandle}
                                onMouseLeave={() => {
                                    optionsVisible && setOptionsVisible(false)
                                }}
                            >
                                <img src={option_dots} alt="option icon" />

                                {optionsVisible && <ul className={styles.droplist}>
                                    <li onClick={optionHanler}><span>Не показувати цю машину</span></li>
                                    <li onClick={optionHanler}><span>Не показувати повідомлення від цього автора</span></li>
                                </ul>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.properties}>
                        <CardProperty icon={add} name={car?.mileage ? mileageToString(car!.mileage) : 'no mileage'} />
                        <CardProperty icon={add} name={car?.city || 'city'} />
                        <CardProperty icon={add} name={car?.fuelType || 'Fuel type'} />
                        <CardProperty icon={add} name={car?.transmission || 'transmission'} />

                    </div>
                    <p className={styles.description__text}>
                        {car?.description}
                    </p>
                    <div className={styles.date}>
                        <img src={clockSvg} alt="icon" />
                        <span>{getDateString('2023-10-16T18:06:03.932606')}</span>
                    </div>
                </div>
            </div>


            {modalVisible && <div className={styles.modal} onClick={(e) => {
                if (e.target === modalRef.current || modalRef.current!.contains(e.target as Node)) return
                setModalVisible(false)
            }} >
                <div className={styles.modal__content} ref={modalRef}>
                    <p>are you sure?</p>
                    <button onClick={modalButtonHundler}>yes</button>
                    <button onClick={modalButtonHundler}>no</button>
                </div>
            </div>}
        </>

    )
}
