import React, { ReactNode } from "react";
import cn from 'classnames';
import styles from './CommonBtn.module.scss';

interface Props {
  className?: string,
  iconPath?: string,
  onClick?: () => void,
  children?: ReactNode,
  isDisabled?: boolean,
}

export const CommonBtn: React.FC<Props> = ({
  className,
  iconPath,
  onClick,
  children,
  isDisabled,
}) => {
  const buttonClassnames = cn(className, styles.container, {
    [styles.disabled]: isDisabled,
  });

  const commonProps = {
    className: buttonClassnames,
    onClick,
  };

  const componentChildren = (
    <div className={styles.content}>
      {iconPath ? <img src={iconPath} alt="icon" /> : children}
    </div>
  );

  return (
    <button type="button" {...commonProps}>
      {componentChildren}
    </button>
  )
};
