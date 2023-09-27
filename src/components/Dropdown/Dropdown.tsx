import {
  FC, useState, useRef, useCallback, useEffect,
} from 'react';
import cn from 'classnames';
import styles from './Dropdown.module.scss';

import arrowDown from '../../assets/icons/arrow-down.svg';
import close from '../../assets/icons/close.svg';

import Select from './Select/Select';
import useClickOutside from 'helpers/hooks/useClickOutside';

type Props = {
  label: string;
  startValue: string;
  options: string[];
  className?: string;
};

export const Dropdown: FC<Props> = (props) => {
  const {
    label,
    startValue,
    options,
    className = '',
  } = props;

  const [isActive, setIsActive] = useState(true);
  const [option, setOption] = useState(startValue);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeOption = (newOption: string) => {
    setOption(newOption);
    setIsActive(false);
  };
  //   const params: SearchParams = {
  //     [searchParamName]: paramValue,
  //   };

  //   const additionalParams = Object.entries(additionalSearhParams);

  //   if (additionalParams.length) {
  //     additionalParams.forEach(([option, value]) => {
  //       params[option] = value;
  //     });
  //   }

  //   return params;
  // };

  useClickOutside(dropdownRef, useCallback(() => {
    setIsActive(false);
  }, []));

  useEffect(() => {
    setOption(startValue);
  }, [startValue]);

  return (
    <div
      className={cn(styles.container, className, {
        [styles.active]: isActive,
        [styles.disabled]: !isActive,
      })}
      ref={dropdownRef}
    >
      {(option !== startValue) && (
        <span className={styles.label}>{label}</span>
      )}

      <button
        className={styles.trigger}
        type="button"
        onClick={() => setIsActive((prevState) => !prevState)}
      >
        <span className={styles.text}>{option}</span>

        <div className={styles.icons}>
          <img
            src={arrowDown}
            alt="down"
            className={cn(styles.icon, styles['icon--down'])}
          />

          {isActive && (
          <img
            src={close}
            alt="close"
            className={cn(styles.icon, styles['icon--up'])}
          />
          )}
        </div>
      </button>

      <ul className={styles.list}>
        {options.map(option => (
          <li className={styles.listItem} key={option}>
            <Select
              className={styles.listLink}
              handleChangeOption={changeOption}
            >
              {option}
            </Select>
          </li>
        ))}
      </ul>
    </div>
  );
};
