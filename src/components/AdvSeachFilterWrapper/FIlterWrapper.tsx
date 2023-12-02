import React, { useState } from 'react'
import styles from './FilterWrapper.module.scss'

import shevron from 'assets/icons/arrow-down.svg'
import close from 'assets/icons/close.svg'

type Props = {
    title: string;
    children: React.ReactNode
}

export default function FIlterWrapper({ title, children }: Props) {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h4>{title}</h4>
                <button
                    className={styles.iconBtn}
                    onClick={() => {
                        setIsActive(prev => !prev)
                    }}
                >
                    {isActive ?
                        <img
                            src={shevron}
                            alt="open menu icon"
                            className={styles.icon}
                        /> :
                        <img
                            src={close}
                            alt="close menu icon"
                            className={styles.icon}
                        />
                    }
                </button>
            </div>
            <div className={`${styles.content} ${isActive ? styles.content_active : ' '}`}>
                {children}
            </div>
        </div>
    )
}