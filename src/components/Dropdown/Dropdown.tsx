import {
    FC, useState, useRef, useCallback, useEffect
} from 'react';
import styles from './Dropdown.module.scss';

import arrowDown from '../../assets/icons/arrow-down.svg';
import close from '../../assets/icons/close.svg';

import useClickOutside from 'helpers/hooks/useClickOutside';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

type Props = {
    label: string;
    startValue: string;
    options: string[];
};

export const Dropdown: FC<Props> = (props) => {
    const {
        label,
        startValue,
        options,
    } = props;

    const [isActive, setIsActive] = useState(false);
    const [option, setOption] = useState(startValue);
    const [filterValue, setfilterValue] = useState('')

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null)

    const changeOption = (newOption: string) => {
        setOption(newOption);
        setIsActive(false);
    };


    const filterValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfilterValue(e.target.value)
    }

    useClickOutside(dropdownRef, useCallback(() => {
        setIsActive(false);
    }, []));

    useEffect(() => {
        setOption(startValue);
    }, [startValue]);


    const renderOptions = (optionsArr: string[]) => {

        if (optionsArr.length === 0) return (
            <li className={styles.listItem}>
                <span className={`${styles.listLink} ${styles.listLink_inactive}`}>no matches found</span>
            </li>
        )

        return optionsArr.map(currentOption => (
            <li className={styles.listItem} key={currentOption}>
                <span
                    className={styles.listLink}
                    onClick={() => {
                        changeOption(currentOption)
                    }}
                >
                    {currentOption}
                </span>
            </li>
        ))
    }


    // #BIVcomment
    // filter now working with the same value, and cyrilic translit (not the best way, will loking for better package)
    // don't working for now with ukranian => english (will implement this in future)
    const filterOptions = (option: string) => {
        if (filterValue.length === 0) return true

        const checkValue = filterValue.toLowerCase().trim()
        const cyrillicPattern = /^[\u0400-\u04FF]+$/;
        // check cyrilic (ua, rus) in search
        if (cyrillicPattern.test(filterValue)) {
            // check for the pure compare
            if (option.toLowerCase().includes(checkValue)) return true
            // check for transliteration compare rus => eng
            return option.toLowerCase().includes(cyrillicToTranslit().transform(checkValue))
        }
        // check for transliteration compare eng=>eng
        if (option.toLowerCase().includes(cyrillicToTranslit().reverse(checkValue))) return true
        // return pure compare eng => eng
        return option.toLowerCase().includes(checkValue)
    }

    useEffect(() => { setfilterValue('') }, [])

    return (
        <div
            className={styles.container}
            ref={dropdownRef}
        >
            {((isActive && filterValue.trim().length === 0) || option !== startValue) && (
                <span className={styles.label}>{label}</span>
            )}

            <button
                className={styles.trigger}
                type="button"
                onClick={(event) => {
                    if (event.target === inputRef.current) return
                    setIsActive((prevState) => !prevState)
                }
                }
            >
                <div className={`${styles.trigger_content} ${isActive ? styles.trigger_content_active : ''}`}
                >

                    {isActive ? <input
                        // #BIVComment
                        // can't use autofocus, because it's create conflict with parrent button and should broke select in list below
                        onKeyUp={(e) => {
                            if (e.key === ' ') { e.preventDefault() }
                        }}
                        className={styles.searchInput}
                        type="text"
                        onChange={filterValueHandler}
                        placeholder={label}
                        value={filterValue}
                        ref={inputRef}

                    /> :
                        <div className={styles.text}>
                            {option}
                        </div>}

                    <div className={styles.icons}>
                        {!isActive ? (
                            <img
                                src={arrowDown}
                                alt="down"
                                className={styles.icon}
                            />
                        ) : (
                            <img
                                src={close}
                                alt="close"
                                className={styles.icon}
                            />
                        )}
                    </div>
                </div>
            </button>

            {isActive && (
                <ul className={styles.list}>
                    {renderOptions(options.filter(filterOptions))}
                </ul>
            )}

        </div>
    );
};