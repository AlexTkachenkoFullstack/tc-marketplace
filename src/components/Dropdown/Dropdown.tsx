import {
    FC, useState, useRef, useCallback, useEffect
} from 'react';
import styles from './Dropdown.module.scss';

import arrowDown from '../../assets/icons/arrow-down.svg';
import close from '../../assets/icons/close.svg';

import useClickOutside from 'helpers/hooks/useClickOutside';

type Props = {
    label: string;
    startValue: string;
    options: string[];
};

// to do:
// work with input focus
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

    const filterOptions = (option: string) => {

        if (filterValue.length === 0) return true
        return option.toLowerCase().includes(filterValue.toLowerCase().trim())

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
