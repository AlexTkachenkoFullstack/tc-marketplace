import { useRef, useState } from 'react'
import style from './CatalogCard.module.scss'
import clockSvg from 'assets/icons/clock.svg'
import { CommonBtn } from 'components/Buttons/CommonBtn'
import LikeImg from 'assets/icons/favorite.svg';
import add from 'assets/icons/add.svg'
import ActiveLikeImg from 'assets/icons/favorite-active.svg';
import option_dots from 'assets/icons/option_dots.svg'
type Props = {
    title: string,
    description: string,
    price: string
    // properties: CarProperty[]
}
type CarProperties = {
    mileage: number,
    city: string,
    transmission: 'auto' | 'handle',
    type: 'bensin' | 'disel' | 'electro'
}
const carProperty: CarProperties = {
    mileage: 1000,
    city: 'Lviv',
    transmission: 'auto',
    type: 'bensin'
}

export default function CatalogCard({ title, description, price }: Props) {
    const [isLiked, setIsLiked] = useState(false)
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    // temp
    const renderProperty = ({ icon, name }: { icon: string, name: string }) => {
        return <div className={style.property}><img src={icon} alt='icon' /><span>{name}</span></div>
    }

    const mileageToString = (mileage: number) => {
        const string = mileage.toString()
        if (string.length < 4) return `${string} км`
        return `${string.split('').slice(0, -3).join('')} тис. км`
    }

    const optionClickHandle = () => {
        setOptionsVisible(prev => !prev)
    }

    return (
        <>
            <div className={style.container}>
                <img src='https://cdn2.riastatic.com/photosnew/auto/photo/volkswagen_touareg__516475592hd.webp' className={style.image} />
                <div className={style.header}>
                    <div>
                        <p className={style.title}>{title}</p>
                        <p className={style.price}>{price}</p>
                    </div>
                    <div>
                        <div className={style.buttons}>
                            <CommonBtn
                                iconPath={isLiked ? ActiveLikeImg : LikeImg}
                                className={style.likeBtn}
                                onClick={() => setIsLiked(!isLiked)}
                            />
                            <button
                                className={style.optionBtn}
                                onClick={optionClickHandle}
                            >
                                <img src={option_dots} alt="" />

                                {optionsVisible && <ul className={style.droplist}>
                                    <li onClick={() => { setModalVisible(true) }}>Don't show me</li>
                                    <li>option 2</li>
                                </ul>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.description}>
                    <div className={style.properties}>
                        {renderProperty({ icon: add, name: mileageToString(carProperty.mileage) })}
                        {renderProperty({ icon: add, name: carProperty.city })}
                        {renderProperty({ icon: add, name: carProperty.transmission })}
                        {renderProperty({ icon: add, name: carProperty.type })}
                    </div>
                    <p className={style.description__text}>{description}</p>
                    <div className={style.date}>
                        <img src={clockSvg} alt="icon" />
                        <span>вчора о 12:00</span>
                    </div>
                </div>
            </div>
            {modalVisible && <div className={style.modal} onClick={(e) => {
                if (e.target === modalRef.current || modalRef.current!.contains(e.target as Node)) return
                setModalVisible(false)
            }} >
                <div className={style.modal__content} ref={modalRef}>
                    <p>are you sure?</p>
                    <button>yes</button>
                    <button>no</button>
                </div>
            </div>}
        </>

    )
}