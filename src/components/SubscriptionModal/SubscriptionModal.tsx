import React, { useEffect, useState } from 'react';
import styles from './SubscriptionModal.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getFilterBrands,
  getFilterCarsList,
  getFilterRegions,
  getFilterTypes,
} from 'redux/filter/selectors';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { fetchBrands } from 'redux/filter/operations';
import { ISearchParams } from 'types/ISearchParam';

interface Iprops {
  toggleModalIsOpen: () => void;
  requestParams: {
    selectedCategory: string;
    carMark: string | string[];
    carModel: string | string[];
  };
}

let subscriptionParams: ISearchParams = {};

const SubscriptionModal: React.FC<Iprops> = ({
  toggleModalIsOpen,
  requestParams,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showEmail, setShowEmail] = useState('E-mail');
  const [isShowCharacteristics, setIsShowCharacteristics] = useState(false);
  const [subscrName, setSubscrName] = useState<string | string[]>('');
  const [transportType, setTransportType] = useState<string | string[]>('');
  const [brand, setBrand] = useState<string | string[]>('');
  const [model, setModel] = useState<string | string[]>('');
  const [selectedRegions] = useState<string | string[]>(
    'Вся Україна',
  );

  const dispatch = useAppDispatch();

  const userEmail = 'dimside@gmail.com';

  const { selectedCategory, carMark, carModel } = requestParams;

  const transportTypes: IType[] = useAppSelector(getFilterTypes);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const models: IModel[] = useAppSelector(getFilterCarsList);
  const regions: IRegion[] = useAppSelector(getFilterRegions);

  const pickedBrands: any = [];
  brands.forEach((item: any) => {
    if (carMark.includes(item.brand)) {
      pickedBrands.push(item);
    }
  });
  const pickedRegions: any = [];
  regions.forEach((item: any) => {
    if (selectedRegions.includes(item.region)) {
      pickedRegions.push(item);
    }
  });

  useEffect(() => {
    if (selectedCategory !== transportType) {
      setBrand('');
    }
  }, [selectedCategory, transportType]);

  useEffect(() => {
    if (!isMounted) {
      setTransportType(selectedCategory);
      setBrand(carMark);
      setModel(carModel);
    }
    setIsMounted(true);
  }, [selectedCategory, carMark, carModel, isMounted]);

  useEffect(() => {
    const transportTypeId = transportTypes.find(
      ({ type }) => transportType === type,
    )?.typeId;
    subscriptionParams.transportTypeId = transportTypeId;
    transportTypeId && dispatch(fetchBrands(transportTypeId));
  }, [dispatch, transportType, transportTypes]);

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

  //   console.log('requestParams', requestParams);
  console.log('brand', brand);
  console.log('model', model);

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
                startValue={`${selectedCategory ? selectedCategory : 'Тип'}`}
                option={transportType}
                setOption={setTransportType}
              />
            </div>
            <div>
              <div className={styles.characteristic}>
                <h4 className={styles.charactTitles}>Бренд</h4>
                <button type="button">
                  <ArrowDownIcon className={styles.arrowDown} />
                </button>
              </div>
              <Dropdown
                updateStyle="advSearch"
                options={[...brands.map(({ brand }) => brand)].sort((a, b) =>
                  a.localeCompare(b),
                )}
                label="Бренд"
                startValue="Бренд"
                option={brand}
                setOption={setBrand}
                allOptionsLabel="Всі бренди"
                checkboxAllowed
                filteredOptions={brand}
                resetValue={selectedCategory !== transportType}
              />
            </div>
            <div>
              <div className={styles.characteristic}>
                <h4 className={styles.charactTitles}>Модель</h4>
                <button type="button">
                  <ArrowDownIcon className={styles.arrowDown} />
                </button>
              </div>
              <Dropdown
                updateStyle="advSearch"
                optionList={models}
                label="Модель"
                startValue="Модель"
                allOptionsLabel="Всі моделі"
                checkboxAllowed
                option={model}
                title={brand}
                setOption={setModel}
                carMark={brand}
                pickedBrands={pickedBrands}
                filteredOptions={model}
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
