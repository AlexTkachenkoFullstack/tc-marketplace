import React from 'react';
import styles from './DropdownInput.module.scss';
type Props = {
  filterValueHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  option: string | string[];
  label: string;
  filterValue: string;
  startValue: string;
  placeholder: string;
  updateStyle?: string;
};

export default function DropdownInput({
  filterValueHandler,
  option,
  startValue,
  label,
  filterValue,
  placeholder,
  updateStyle,
}: Props) {
  return (
    <input
      onKeyUp={e => {
        if (e.key === ' ') {
          e.preventDefault();
        }
      }}
      onClick={e => {
        e.stopPropagation();
      }}
      className={`${styles.searchInput} ${
        updateStyle ? styles.searchInputAdvMenu : ''
      }`}
      type="text"
      onChange={filterValueHandler}
      placeholder={
        option === startValue
          ? label
          : Array.isArray(option)
          ? placeholder
          : option
      }
      value={filterValue}
      autoFocus
      readOnly={startValue === 'Сортування'}
    />
  );
}
