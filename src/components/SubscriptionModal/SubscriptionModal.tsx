import React, { useEffect, useState } from 'react';
import styles from './SubscriptionModal.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrowDownBig.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getFilterBrands,
  getFilterCarsList,
  getFilterCities,
  getFilterRegions,
  getFilterTypes,
} from 'redux/filter/selectors';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { IBrand } from 'types/IBrand';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import {
  fetchBrands,
  fetchCars,
  fetchCity,
  fetchRegions,
} from 'redux/filter/operations';
import { ISearchParams } from 'types/ISearchParam';
import { fetchUserInfo, getCarTypeParam } from 'services/services';
import {
  getArrayBrandsOfId,
  getArrayCarBodyOfId,
  getArrayCityOfId,
  getArrayColorOfId,
  getArrayConditionOfId,
  getArrayDriveOfid,
  getArrayFuelOfId,
  getArrayModelsOfIdForSearch,
  getArrayNumberAxlesOfId,
  getArrayOfId,
  getArrayProducingCountryOfId,
  getArrayTransmissionOfId,
  getArrayWheelConfigurationOfId,
} from 'utils/getArrayOfId';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import { ICities } from 'types/ICities';
import ModelListType from 'types/ModelListType';
import {
  editSubscription,
  fetchSubscriptions,
  saveSubscription,
} from 'redux/profile/operations';
import { cleanParamsForSubscr } from 'redux/filter/slice';

interface Iprops {
  toggleModalIsOpen: () => void;
  requestParams: {
    selectedCategory: string | string[];
    carMark: string | string[];
    carModel: string | string[];
    carBody: string | string[];
    year: { from: number; to: number };
    carFuel: string | string[];
    carTransmission: string | string[];
    mileage: { from: number; to: number };
    enginePower: { from: number; to: number };
    carDriveType: string | string[];
    selectedRegions: string | string[];
    selectedCity: string | string[];
    carColor: string | string[];
    carTransportCondition: string | string[];
    numberOfDoors: { from: number; to: number };
    numberOfSeats: { from: number; to: number };
    carNumberAxles: string | string[];
    carWheelConfiguration: string | string[];
    countryDeliver: string | string[];
    price: { from: number; to: number };
    engineDisplacement: { from: number; to: number };
    data: any;
    selectedOption: boolean | undefined;
    selectedName?: string;
    editSubscrId?: number;
    notificationStatus?: boolean;
  };
}

// let userEmail = '';
let requestSearch: ISearchParams = {};

