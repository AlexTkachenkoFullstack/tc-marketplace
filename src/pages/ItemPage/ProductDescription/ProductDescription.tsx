import React, { useState } from "react";
import styles from './ProductDescription.module.scss'
import moreIcon from './../../../assets/icons/more.svg'
import lessIcon from './../../../assets/icons/less.svg'

interface IDescription{
    description:string
}

export const ProductDescription:React.FC<IDescription>=({description})=>{
    const [showAllText, setShowAllText]=useState<boolean>(true)

    const toggleButton=()=>{
        setShowAllText(!showAllText)
    }

    return(
        <div className={styles.descriptionSection}>
              <p className={styles.descriptionTitle}>Опис</p>
              <div className={showAllText ? styles.descriptionContainerShort : styles.descriptionContainerAll}>
                    <p className={styles.descriptionText}>{description} </p>
              </div>
              <div className={styles.descriptionButtonContainer}>
                    <button className={styles.buttonShowHide} onClick={toggleButton}>
                        <p className={styles.buttonShowHideText}>{showAllText ? 'Показати більше' : 'Сховати'}</p>
                        <img className={styles.hideShowIcon} src={showAllText ? moreIcon : lessIcon} alt='show/hide description'/>
                    </button>
              </div>
              
        </div>
    )
}