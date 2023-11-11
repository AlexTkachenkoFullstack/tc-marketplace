import React from 'react'
import styles from './CardProperty.module.scss'
type Props = { icon: string, name?: string }

export const CardProperty = ({ icon, name }: Props) => {
    return (
        <div className={styles.property}><img src={icon} alt='icon' /><span>{name}</span></div>
    )
}