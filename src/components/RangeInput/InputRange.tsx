import { useState } from 'react'
import InputTwoThumb from './subComponents/InputTwoThumb'
import styles from './InputRange.module.scss'

import shevron from 'assets/icons/arrow-down.svg'
import close from 'assets/icons/close.svg'

type Props = {
    title: string,
    isMulti?: boolean,
    min: number,
    max: number, minValue: number,
    maxValue: number,
    setMinValue: (newValue: number) => void,
    setMaxValue: (newValue: number) => void,
    minDistance?: number,
    placeholder?: string
}

export default function InputRange(props: Props) {

    const [isActive, setIsActive] = useState(false)
    const { title } = props
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h3 className={styles.title_text}>{title}</h3>

                <button onClick={() => {
                    setIsActive(prev => !prev)
                }}
                    className={styles.iconBtn}
                >
                    {isActive ?
                        <img
                            src={shevron}
                            alt="open menu"
                            className={styles.icon}
                        />
                        : <img
                            src={close}
                            alt="close menu"
                            className={styles.icon}
                        />
                    }
                </button>
            </div>
            <div className={`${styles.content} ${isActive ? styles.content_active : ' '}`}>
                <InputTwoThumb {...props} />
            </div>
        </div>
    )
}