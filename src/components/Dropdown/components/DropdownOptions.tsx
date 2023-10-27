import React from 'react'
import styles from './DropdownOptions.module.scss'
import cyrillicToTranslit from 'cyrillic-to-translit-js';

type Props = {
    options: string[],
    changeOption: (option: string) => void;
    filterValue: string;
    checkboxAllowed?: boolean;
    checkboxHandler: (option: string) => void;
    checkedValue: string[];

}

export default function DropdownOptions({ options, changeOption, filterValue, checkboxAllowed, checkedValue, checkboxHandler }: Props) {

    const filterOptionsFunc = (text: string) => {
        if (filterValue.length === 0) return true

        const translit = cyrillicToTranslit()
        const translitUa = cyrillicToTranslit({ preset: 'uk' })

        const optionValue = text.toLowerCase()
        const checkValue = filterValue.toLowerCase().trim()

        const cyrillicPattern = /^[\u0400-\u04FF]+$/;

        if (cyrillicPattern.test(filterValue)) {
            if (optionValue.includes(checkValue)) return true
            if (optionValue.includes(translitUa.transform(checkValue))) return true
            return optionValue.includes(translit.transform(checkValue))
        }
        if (optionValue.includes(translit.reverse(checkValue))) return true
        if (optionValue.includes(translitUa.reverse(checkValue))) return true
        return optionValue.includes(checkValue)
    }

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as typeof e.target & {
            type: string,
            innerText: string
        }
        if (target.type === 'checkbox') return
        changeOption(target.innerText.trim())
    }

    if (options.length === 0) return (
        <ul className={styles.list}>
            <li className={styles.listItem}>
                <span className={`${styles.listLink} ${styles.listLink_inactive}`}>no matches found</span>
            </li>
        </ul>
    )

    return (
        <ul className={styles.list}>
            {<li className={styles.listItem}>

                {checkboxAllowed && <div
                    className={
                        checkedValue.length === 0 ?
                            `${styles.listLink_checked} ${styles.listLink}`
                            : styles.listLink
                    }
                    onClick={() => { checkboxHandler('none') }}
                >
                    <input
                        type="checkbox"
                        checked={checkedValue.length === 0}
                        onChange={() => { checkboxHandler('none') }}
                    />

                    {/* here need to replace "select all" with value from props, will discuse this later */}
                    <span>select all</span>
                </div>
                }

            </li>}
            {options.filter(filterOptionsFunc).map(currentOption => (
                <li className={styles.listItem} key={currentOption}>

                    <div
                        className={checkedValue.includes(currentOption) ? `${styles.listLink} ${styles.listLink_checked}` : styles.listLink}
                        onClick={clickHandler}
                    >
                        {checkboxAllowed && <input
                            type="checkbox"
                            checked={checkedValue.includes(currentOption)}
                            onChange={() => {
                                checkboxHandler(currentOption)
                            }}
                        />}
                        <span> {currentOption}</span>
                    </div>
                </li>))}
        </ul>
    )

}