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
import { fetchBrands, fetchCars } from 'redux/filter/operations';
import { ISearchParams } from 'types/ISearchParam';
import { getCarTypeParam } from 'services/services';
import { getArrayBrandsOfId } from 'utils/getArrayOfId';
import RangeSlider from 'components/RangeSlider/RangeSlider';

interface Iprops {
  toggleModalIsOpen: () => void;
  requestParams: {
    selectedCategory: string;
    carMark: string | string[];
    carModel: string | string[];
    carBody: string | string[];
  };
}

let subscriptionParams: ISearchParams = {};
let isChanged = false;

const SubscriptionModal: React.FC<Iprops> = ({
  toggleModalIsOpen,
  requestParams,
}) => {
  const [data, setData] = useState<any>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isTypeChanged, setIsTypeChanged] = useState(false);
  const [showEmail, setShowEmail] = useState('E-mail');
  const [isShowCharacteristics, setIsShowCharacteristics] = useState(false);
  const [subscrName, setSubscrName] = useState<string | string[]>('');
  const [transportType, setTransportType] = useState<string | string[]>('');
  const [brand, setBrand] = useState<string | string[]>('');
  const [model, setModel] = useState<string | string[]>('');
  const [selectedRegions] = useState<string | string[]>('Вся Україна');
  const [year, setYear] = useState({ from: 0, to: 0 });
  const [bodyType, setBodyType] = useState<string | string[]>('');

  const dispatch = useAppDispatch();

  const userEmail = 'dimside@gmail.com';

  const { selectedCategory, carMark, carModel, carBody } = requestParams;
  console.log('requestParams', requestParams);

  const transportTypes: IType[] = useAppSelector(getFilterTypes);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const models: IModel[] = useAppSelector(getFilterCarsList);
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const bodyTypeArr = data.bodyTypeDTOS?.map(({ bodyType }: any) => bodyType);

  const pickedBrands: any = [];
  brands.forEach((item: any) => {
    if (brand.includes(item.brand)) {
      pickedBrands.push(item);
    }
  });
  const pickedRegions: any = [];
  regions.forEach((item: any) => {
    if (selectedRegions.includes(item.region)) {
      pickedRegions.push(item);
    }
  });

  const handleBackdropClick = (e: React.SyntheticEvent) => {
    const { id } = e.target as HTMLDivElement;
    if (id === 'backdrop') {
      toggleModalIsOpen();
    }
  };

  useEffect(() => {
    if (selectedCategory !== transportType) {
      setBrand('');
      setModel('');
      isChanged = true;
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
    if (transportTypeId) {
      dispatch(fetchBrands(transportTypeId));
      isChanged && setIsTypeChanged(prev => !prev);
      (async () => {
        const data = await getCarTypeParam(transportTypeId.toString());
        setData(data);
      })();
    }
  }, [dispatch, transportType, transportTypes]);

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
  }, [selectedCategory, toggleModalIsOpen]);

  useEffect(() => {
    const selectedCategoryId = transportTypes.find(
      ({ type }) => selectedCategory === type,
    )?.typeId!;
    return () => {
      dispatch(fetchBrands(selectedCategoryId));
    };
  }, [dispatch, selectedCategory, transportTypes]);

  const handleIsActivateSubscription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowEmail(event.target.checked ? userEmail : 'E-mail');
  };

  useEffect(() => {
    const brandIdArr = getArrayBrandsOfId(brands, brand);
    subscriptionParams.brandId = brandIdArr;
    const searchParams: Pick<ISearchParams, 'transportBrandsId'> = {
      transportBrandsId: brandIdArr,
    };
    const searchConfig = {
      searchParams,
    };
    const id = subscriptionParams.transportTypeId;
    id && dispatch(fetchCars({ id, searchConfig }));
  }, [brand, brands, dispatch, transportType]);

  useEffect(() => {
    subscriptionParams.yearsFrom = year.from;
    subscriptionParams.yearsTo = year.to;
  }, [year]);

  //   console.log('brand', brand);
  //   console.log('brands', brands);
  //   console.log('model', model);
  //   console.log('models', models);
  //   console.log('pickedBrands', pickedBrands);
  //   console.log('subscriptionParams', subscriptionParams);
  //   console.log('data', data.bodyTypeDTOS);

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
                resetValue={isTypeChanged}
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
                resetValue={isTypeChanged}
              />
            </div>
            <div>
              <div className={styles.characteristic}>
                <h4 className={styles.charactTitles}>Рік</h4>
                <button type="button">
                  <ArrowDownIcon className={styles.arrowDown} />
                </button>
              </div>
              <div className={styles.listItem}>
                <RangeSlider
                  resetValue={isTypeChanged}
                  setObjectValue={setYear}
                  typeRange={'year'}
                />
              </div>
            </div>
            <div>
              <div className={styles.characteristic}>
                <h4 className={styles.charactTitles}>Тип кузову</h4>
                <button type="button">
                  <ArrowDownIcon className={styles.arrowDown} />
                </button>
              </div>
              <Dropdown
                updateStyle="advSearch"
                options={bodyTypeArr}
                label="Тип кузову"
                startValue={'Тип кузову'}
                option={bodyType}
                setOption={setBodyType}
                allOptionsLabel="Всі типи"
                checkboxAllowed
                filteredOptions={bodyType}
                resetValue={isTypeChanged}
              />
              <div className={styles.listItem}></div>
            </div>
          </div>
        )}

        <div className={styles.emailWrapper}>
          <div>
            <p>Активувати підписку</p>
            <input
              type="checkbox"
              id="email"
              onChange={handleIsActivateSubscription}
            />
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
