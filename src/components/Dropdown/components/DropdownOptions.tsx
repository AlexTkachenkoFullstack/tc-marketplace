import React from 'react'
import styles from '../Dropdown.module.scss'
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { link } from 'fs';

type Props = {
    options: string[];
    changeOption: (option: string) => void
    checkedValue: string[],
    setCheckedValue: React.Dispatch<React.SetStateAction<string[]>>,
    checkboxAllowed?: boolean
    filterValue: string
}

export default function DropdownOptions({
    checkboxAllowed,
    options,
    checkedValue,
    setCheckedValue,
    changeOption,
    filterValue
}: Props) {


    // #BIVcomment
    // filter now working with the same value, and cyrilic translit rus, ua (not the best way, will loking for better package)
    const filterOptions = (text: string) => {
        if (filterValue.length === 0) return true

        const translit = cyrillicToTranslit()
        const optionValue = text.toLowerCase()
        const translitUA = cyrillicToTranslit({ preset: 'uk' })
        const checkValue = filterValue.toLowerCase().trim()
        const cyrillicPattern = /^[\u0400-\u04FF]+$/;
        if (cyrillicPattern.test(filterValue)) {
            if (optionValue.includes(checkValue)) return true
            if (optionValue.includes(translitUA.transform(checkValue))) return true
            return optionValue.includes(translit.transform(checkValue))
        }
        if (optionValue.includes(translit.reverse(checkValue))) return true
        if (optionValue.includes(translitUA.reverse(checkValue))) return true
        return optionValue.includes(checkValue)
    }

    if (options.length === 0) return (
        <ul className={styles.list}>
            <li className={styles.listItem}>
                <span className={`${styles.listLink} ${styles.listLink_inactive}`}>no matches found</span>
            </li>
        </ul >
    )
    return (
        <ul className={styles.list}>
            {checkboxAllowed && <li
                className={styles.listItem}
                onClick={() => {
                    setCheckedValue([])
                }}
            >
                <div className={`${styles.listLink} ${checkedValue.length ? '' : styles.listLink_active}`}>
                    <input type='checkbox' checked={checkedValue.length === 0} onChange={() => {
                        setCheckedValue([])
                    }} />
                    <span>select all</span>
                </div>
            </li>}

            {options.filter(filterOptions).map(currentOption => (
                <li className={styles.listItem} key={currentOption}>
                    <div
                        className={styles.listLink + ' ' + (checkedValue.includes(currentOption) ? styles.listLink_active : '')}
                        onClick={(e) => {
                            const target = e.target as typeof e.target & { type: string }
                            if (target.type === 'checkbox') return
                            changeOption(currentOption)
                        }}
                    >
                        {checkboxAllowed && <input
                            type="checkbox"
                            checked={
                                checkedValue.includes(currentOption)
                            }
                            onChange={() => {
                                if (checkedValue.includes(currentOption)) {
                                    setCheckedValue(checkedValue.filter(value => value !== currentOption))
                                    return
                                }
                                setCheckedValue([...checkedValue, currentOption])
                            }} />}
                        <span>{currentOption}</span>
                    </div>
                </li>
            ))}
        </ul>)
}