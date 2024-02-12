import React from "react";
import styles from './TechnicalCharacteristics.module.scss'
import { ITransport } from "types/ITransport";

interface ICarInfo{
    carInfo:ITransport
}

export const TechnicalCharacteristics:React.FC<ICarInfo>=({carInfo})=>{
    return(
        <div className={styles.characteristicSection}>
            <h4 className={styles.characteristicsTitle}>Технічні характеристики</h4>
            {carInfo.fuelConsumptionCity 
            && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Розхід палива</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>Місто - {carInfo.fuelConsumptionCity}</p>
                 </div>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>Траса - {carInfo.fuelConsumptionHighway}</p>
                 </div>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>Змішаний - {carInfo.fuelConsumptionMixed}</p>
                 </div>
            </div>
            }
            { carInfo.engineDisplacement
               && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Об’єм двигуна</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.engineDisplacement}</p>
                 </div>
            </div>
            }
            {carInfo.enginePower 
               && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Потужність двигуна</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.enginePower} к/с</p>
                 </div>
            </div>
            }
            {carInfo.driveType 
               && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Привід</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.driveType}</p>
                 </div>
            </div>
            }
            {carInfo.numberOfDoors
               && <div className={styles.characteristicsItem}>
                  <p className={styles.characteristicsItemName}>Кількість дверей</p>
                  <div className={styles.characteristicsItemValueContainer}>
                     <p>{carInfo.numberOfDoors}</p>
                  </div>
               </div>
            }
            {carInfo.numberOfSeats
               && <div className={styles.characteristicsItem}>
                 <p className={styles.characteristicsItemName}>Кількість місць</p>
                 <div className={styles.characteristicsItemValueContainer}>
                    <p>{carInfo.numberOfSeats}</p>
                 </div>
            </div>
            }
            {carInfo.accidentHistory
               && <div className={styles.characteristicsItem}>
                     <p className={styles.characteristicsItemName}>Чи був у ДТП</p>
                     <div className={styles.characteristicsItemValueContainer}>
                        <p>{carInfo.accidentHistory}</p>
                     </div>
               </div>
            }
            {carInfo.condition
            &&<div className={styles.characteristicsItem}>
               <p className={styles.characteristicsItemName}>Технічний стан</p>
               <div className={styles.characteristicsItemValueContainer}>
                  <p>{carInfo.condition}</p>
               </div>
            </div>
            }
            {carInfo.importedFrom
               && <div className={styles.characteristicsItem}>
               <p className={styles.characteristicsItemName}>Країна, з якої доставлено</p>
               <div className={styles.characteristicsItemValueContainer}>
                  <p>{carInfo.importedFrom}</p>
               </div>
            </div>
            }
        </div>
    )
}