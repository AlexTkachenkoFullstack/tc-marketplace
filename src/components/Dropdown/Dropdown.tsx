import {
  FC, useState, useRef, useCallback, useEffect,
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

export const Dropdown: FC<Props> = (props) => {
  const {
    label,
    startValue,
    options,
  } = props;

  const [isActive, setIsActive] = useState(false);
  const [option, setOption] = useState(startValue);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeOption = (newOption: string) => {
    setOption(newOption);
    setIsActive(false);
  };

  useClickOutside(dropdownRef, useCallback(() => {
    setIsActive(false);
  }, []));

  useEffect(() => {
    setOption(startValue);
  }, [startValue]);

  return (
    <div
      className={styles.container}
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
        <div className={`${styles.trigger_content} ${isActive ? styles.trigger_content_active : ''}`}>
        <span className={styles.text}>{option}</span>

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
          {options.map(currentOption => (
            <li className={styles.listItem} key={currentOption}>
              <span
                className={styles.listLink}
                onClick={() => changeOption(currentOption)}
              >
                {currentOption}
              </span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};
