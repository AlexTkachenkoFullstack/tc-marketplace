import React from "react";
import { ITransport } from "types/ITransport";
import styles from './Characteristics.module.scss'
import { BasicCharacteristics } from "./BasicCharacteristics/BasicCharacteristics";
import { TechnicalCharacteristics } from "./TechnicalCharacteristics/TechnicalCharacteristics";

interface ICarInfo{
    carInfo:ITransport
}

export const Characteristics:React.FC<ICarInfo>=({carInfo})=>{
    return(
        <div className={styles.characteristicsSection}>
            <BasicCharacteristics carInfo={carInfo}/>
            <TechnicalCharacteristics carInfo={carInfo}/>
        </div>
    )
}