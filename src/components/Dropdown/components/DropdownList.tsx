import React from 'react'
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import styles from './DropdownList.module.scss'
import { DropdownInfoOption, DropdownNoMatchOption, DropdownOption, DropdownSelectAllOption } from './DropdownOptions';
type Props = {
    checkedValue: string[],
    checkboxAllowed: boolean | undefined,
    filterValue: string,
    options: string[],
    changeOption: (option: string) => void;
    checkboxHandler: (option: string) => void;
    allOptionsLabel?: string
}

export default function DropdownList(props: Props) {
    const { checkedValue, filterValue, checkboxAllowed, options } = props

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

    const filtredOptions = options.filter(filterOptionsFunc)

    return (
        <ul className={styles.list}>
            {checkboxAllowed && !!options.length && <>
                <DropdownInfoOption text='Обрані:' />
                <DropdownSelectAllOption {...props} />
                {checkedValue.map(currentOption =>
                    <DropdownOption
                        {...props}
                        currentOption={currentOption}
                    />
                )}
            </>


            }
            {checkboxAllowed && !!options.length && <DropdownInfoOption text='Весь список:' />
            }            {filtredOptions.length === 0 ?
                <DropdownNoMatchOption />
                : filtredOptions.filter(currentOption => !checkedValue.includes(currentOption)).map(currentOption =>
                    <DropdownOption
                        {...props}
                        currentOption={currentOption}
                        key={currentOption.toLowerCase().trim().replaceAll(' ', '_')}
                    />)}
        </ul>
    )
}
