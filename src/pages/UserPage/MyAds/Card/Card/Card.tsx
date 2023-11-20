import styles from './UserPageCard.module.scss'
import clockSvg from 'assets/icons/clock.svg'
import favorite from 'assets/icons/favorite.svg'
import eyeOpen from 'assets/icons/eye-open.svg'
import { CommonBtn } from 'components/Buttons/CommonBtn'
import { convertDate } from 'utils/convertDate';
import add from 'assets/icons/add.svg'
import { ICar } from 'types/IСar'
import { CardProperty } from 'components/CardProperty/CardProperty'

type CardProps = {
    data: ICar,
}

// delete this temp object when logic will be ready
const data = {
    brand: 'brand',
    fileUrl: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
    model: 'model',
    price: 200000,
    views: 20,
    phoneViews: 10,
    likes: 10,
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.Nobis expedita accusantium voluptas soluta libero sit praesentium, et cum corporis facilis!`
}

export default function UserPageCard({
    // data
}: CardProps) {


    const getPriceString = (number: number) => {
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $`;
    }

    return (
        <div className={styles.container}>
            <img alt='car_image' src={data?.fileUrl || 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} className={styles.image} />
            <div className={styles.header}>
                <div>
                    <p className={styles.title}>{`${data?.brand} ${data?.model || 'Model'}`}</p>
                    <p className={styles.price}>{getPriceString(data?.price)}</p>
                </div>
            </div>
            <div className={styles.description}>
                <div className={styles.properties}>
                    {/* to do */}
                    {/* change property params when will be correct type or interface */}
                    <CardProperty icon={eyeOpen} name={`${data.views} переглядів` || 'нема переглядів'} />
                    <CardProperty icon={add} name={`${data.phoneViews}` || 'нема показів телефону'} />
                    <CardProperty icon={favorite} name={data.likes.toString()} />
                    <CardProperty icon={clockSvg} name={convertDate(data.created)} />
                    <CardProperty icon={clockSvg} name={convertDate(data.updated)} />
                </div>
                <p className={styles.description__text}>
                    {data?.description}
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