/* eslint-disable react/require-default-props */
import { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
  handleChangeOption: (newOption: string) => void
};

const Select: FC<Props> = (props) => {
  const {
    children, className = '', handleChangeOption,
  } = props;

  return (
    <span
      className={className}
      onClick={() => handleChangeOption(children as string)}
    >
      {children}
    </span>
  );
};

export default Select;
