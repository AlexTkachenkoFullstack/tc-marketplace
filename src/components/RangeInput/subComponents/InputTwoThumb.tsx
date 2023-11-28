import React, { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'
import styles from './InputTwoThumb.module.scss'
type Props = {
    min: number,
    max: number,
    minDistance?: number
    placeholder?: string,
    minValue: number,
    maxValue: number,
    setMinValue: (newValue: number) => void,
    setMaxValue: (newValue: number) => void
}

type InputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: number,
    placeholderText?: string
}

const NumInput = ({ value,
    onChange,
    placeholderText = "Об'єктів"
}: InputProps) => {
    return (
        <input
            type="text"
            name=""
            id=""
            pattern={'/^\d+$/'}
            className={styles.input}
            value={`${value} ${placeholderText}`}
            onFocus={(e) => {
                e.target.value = value.toString()
            }}
            onBlur={(e) => {
                e.target.value = `${value} ${placeholderText}`
            }}
            onChange={onChange} />
    )
}

export default function InputTwoThumb({ min, max, minDistance = 100, placeholder, minValue, maxValue, setMaxValue, setMinValue }: Props) {
    const startMin = min + max * 0.1
    const startMax = max - max * 0.1

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, valueChangeFunc: (newValue: number) => void) => {
        const regex = /^\d+$/;
        if (!regex.test(e.target.value) && !(e.target.value.length === 0)) return
        valueChangeFunc(Number(e.target.value))
    }

    const minValueChange = (newValue: number) => {
        setMinValue(newValue)
    }


    const maxValueChange = (newValue: number) => {
        setMaxValue(newValue)
    }

    useEffect(() => {
        const minTimeoutId = setTimeout(() => {
            if (minValue < min) {
                setMinValue(min)
                return
            }
            if (minValue + minDistance > max) {
                setMaxValue(max)
                setMinValue(max - minDistance)
            }
            if (minValue + minDistance > maxValue) {
                setMaxValue(minValue + minDistance)
            }
        }, 1500)

        return () => clearTimeout(minTimeoutId)
    }, [minValue, 1500])

    useEffect(() => {
        const maxTimeoutId = setTimeout(() => {
            if (maxValue > max) {
                setMaxValue(max)
                return
            }
            if (maxValue - minDistance < min) {
                setMinValue(min)
                setMaxValue(min + minDistance)
                return
            }
            if (maxValue - minDistance < minValue) {
                setMinValue(maxValue - minDistance)
            }
        }, 1500)

        return () => clearTimeout(maxTimeoutId)
    }, [maxValue, 1500])

    return (
        <div>
            <div className={styles.inputs}>
                <NumInput
                    value={minValue}
                    onChange={(e) => { inputHandler(e, minValueChange) }}
                    placeholderText={placeholder}
                />
                <div className={styles.separator} />
                <NumInput
                    value={maxValue}
                    onChange={(e) => { inputHandler(e, maxValueChange) }}
                    placeholderText={placeholder}

                />

            </div>
            <ReactSlider
                className={styles.slider}
                thumbClassName={styles.thumb}
                trackClassName={styles.track}
                defaultValue={[minValue, maxValue]}
                value={[minValue, maxValue]}

                onChange={(value) => {
                    if (value[0] < min) {
                        setMinValue(min)
                        return
                    }
                    if (value[1] > max) {
                        setMaxValue(max)
                        return
                    }
                    setMinValue(value[0])
                    setMaxValue(value[1])

                }}

                max={max}
                min={min}
                ariaLabel={['min value', 'max value']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                pearling
                minDistance={minDistance}
            />
        </div>
    )
}
