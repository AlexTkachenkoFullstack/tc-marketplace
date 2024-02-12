import React from "react";
import styles from './BasicCharacteristics.module.scss'
import { ITransport } from "types/ITransport";

interface ICarInfo{
    carInfo:ITransport
}

export const BasicCharacteristics:React.FC<ICarInfo>=({carInfo})=>{
    return(
        <div className={styles.characteristicSection}>
            <h4 className={styles.characteristicsTitle}>Основні характеристики</h4>
            {carInfo.bodyType
            && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Тип кузова</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.bodyType}</p>
                 </div>
            </div>
            }
            { carInfo.transmission
            && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Трансмісія</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.transmission}</p>
                 </div>
            </div>
            }
            {carInfo.fuelType &&
            <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Вид палива</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.fuelType}</p>
                 </div>
            </div>
            }
            {carInfo.year 
            && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Рік випуску</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.year}</p>
                 </div>
            </div>
            }
            {carInfo.vincode
            && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Він код</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.vincode}</p>
                 </div>
            </div>
            }
            {carInfo.color
            && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Колір</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.color}</p>
                 </div>
            </div>
            }
        </div>
    )
}