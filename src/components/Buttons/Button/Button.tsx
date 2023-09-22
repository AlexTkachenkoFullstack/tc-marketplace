/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import { FC, ReactNode } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Button.module.scss';

type CommonProps = {
  className?: string;
  iconPath?: string;
  onClick?: () => void;
  children?: ReactNode;
  badge?: number;
};

type Props = CommonProps;

export const Button: FC<Props> = (props) => {
  const {
    className = '',
    onClick = () => {},
    iconPath = '',
    children,
    badge = 0,
  } = props;

  const buttonClassnames = cn(className, styles.container);

  const commonProps = {
    className: buttonClassnames,
    onClick,
  };

  const componentChildren = (
    <div className={styles.content}>
      {iconPath ? <img src={props.iconPath} alt="icon" /> : children}

      {badge > 0 && (
        <span className={styles.badge}>{badge <= 99 ? badge : '99+'}</span>
      )}
    </div>
  );

  return (
    <button type="button" {...commonProps}>
      {componentChildren}
    </button>
  );
};
