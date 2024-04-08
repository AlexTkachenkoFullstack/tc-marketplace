import React from "react";
import styles from './ItemRightGalleryBigScreen.module.scss'

interface IImage{
    url:string,
}

export const ItemRightGalleryBigScreen: React.FC<IImage> = ({url}) => {

  return ( 
      <div className={styles.imageContainer}>
        <img src={url} alt='auto' className={styles.transportImage} width={304}/>
      </div>   
  )
};
