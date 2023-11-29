import { useRef, useState } from 'react'
import style from './CatalogCard.module.scss'
import clockSvg from 'assets/icons/clock.svg'
import { CommonBtn } from 'components/Buttons/CommonBtn'
import LikeImg from 'assets/icons/favorite.svg';
import add from 'assets/icons/add.svg'
import ActiveLikeImg from 'assets/icons/favorite-active.svg';
import option_dots from 'assets/icons/option_dots.svg'
import { ICar } from 'types/IСar';

type Props = {
    car?: ICar
}

export default function CatalogCard({ car }: Props) {
    const [isLiked, setIsLiked] = useState(false)
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    // temp
    const renderProperty = ({ icon, name }: { icon: string, name?: string }) => {
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

    // #BIVComment
    // temp description
    const tempFish = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad magni, fugiat saepe totam amet excepturi eligendi dolore! Excepturi nihil, voluptatum corporis beatae praesentium, doloribus quasi voluptate veritatis iure dicta adipisci, quidem ipsa vero. Aliquam, quas sit tenetur expedita illo aliquid quae est dignissimos necessitatibus quo corrupti sequi nostrum qui saepe libero doloremque dicta quod ullam tempore. Eos adipisci voluptates eveniet obcaecati sequi earum doloremque laborum. Beatae quidem nulla dicta, eligendi totam nobis eum dolore distinctio dignissimos omnis odio sit illo saepe! Omnis dolorem possimus minima unde architecto doloremque sed ratione est exercitationem! Eveniet voluptatibus totam doloremque labore maxime, asperiores velit incidunt aut vero magni fugiat cupiditate impedit non sed earum amet magnam unde odit deserunt eum repellat explicabo eius? Id totam odio porro. Hic libero corporis asperiores saepe et sequi dolores ratione possimus fugit! Fugit eius pariatur maxime? Provident perferendis aliquam repellendus fugit, a ut, magni consequuntur error ratione illo at et obcaecati repellat molestias animi ipsa consectetur officia deleniti porro, id cumque veritatis ad illum debitis! Cumque ex fugit recusandae eum eligendi dignissimos, beatae accusantium in rem facere eaque id tempore incidunt a quod quaerat voluptatibus sint, obcaecati quam quidem quasi! Nihil dolores, repellendus totam eos magni fugit ducimus.'
    return (
        <>
            <div className={style.container}>
                <img alt='car_image' src={car?.fileUrl || 'https://cdn2.riastatic.com/photosnew/auto/photo/volkswagen_touareg__516475592hd.webp'} className={style.image} />
                <div className={style.header}>
                    <div>
                        <p className={style.title}>{`${car?.brand || tempFish} ${car?.model || 'Model'}`}</p>
                        <p className={style.price}>{getPriceString(car?.price || 2000000 /* 20000 temp value for test, this should delete */)}</p>
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
                                onMouseLeave={() => {
                                    optionsVisible && setOptionsVisible(false)
                                }}
                            >
                                <img src={option_dots} alt="option icon" />

                                {optionsVisible && <ul className={style.droplist}>
                                    <li onClick={optionHanler}><span>Не показувати цю машину</span></li>
                                    <li onClick={optionHanler}><span>Не показувати повідомлення від цього автора</span></li>
                                </ul>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.description}>
                    <div className={style.properties}>
                        {renderProperty({ icon: add, name: mileageToString(car?.mileage || 9999999) })}
                        {renderProperty({ icon: add, name: car?.city || 'City' })}
                        {renderProperty({ icon: add, name: car?.fuelType || 'Fuel type' })}
                        {renderProperty({ icon: add, name: car?.transmission || 'Transmission' })}
                    </div>
                    <p className={style.description__text}>
                        {/* #BIV
                        temp fish, replace with description
                        from this
                        */}
                        {tempFish}
                    </p>
                    <div className={style.date}>
                        <img src={clockSvg} alt="icon" />
                        <span>{getDateString('2023-10-16T18:06:03.932606')}</span>
                    </div>
                </div>
            </div>


            {modalVisible && <div className={style.modal} onClick={(e) => {
                if (e.target === modalRef.current || modalRef.current!.contains(e.target as Node)) return
                setModalVisible(false)
            }} >
                <div className={style.modal__content} ref={modalRef}>
                    <p>are you sure?</p>
                    <button onClick={modalButtonHundler}>yes</button>
                    <button onClick={modalButtonHundler}>no</button>
                </div>
            </div>}
        </>

    )
}
