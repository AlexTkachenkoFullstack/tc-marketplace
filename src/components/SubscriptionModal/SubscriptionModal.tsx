import React, { useEffect, useState } from 'react';
import styles from './SubscriptionModal.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down.svg';
import { useAppSelector } from 'redux/hooks';
import { getFilterTypes } from 'redux/filter/selectors';
import { Dropdown } from 'components/Dropdown/Dropdown';

interface Iprops {
  toggleModalIsOpen: () => void;
}

const SubscriptionModal: React.FC<Iprops> = ({ toggleModalIsOpen }) => {
  const [showEmail, setShowEmail] = useState('E-mail');
  const [isShowCharacteristics, setIsShowCharacteristics] = useState(false);
  const [subscrName, setSubscrName] = useState<string | string[]>('');
  const [transportType, setTransportType] = useState<string | string[]>('');

  const userEmail = 'dimside@gmail.com';
  const transportTypes = useAppSelector(getFilterTypes);

  const handleBackdropClick = (e: React.SyntheticEvent) => {
    const { id } = e.target as HTMLDivElement;
    if (id === 'backdrop') {
      toggleModalIsOpen();
    }
  };

  useEffect(() => {
    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleModalIsOpen();
      }
    };
    document.body.classList.add('modalIsOpen');
    document.addEventListener('keydown', handleCloseModal);

    return () => {
      document.body.classList.remove('modalIsOpen');
      document.removeEventListener('keydown', handleCloseModal);
    };
  }, [toggleModalIsOpen]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowEmail(event.target.checked ? userEmail : 'E-mail');
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      id="backdrop"
    >
      <div
        className={
          isShowCharacteristics
            ? `${styles.modalCard} ${styles.showCharacts}`
            : styles.modalCard
        }
      >
        <h2 className={styles.title}>Створити підписку</h2>
        <button
          type="button"
          onClick={toggleModalIsOpen}
          className={styles.closeButton}
        >
          <CloseIcon />
        </button>
        <input
          type="text"
          placeholder="Назва підписки"
          value={subscrName}
          className={styles.input}
          onChange={e => setSubscrName(e.target.value)}
        />
        <div className={styles.titleWrapper}>
          <h3>Характеристики</h3>
          <button
            type="button"
            onClick={() => setIsShowCharacteristics(prev => !prev)}
            className={isShowCharacteristics ? `${styles.arrowUp}` : ''}
          >
            <ArrowDownIcon />
          </button>
        </div>

        {isShowCharacteristics && (
          <div className={styles.characteristics}>
            <div>
              <div className={styles.characteristic}>
                <h4 className={styles.charactTitles}>Тип</h4>
                <button type="button">
                  <ArrowDownIcon className={styles.arrowDown} />
                </button>
              </div>
              <Dropdown
                updateStyle="advSearch"
                options={transportTypes.map(({ type }) => type)}
                label="Тип"
                startValue={`${transportType ? transportType : 'Тип'}`}
                option={transportType}
                setOption={setTransportType}
              />
            </div>
          </div>
        )}

        <div className={styles.emailWrapper}>
          <div>
            <p>E-mail</p>
            <input type="checkbox" id="email" onChange={handleCheckboxChange} />
            <label htmlFor="email" />
          </div>
          <p>{showEmail}</p>
        </div>
        <div className={styles.buttonsWrapper}>
          <button type="button">Зберегти</button>
          <button type="button">Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
