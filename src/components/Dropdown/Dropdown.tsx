import {
    FC, useState, useRef, useCallback, useEffect
} from 'react';
import styles from './Dropdown.module.scss';

import arrowDown from '../../assets/icons/arrow-down.svg';
import close from '../../assets/icons/close.svg';

import useClickOutside from 'helpers/hooks/useClickOutside';
import DropdownOptions from './components/DropdownOptions';

type Props = {
    label: string;
    startValue: string;
    options: string[];
    checkboxAllowed?: boolean;
    isModelDissabled?:boolean
};

// usage guide:
// if need checkbox, add checkboxAlo

export const Dropdown: FC<Props> = (props) => {
    const {
        label,
        startValue,
        options,
        checkboxAllowed,
        isModelDissabled
    } = props;

    const [isActive, setIsActive] = useState(false);
    const [option, setOption] = useState(startValue);
    const [filterValue, setfilterValue] = useState('')
    const [checkedValue, setcheckedValue] = useState<string[]>([]);
    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null)

    const changeOption = (newOption: string) => {

        // here change value for multi check for Redux
        if (checkedValue.length !== 0) {
            setcheckedValue([...checkedValue, newOption])
            setOption([...checkedValue, newOption].join(', '))
            setIsActive(false)
            return
        }
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


    const checkboxHandler = (currentOption: string) => {
        if (currentOption === 'none') {
            setcheckedValue([])
            return
        }
        if (checkedValue.includes(currentOption)) {
            setcheckedValue(checkedValue.filter(option => option !== currentOption))
            return
        }
        setcheckedValue([...checkedValue, currentOption])
    }

    useEffect(() => {
        setfilterValue('')
        setcheckedValue([])
    }, [])

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
                disabled={isModelDissabled}
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
                        // can't use autofocus or blur option, because it's create conflict with parrent button and should broke select in list below
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

            {isActive && <DropdownOptions
                filterValue={filterValue}
                options={options}
                changeOption={changeOption}
                checkboxHandler={checkboxHandler}
                checkboxAllowed={checkboxAllowed}
                checkedValue={checkedValue}

            />}

        </div>
    );
};