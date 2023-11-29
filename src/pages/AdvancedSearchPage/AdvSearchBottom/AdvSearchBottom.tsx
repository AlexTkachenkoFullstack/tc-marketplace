import React from 'react';
import styles from './AdvSearchBottom.module.scss'

type Props = {
  isActive: boolean;
};

const AdvSearchBottom: React.FC<Props> = ({ isActive }) => {
  return (
    <div>
    {isActive &&
      (<div className={styles.AdvSearchBottom}>
        <h1>more passion, more energy, more footwork :)</h1>
      </div>)
    }
    </div>
  );
};

export default AdvSearchBottom;