const SubscriptionModal: React.FC<Iprops> = ({
  toggleModalIsOpen,
  requestParams,
}) => {
  const [isShowCharacteristics, setIsShowCharacteristics] = useState(false);

  const [data, setData] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);
  const [isTypeChanged, setIsTypeChanged] = useState(false);
  // const [showEmail, setShowEmail] = useState('Сповіщення');
  const [subscrName, setSubscrName] = useState<string>('');

  const [selectedType, setSelectedType] = useState<string | string[]>('');

  const [transportType, setTransportType] = useState<string | string[]>('');
  const [brand, setBrand] = useState<string | string[]>('');
  const [model, setModel] = useState<string | string[]>('');
  const [year, setYear] = useState({ from: 0, to: 0 });
  const [bodyType, setBodyType] = useState<string | string[]>('');
  const [fuelType, setFuelType] = useState<string | string[]>('');
  const [transmission, setTransmission] = useState<string | string[]>('');
  const [mileage, setMileage] = useState({ from: 0, to: 0 });
  const [engineDisplacement, setEngineDisplacement] = useState({
    from: 0,
    to: 0,
  });
  const [enginePower, setEnginePower] = useState({ from: 0, to: 0 });
  const [driveType, setDriveType] = useState<string | string[]>('');
  const [region, setRegion] = useState<string | string[]>('');
  const [city, setCity] = useState<string | string[]>('');
  const [color, setColor] = useState<string | string[]>('');
  const [condition, setCondition] = useState<string | string[]>('');
  const [numberOfDoors, setNumberOfDoors] = useState({ from: 0, to: 0 });
  const [numberOfSeats, setNumberOfSeats] = useState({ from: 0, to: 0 });
  const [numberAxles, setNumberAxles] = useState<string | string[]>('');
  const [wheelConfiguration, setWheelConfiguration] = useState<
    string | string[]
  >('');
  const [producingCountry, setProducingCountry] = useState<string | string[]>(
    '',
  );
  const [price, setPrice] = useState({ from: 0, to: 0 });
  const [bargain, setBargain] = useState<boolean | undefined>(undefined);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const dispatch = useAppDispatch();

  const {
    selectedCategory,
    carMark,
    carModel,
    carBody,
    year: selectedYear,
    carFuel,
    carTransmission,
    mileage: selectedMileage,
    enginePower: selectedEnginePower,
    carDriveType,
    selectedRegions,
    selectedCity,
    carColor,
    carTransportCondition,
    numberOfDoors: selectedNumberOfDoors,
    numberOfSeats: selectedNumberOfSeats,
    carNumberAxles,
    carWheelConfiguration,
    countryDeliver,
    price: selectedPrice,
    data: advFilterData,
    engineDisplacement: selectedEngineDisplacement,
    selectedOption,
    selectedName,
    editSubscrId,
    notificationStatus,
  } = requestParams;

  const transportTypes: IType[] = useAppSelector(getFilterTypes);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const models: ModelListType = useAppSelector(getFilterCarsList);
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const cities: ICities[] = useAppSelector(getFilterCities);
  const bodyTypesArr = data.bodyTypeDTOS;
  const fuelTypeArr = data.fuelTypeDTOS;
  const transmissionTypeArr = data.transmissionDTOS || [];
  const driverTypeArr = data.driveTypeDTOS || [];
  const colorsArr = data.transportColorDTOS;
  const conditionArr = data.transportConditionDTOS;
  const wheelConfigurationArr = data.wheelConfigurationDTOS;
  const producingCountryArr = data.producingCountryDTOS;
  const numberAxlesArr = data.numberAxlesDTOS;
  const bodyTypeList = bodyTypesArr?.map(({ bodyType }: any) => bodyType);
  const fuelTypeList = fuelTypeArr?.map(({ fuelType }: any) => fuelType);
  const transmissionTypeList = transmissionTypeArr?.map(
    ({ transmission }: any) => transmission,
  );
  const driverTypeList = driverTypeArr?.map(({ driveType }: any) => driveType);
  const colorsList = colorsArr?.map(
    ({ transportColor }: any) => transportColor,
  );
  const conditionList = conditionArr?.map(
    ({ transportCondition }: any) => transportCondition,
  );
  const numberAxlesList = numberAxlesArr?.map(
    ({ numberAxles }: any) => numberAxles,
  );
  const wheelConfigurationList = wheelConfigurationArr?.map(
    ({ wheelConfiguration }: any) => wheelConfiguration,
  );
  const producingCountryList = producingCountryArr?.map(
    ({ producingCountry }: any) => producingCountry,
  );

  const transportTypeId = transportTypes.find(
    ({ type }) => transportType === type,
  )?.typeId;

  const pickedBrands: any = [];
  brands.forEach((item: any) => {
    if (brand.includes(item.brand)) {
      pickedBrands.push(item);
    }
  });
  const pickedRegions: any = [];
  regions.forEach((item: any) => {
    if (region.includes(item.region)) {
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
    if (!isMounted) {
      setSelectedType(selectedCategory);
      setTransportType(selectedCategory);
      setBrand(carMark);
      setModel(carModel);
      setYear(selectedYear);
      setBodyType(carBody);
      setFuelType(carFuel);
      setTransmission(carTransmission);
      setMileage(selectedMileage);
      setEnginePower(selectedEnginePower);
      setDriveType(carDriveType);
      setRegion(selectedRegions);
      setCity(selectedCity);
      setColor(carColor);
      setCondition(carTransportCondition);
      setNumberOfDoors(selectedNumberOfDoors);
      setNumberOfSeats(selectedNumberOfSeats);
      setNumberAxles(carNumberAxles);
      setWheelConfiguration(carWheelConfiguration);
      setProducingCountry(countryDeliver);
      setPrice(selectedPrice);
      setData(advFilterData);
      setEngineDisplacement(selectedEngineDisplacement);
      setBargain(selectedOption);
      selectedName && setSubscrName(selectedName);
      notificationStatus && setIsNotificationEnabled(notificationStatus);
      // notificationStatus && setShowEmail(userEmail);
    }
    setIsMounted(true);
  }, [
    selectedCategory,
    carMark,
    carModel,
    isMounted,
    selectedYear,
    carBody,
    carFuel,
    carTransmission,
    selectedMileage,
    selectedEnginePower,
    carDriveType,
    selectedRegions,
    selectedCity,
    carColor,
    carTransportCondition,
    selectedNumberOfDoors,
    selectedNumberOfSeats,
    carNumberAxles,
    carWheelConfiguration,
    countryDeliver,
    selectedPrice,
    advFilterData,
    selectedEngineDisplacement,
    selectedOption,
    selectedName,
    notificationStatus,
  ]);

  useEffect(() => {
    setIsTypeChanged(false);
    if (transportType !== selectedType) {
      setSelectedType(transportType);
      setIsTypeChanged(true);
    }
  }, [selectedType, transportType]);

  useEffect(() => {
    if (transportTypeId) {
      dispatch(fetchBrands(transportTypeId));
      dispatch(fetchRegions());
      (async () => {
        const data = await getCarTypeParam(transportTypeId);
        setData(data);
      })();
    }
  }, [dispatch, transportType, transportTypeId]);

  useEffect(() => {
    const brandIdArr = getArrayBrandsOfId(brands, brand);
    requestSearch.brandId = brandIdArr;
    const searchParams: Pick<ISearchParams, 'transportBrandsId'> = {
      transportBrandsId: brandIdArr,
    };
    const searchConfig = {
      searchParams,
    };
    const id = transportTypeId;
    id && dispatch(fetchCars({ id, searchConfig }));
  }, [brand, brands, dispatch, transportTypeId]);

  useEffect(() => {
    if (region) {
      const regionId = getArrayOfId(regions, region);
      if (regionId.length > 0) {
        const searchParams: Pick<ISearchParams, 'regionId'> = {
          regionId,
        };
        const searchConfig = {
          searchParams,
        };

        dispatch(fetchCity(searchConfig));
      }
    }
  }, [dispatch, region, regions]);

  // useEffect(() => {
  //   (async () => {
  //     const { email } = await fetchUserInfo();
  //     userEmail = email;
  //   })();
  // }, []);

  const handleSaveSubscription = () => {
    const bodyTypeId = getArrayCarBodyOfId(bodyTypesArr, bodyType);
    const modelId = getArrayModelsOfIdForSearch(models, model);
    const fuelTypeId = getArrayFuelOfId(fuelTypeArr, fuelType);
    const transmissionId = getArrayTransmissionOfId(
      transmissionTypeArr,
      transmission,
    );
    const driveTypeId = getArrayDriveOfid(driverTypeArr, driveType);
    const regionId = getArrayOfId(regions, region);
    const cityId = getArrayCityOfId(cities, city);
    const colorId = getArrayColorOfId(colorsArr, color);
    const conditionId = getArrayConditionOfId(conditionArr, condition);
    const wheelConfigurationId = getArrayWheelConfigurationOfId(
      wheelConfigurationArr ?? [],
      wheelConfiguration,
    );
    const producingCountryId = getArrayProducingCountryOfId(
      producingCountryArr,
      producingCountry,
    );
    const numberAxlesId = getArrayNumberAxlesOfId(
      numberAxlesArr ?? [],
      numberAxles,
    );
    requestSearch.transportTypeId = transportTypeId;
    requestSearch.modelId = modelId;
    requestSearch.bodyTypeId = bodyTypeId;
    requestSearch.fuelTypeId = fuelTypeId;
    requestSearch.transmissionId = transmissionId;
    requestSearch.driveTypeId = driveTypeId;
    requestSearch.regionId = regionId;
    requestSearch.cityId = cityId;
    requestSearch.colorId = colorId;
    requestSearch.conditionId = conditionId;
    requestSearch.wheelConfigurationId = wheelConfigurationId;
    requestSearch.producingCountryId = producingCountryId;
    requestSearch.yearsFrom = year.from;
    requestSearch.yearsTo = year.to;
    requestSearch.mileageFrom = mileage.from;
    requestSearch.mileageTo = mileage.to;
    requestSearch.enginePowerFrom = enginePower.from;
    requestSearch.enginePowerTo = enginePower.to;
    requestSearch.numberOfDoorsFrom = numberOfDoors.from;
    requestSearch.numberOfDoorsTo = numberOfDoors.to;
    requestSearch.numberOfSeatsFrom = numberOfSeats.from;
    requestSearch.numberOfSeatsTo = numberOfSeats.to;
    requestSearch.priceFrom = price.from;
    requestSearch.priceTo = price.to;
    requestSearch.engineDisplacementFrom = engineDisplacement.from;
    requestSearch.engineDisplacementTo = engineDisplacement.to;
    requestSearch.numberAxlesId = numberAxlesId;
    requestSearch.bargain = bargain;
    const subscriptionRequest = {
      name: subscrName,
      notificationEnabled: isNotificationEnabled,
    };
    const modifiedRequestSearch = Object.fromEntries(
      Object.entries(requestSearch).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return value !== undefined && value !== 0 && value !== null;
        }
      }),
    );
    const SubscriptionParams = { modifiedRequestSearch, subscriptionRequest };
    if (!editSubscrId) {
      dispatch(saveSubscription(SubscriptionParams)).then(() =>
        dispatch(fetchSubscriptions()),
      );
    } else {
      dispatch(
        editSubscription({ ...SubscriptionParams, id: editSubscrId }),
      ).then(() => dispatch(fetchSubscriptions()));
    }
    dispatch(cleanParamsForSubscr());
    toggleModalIsOpen();
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
    // event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // setShowEmail(event.target.checked ? userEmail : 'E-mail');
    setIsNotificationEnabled(prev => !prev);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBargain(event.target.checked ? true : undefined);
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
        <div className={styles.title_container}>
          <h2 className={styles.title}>Створити підписку</h2>
          <button
            type="button"
            onClick={toggleModalIsOpen}
            className={styles.closeButton}
          >
            <CloseIcon />
          </button>
        </div>
        <input
          type="text"
          placeholder="Назва підписки"
          value={subscrName}
          className={styles.input}
          onChange={e => setSubscrName(e.target.value)}
        />

        <div
          className={`${styles.charactsTitleThumb} ${
            isShowCharacteristics ? styles.showCharacts : ''
          }`}
        >
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
        </div>
        <div
          className={`${styles.scrollThumb} ${
            isShowCharacteristics ? styles.showCharacts : ''
          }`}
        >
          {isShowCharacteristics && (
            <div className={styles.characteristics}>
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Тип</h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={transportTypes.map(({ type }) => type)}
                  label="Тип"
                  startValue="Тип"
                  option={transportType}
                  setOption={setTransportType}
                  selectedOptions={transportType}
                  hideLabel={true}
                />
              </div>

              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Бренд</h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={brands
                    .map(({ brand }) => brand)
                    .sort((a, b) => a.localeCompare(b))}
                  label="Бренд"
                  startValue="Бренд"
                  option={brand}
                  setOption={setBrand}
                  allOptionsLabel="Всі бренди"
                  checkboxAllowed
                  selectedOptions={brand}
                  resetValue={isTypeChanged}
                  hideLabel={true}
                />
              </div>
              {Array.isArray(brand) && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Модель</h4>
                  <Dropdown
                    updateStyle="modalStyle"
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
                    selectedOptions={model}
                    resetValue={isTypeChanged}
                    hideLabel={true}
                  />
                </div>
              )}
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Рік</h4>
                <div className={styles.listItem}>
                  <RangeSlider
                    setObjectValue={setYear}
                    typeRange={'year'}
                    selectedValue={year}
                    resetValue={isTypeChanged}
                    newStyle={'modalStyle'}
                  />
                </div>
              </div>
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Тип кузову</h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={bodyTypeList}
                  label="Тип кузову"
                  startValue="Тип кузову"
                  allOptionsLabel="Всі типи"
                  checkboxAllowed
                  option={bodyType}
                  setOption={setBodyType}
                  selectedOptions={bodyType}
                  resetValue={isTypeChanged}
                  hideLabel={true}
                />
                {/* <div className={styles.listItem}></div> */}
              </div>
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Тип палива</h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={fuelTypeList}
                  label="Тип палива"
                  startValue="Тип палива"
                  allOptionsLabel="Всі типи"
                  checkboxAllowed
                  option={fuelType}
                  setOption={setFuelType}
                  selectedOptions={fuelType}
                  resetValue={isTypeChanged}
                  hideLabel={true}
                />
                {/* <div className={styles.listItem}></div> */}
              </div>
              {transmissionTypeArr && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Коробка передач</h4>
                  <Dropdown
                    updateStyle="modalStyle"
                    options={transmissionTypeList}
                    label="Коробка передач"
                    startValue="Коробка передач"
                    allOptionsLabel="Всі типи"
                    checkboxAllowed
                    option={transmission}
                    setOption={setTransmission}
                    selectedOptions={transmission}
                    resetValue={isTypeChanged}
                    hideLabel={true}
                  />
                  {/* <div className={styles.listItem}></div> */}
                </div>
              )}
              {data.mileageFrom && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Пробіг</h4>
                  <div className={styles.listItem}>
                    <RangeSlider
                      setObjectValue={setMileage}
                      typeRange={'mileage'}
                      selectedValue={mileage}
                      resetValue={isTypeChanged}
                      newStyle={'modalStyle'}
                    />
                  </div>
                </div>
              )}
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Об`єм двигуна</h4>
                <div className={styles.listItem}>
                  <RangeSlider
                    setObjectValue={setEngineDisplacement}
                    typeRange={'engineDisplacement'}
                    selectedValue={engineDisplacement}
                    resetValue={isTypeChanged}
                    newStyle={'modalStyle'}
                  />
                </div>
              </div>
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Потужність двигуна</h4>
                <div className={styles.listItem}>
                  <RangeSlider
                    setObjectValue={setEnginePower}
                    typeRange={'enginePower'}
                    selectedValue={enginePower}
                    resetValue={isTypeChanged}
                    newStyle={'modalStyle'}
                  />
                </div>
              </div>
              {driverTypeArr && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Привід</h4>
                  <Dropdown
                    updateStyle="modalStyle"
                    options={driverTypeList}
                    label="Привід"
                    startValue="Привід"
                    allOptionsLabel="Всі типи приводу"
                    checkboxAllowed
                    option={driveType}
                    setOption={setDriveType}
                    selectedOptions={driveType}
                    resetValue={isTypeChanged}
                    hideLabel={true}
                  />
                  {/* <div className={styles.listItem}></div> */}
                </div>
              )}
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Регіон</h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={regions.map(({ region }) => region)}
                  label="Регіон"
                  startValue="Регіон"
                  allOptionsLabel="Вся Україна"
                  checkboxAllowed
                  option={region}
                  setOption={setRegion}
                  selectedOptions={region}
                  resetValue={isTypeChanged}
                  hideLabel={true}
                />
              </div>
              {Array.isArray(region) && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Місто</h4>
                  <Dropdown
                    updateStyle="modalStyle"
                    optionList={cities}
                    label="Місто"
                    startValue="Місто"
                    allOptionsLabel="Місто"
                    checkboxAllowed
                    option={city}
                    title={region}
                    setOption={setCity}
                    pickedRegions={pickedRegions}
                    selectedOptions={city}
                    resetValue={isTypeChanged}
                    hideLabel={true}
                  />
                </div>
              )}
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Колір</h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={colorsList}
                  label="Колір"
                  startValue="Колір"
                  allOptionsLabel="Всі кольори"
                  checkboxAllowed
                  option={color}
                  setOption={setColor}
                  selectedOptions={color}
                  resetValue={isTypeChanged}
                  hideLabel={true}
                />
                {/* <div className={styles.listItem}></div> */}
              </div>
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Технічний стан</h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={conditionList}
                  label="Технічний стан"
                  startValue="Технічний стан"
                  allOptionsLabel="Будь-який стан"
                  checkboxAllowed
                  option={condition}
                  setOption={setCondition}
                  selectedOptions={condition}
                  resetValue={isTypeChanged}
                  hideLabel={true}
                />
              </div>
              {data.numberOfDoorsFrom && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Кількість дверей</h4>
                  <div className={styles.listItem}>
                    <RangeSlider
                      setObjectValue={setNumberOfDoors}
                      typeRange={'numberOfDoors'}
                      selectedValue={numberOfDoors}
                      resetValue={isTypeChanged}
                      newStyle={'modalStyle'}
                    />
                  </div>
                </div>
              )}
              {data.numberOfSeatsFrom && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Кількість місць</h4>
                  <div className={styles.listItem}>
                    <RangeSlider
                      setObjectValue={setNumberOfSeats}
                      typeRange={'numberOfSeats'}
                      selectedValue={numberOfSeats}
                      resetValue={isTypeChanged}
                      newStyle={'modalStyle'}
                    />
                  </div>
                </div>
              )}
              {numberAxlesArr && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Кількість осей</h4>
                  <Dropdown
                    updateStyle="modalStyle"
                    options={numberAxlesList}
                    label="Кількість осей"
                    startValue="Кількість осей"
                    allOptionsLabel="Будь-яка"
                    checkboxAllowed
                    option={numberAxles}
                    setOption={setNumberAxles}
                    selectedOptions={numberAxles}
                    resetValue={isTypeChanged}
                    hideLabel={true}
                  />
                </div>
              )}
              {wheelConfigurationArr && (
                <div className={styles.charactThumb}>
                  <h4 className={styles.charactTitles}>Конфігурація коліс</h4>
                  <Dropdown
                    updateStyle="modalStyle"
                    options={wheelConfigurationList}
                    label="Конфігурація коліс"
                    startValue="Конфігурація коліс"
                    allOptionsLabel="Будь-яка"
                    checkboxAllowed
                    option={wheelConfiguration}
                    setOption={setWheelConfiguration}
                    selectedOptions={wheelConfiguration}
                    resetValue={isTypeChanged}
                    hideLabel={true}
                  />
                </div>
              )}
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>
                  Країна з якої доставили:
                </h4>
                <Dropdown
                  updateStyle="modalStyle"
                  options={producingCountryList}
                  label="Країна"
                  startValue="Країна"
                  allOptionsLabel="Будь-яка"
                  checkboxAllowed
                  option={producingCountry}
                  setOption={setProducingCountry}
                  selectedOptions={producingCountry}
                  resetValue={isTypeChanged}
                  hideLabel={true}
                />
              </div>
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Ціна</h4>
                <div className={styles.listItem}>
                  <RangeSlider
                    setObjectValue={setPrice}
                    typeRange={'price'}
                    selectedValue={price}
                    resetValue={isTypeChanged}
                    newStyle={'modalStyle'}
                  />
                </div>
              </div>
              <div className={styles.charactThumb}>
                <h4 className={styles.charactTitles}>Торг</h4>
                <div className={`${styles.listItem} `}>
                  <input
                    type="checkbox"
                    name="bargain"
                    id="bargain"
                    checked={bargain === true}
                    onChange={handleOptionChange}
                    className={styles.bargainInput}
                  />
                  <label htmlFor="bargain" className={styles.bargainLabel}>
                    Можливість торгу
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className={styles.emailWrapper}>
            <p>Сповіщення</p>
            <input
              type="checkbox"
              id="email"
              checked={isNotificationEnabled}
              onChange={handleIsActivateSubscription}
            />
            <label htmlFor="email" />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveSubscription}
          className={styles.saveBtn}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
