import {
    FC, useState, useRef, useCallback, useEffect
} from 'react';
import styles from './DropdownItem.module.scss';

import arrowDown from '../../../../assets/icons/arrow-down.svg';
import close from '../../../../assets/icons/close.svg';

import useClickOutside from 'helpers/hooks/useClickOutside';
import List from '../components/List'

// import DropdownInput from './components/DropdownInput';

type Props = {
    label: string;
    startValue: string;
    options: string[];
    checkboxAllowed?: boolean;
    isDissabled?: boolean,
    option: string | string[],
    setOption: React.Dispatch<React.SetStateAction<string | string[]>>,
    allOptionsLabel?: string,
    carMark?: string | string[],
};

export const DropdownItem: FC<Props> = (props) => {
    const {
        startValue,
        options,
        checkboxAllowed,
        isDissabled,
        allOptionsLabel,
        option,
        carMark,
        setOption,
    } = props;

    const [isActive, setIsActive] = useState(false);
    // const [option, setOption] = useState<string | string[]>(startValue);
    const [filterValue, setfilterValue] = useState('')
    const [checkedValue, setCheckedValue] = useState<string[]>([]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        setCheckedValue([])
    },[carMark])
        
    

    const setChecked = (newOption: string) => {
        const newState = [...checkedValue, newOption]
        setCheckedValue(newState)
        setOption(newState)
    }
    const setUnchecked = (newOption: string) => {
        const newState = checkedValue.filter(value => value !== newOption)
        if (newState.length === 0) {
            setCheckedValue([])
            setOption(startValue)
            return
        }
        setCheckedValue(newState)
        setOption(newState)
    }

    const closeDropdown = () => {
        setIsActive(false)
        setfilterValue('')
    }

    const changeOption = (newOption: string) => {
        if (checkboxAllowed) {
            if (checkedValue.includes(newOption)) {
                setUnchecked(newOption)
                return
            }
            setChecked(newOption)
            return
        }

        setOption(newOption)
        closeDropdown()
    };

    const renderPlaceholder = (): string => {

        const length = option.length
        if (length === 1) return option[0]
        if (length > 1 && length < 5) return `Обрано ${length} варіанти`
        return `Обрано ${length} варіантів`
    }

    const checkboxHandler = (currentOption: string) => {
        if (currentOption === 'none') {
            setCheckedValue([])
            setOption(startValue)
            return
        }
        if (checkedValue.includes(currentOption)) {
            setUnchecked(currentOption)
            return
        }
        setChecked(currentOption)
    }

    useClickOutside(dropdownRef, useCallback(() => {
        closeDropdown()
    }, []));


    useEffect(() => {
        setfilterValue('')
        setCheckedValue([])
    }, [])


    useEffect(() => {
        setOption(startValue);
    }, [setOption, startValue]);

    return (
        <div
            className={styles.container}
            ref={dropdownRef}
        >

            <button
                className={`${styles.trigger} ${isActive ? styles.trigger_active : ''}`}
                type="button"
                disabled={isDissabled}
                onClick={() => {

                    setfilterValue('')
                    setIsActive((prevState) => !prevState)
                }
                }
            >
                <div className={`${styles.trigger_content} ${isActive ? styles.trigger_content_active : ''}`}
                >

                        <div className={styles.text}>
                            {Array.isArray(option) ?
                                renderPlaceholder()
                                : option
                            }</div>

                    <div className={styles.icons}
                        onClick={(e) => {
                            if (isActive && filterValue.length > 0) {

                                e.stopPropagation()
                                setfilterValue('')
                            }
                        }}
                    >
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

            {isActive &&
                <List
                    options={options}
                    checkboxAllowed={checkboxAllowed}
                    filterValue={filterValue}
                    checkedValue={checkedValue}
                    checkboxHandler={checkboxHandler}
                    changeOption={changeOption}
                    allOptionsLabel={allOptionsLabel}
                />
                
            }


        </div>
    );
};