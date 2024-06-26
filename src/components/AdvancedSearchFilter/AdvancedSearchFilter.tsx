import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styles from './AdvancedSearchFilter.module.scss';
import {
  getFilterBrands,
  getFilterCarsList,
  getFilterCities,
  getFilterRegions,
  getFilterTypes,
  getParamsForSuscr,
} from 'redux/filter/selectors';
import {
  fetchBrands,
  fetchRegions,
  fetchTypes,
  fetchCity,
  fetchCars,
} from 'redux/filter/operations';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { IBrand } from 'types/IBrand';
import { ISearchParams } from 'types/ISearchParam';
import { getCarTypeParam } from 'services/services';
import {
  changeFiltredParams,
  cleanFiltredStore,
  saveParamsForSubscr,
  writeTitle,
} from 'redux/filter/slice';
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
import { Dropdown } from 'components/Dropdown/Dropdown';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import { ICities } from 'types/ICities';
import { CategoryCheckBar } from 'components/CategoryCheckBar/CategoryCheckBar';
import { BlocksVisibilityState } from 'types/BlocksVisibilityState';
import { ButtonVisibilityState } from 'types/ButtonVisibilityState';
import { getInitialBlocksVisibility } from 'utils/getInitialBlocksVisibility';
import { getWindowWidth } from 'utils/getWindowWidth';
import { getInitialButtonVisibility } from 'utils/getInitialButtonVisibility';
import ModelListType from 'types/ModelListType';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrowDown.svg';

interface Props {
  onAdvencedFilter?: () => void;
  // handleTitle?: (title: { [key: string]: string[] }) => void;
}

const N = 9;
export const AdvancedSearchFilter: React.FC<Props> = ({
  onAdvencedFilter,
  // handleTitle,
  // clearSubscrId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState<BlocksVisibilityState>(() => {
    return getWindowWidth() < 767
      ? getInitialBlocksVisibility(false)
      : getInitialBlocksVisibility(true);
  });

  const [isShow, setIsShow] = useState<ButtonVisibilityState>(() => {
    return getWindowWidth() < 767
      ? getInitialButtonVisibility(false)
      : getInitialButtonVisibility(true);
  });
  // response(catalog) get-param
  const [data, setData] = useState<any>([]);
  // для рендж слайдера
  const [price, setPrice] = useState({ from: 100, to: 1000000 });
  const [year, setYear] = useState({ from: 1970, to: 2024 });
  const [mileage, setMileage] = useState({ from: 0, to: 1000000 });
  const [enginePower, setEnginePower] = useState({ from: 0, to: 1000 });
  const [engineDisplacement, setEngineDisplacement] = useState({
    from: 0,
    to: 20,
  });
  const [numberOfDoors, setNumberOfDoors] = useState({ from: 2, to: 5 });
  const [numberOfSeats, setNumberOfSeats] = useState({ from: 2, to: 18 });
  const [resetValue, setResetValue] = useState(Array(N).fill(false));
  // redux filtred
  const typeCars: IType[] = useAppSelector(getFilterTypes);
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const cities: ICities[] = useAppSelector(getFilterCities);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const carsList: ModelListType = useAppSelector(getFilterCarsList);
  // type categotry cars
  const [selectedCategory, setSelectedCategory] = useState<string>('Легкові');
  const [prevSelectedCategory, setPrevSelectedCategory] =
    useState<string>('Легкові');
  const [optionList, setOptionList] = useState<ICities[]>(cities);
  const [carBody, setCarBody] = useState<string | string[]>('');

  const [carFuel, setCarFuel] = useState<string | string[]>('');
  const [carTransmission, setCarTransmission] = useState<string | string[]>('');
  const [carColor, setCarColor] = useState<string | string[]>('');
  const [carTransportCondition, setCarTransportCondition] = useState<
    string | string[]
  >('');
  const [carDriveType, setCarDriveType] = useState<string | string[]>('');
  const [carNumberAxles, setCarNumberAxles] = useState<string | string[]>('');
  const [carWheelConfiguration, setCarWheelConfiguration] = useState<
    string | string[]
  >('');
  const [selectedOption, setSelectedOption] = useState<boolean | undefined>(
    undefined,
  ); // Yes or No
  const [transportTypeId, setTransportTypeId] = useState<number | null>(null);
  // select state for dropdown
  const [carMark, setCarMark] = useState<string | string[]>('Бренд');
  const [brandId, setBrandId] = useState<number[] | []>([]);

  const [carModel, setCarModel] = useState<string | string[]>('');

  // dropdown
  const [selectedCity, setSelectedCity] = useState<string | string[]>('Місто');
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>('');
  const [countryDeliver, setCountryDeliver] = useState<string | string[]>(
    'Країна',
  );

  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const handleTitle = (
      carBrands: string | string[],
      models: string | string[],
    ) => {
      if (Array.isArray(carBrands)) {
        carBrands.forEach(item => setTitle(prev => ({ ...prev, [item]: [] })));
      } else return;

      carsList.forEach(item => {
        if (
          item.models.some(({ model }) => {
            return models.includes(model);
          })
        ) {
          const foundBrand = brands?.find(
            ({ brandId }) => brandId === item.brandId,
          )?.brand;
          const modelForPush = item.models
            .filter(({ model }) => models.includes(model))
            .map(({ model }) => model);

          if (typeof foundBrand === 'string' && modelForPush.length > 0) {
            setTitle(prev => ({
              ...prev,
              [foundBrand]: [
                ...(prev[foundBrand] as string[]),
                ...modelForPush,
              ],
            }));
          }
        }
      });
    };

    handleTitle(carMark, carModel);
  }, [brands, carMark, carModel, carsList]);

  useEffect(() => {
    dispatch(writeTitle(title));
  }, [dispatch, title]);

  const {
    selectedCategory: transportType,
    carMark: brand,
    carModel: model,
    selectedRegions: region,
  } = useAppSelector(getParamsForSuscr);

  useEffect(() => {
    if (!isMounted) {
      transportType && setSelectedCategory(transportType);
      brand.length > 0 && setCarMark(brand);
      model.length > 0 && setCarModel(model);
      region.length > 0 && setSelectedRegions(region);
    }
    setIsMounted(true);
  }, [brand, isMounted, model, region, transportType]);

  const requestParams = {
    selectedCategory,
    carMark,
    carModel,
    carBody,
    year,
    carFuel,
    carTransmission,
    mileage,
    engineDisplacement,
    enginePower,
    carDriveType,
    selectedRegions,
    selectedCity,
    carColor,
    carTransportCondition,
    numberOfDoors,
    numberOfSeats,
    carNumberAxles,
    carWheelConfiguration,
    countryDeliver,
    price,
    data,
    selectedOption,
  };
  // response catalog/get-param/id
  const bodyTypes = data?.bodyTypeDTOS;
  const fuel = data?.fuelTypeDTOS;
  const transmission = data?.transmissionDTOS;
  const transportColor = data?.transportColorDTOS;
  const driveType = data?.driveTypeDTOS;
  const transportCondition = data?.transportConditionDTOS;
  const numberAxles = data?.numberAxlesDTOS;
  const wheelConfiguration = data?.wheelConfigurationDTOS;
  const producingCountry = data?.producingCountryDTOS;
  const door = data?.numberOfDoorsTo;
  const seats = data?.numberOfSeatsTo;
  const mileages = data?.mileageTo;
  // const engineDisplacement = data?.engineDisplacementTo;
  // const power = data?.enginePowerTo;
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
    dispatch(fetchRegions());
    dispatch(fetchTypes());
  }, [dispatch, region]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(prevState => {
      return getWindowWidth() < 767
        ? getInitialBlocksVisibility(false)
        : getInitialBlocksVisibility(true);
    });
    setIsShow(prevState => {
      return getWindowWidth() >= 768 && getWindowWidth() < 992
        ? getInitialButtonVisibility(false)
        : getInitialButtonVisibility(true);
    });
  }, [windowWidth]);

  useEffect(() => {
    if (selectedRegions) {
      const regionId = getArrayOfId(regions, selectedRegions);
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
  }, [selectedRegions, dispatch, regions]);

  useEffect(() => {
    if (!transportTypeId) {
      return;
    }
    async function getCarTypeParams() {
      if (transportTypeId !== null) {
        const data = await getCarTypeParam(transportTypeId);
        setData(data);
      }
    }
    getCarTypeParams();
  }, [transportTypeId]);

  // обработчики категории машин
  const handlerType = (category: string) => {
    const newResetValue = Array(N).fill(true);
    setResetValue(newResetValue);
    // setSelectedRegions('Регіон');
    // setSelectedCity('Місто');
    // setCarMark('Бренд');
    // setCarModel('Модель');
    // setBrandId([]);
    handlerResetFilter();
    setSelectedCategory(category);
    setTimeout(() => {
      const newResetValueFalse = Array(N).fill(false);
      setResetValue(newResetValueFalse);
    }, 200);
  };

  useEffect(() => {
    const type = typeCars.find(item => item.type === selectedCategory);
    type && setTransportTypeId(type?.typeId);
    if (type) {
      dispatch(fetchBrands(type.typeId));
    }
  }, [typeCars, dispatch, selectedCategory]);

  useEffect(() => {
    const type = typeCars.find(item => item.type === selectedCategory);
    const brand = getArrayBrandsOfId(brands, carMark);

    if (type && brand && brand.length > 0) {
      const id = type.typeId;
      const searchParams: Pick<ISearchParams, 'transportBrandsId'> = {
        transportBrandsId: brand,
      };
      const searchConfig = {
        searchParams,
      };
      setBrandId(brand);
      dispatch(fetchCars({ id, searchConfig }));
    }
  }, [brands, carMark, typeCars, dispatch, selectedCategory]);

  useEffect(() => {
    if (selectedCategory !== prevSelectedCategory) {
      dispatch(cleanFiltredStore({ field: 'carsList' }));
      setTimeout(() => {
        dispatch(cleanFiltredStore({ field: 'cities' }));
      }, 100);
      setOptionList([]);
    } else {
      setOptionList(cities);
    }

    setPrevSelectedCategory(selectedCategory);
  }, [selectedCategory, prevSelectedCategory, cities, dispatch]);

  const handlerCarBody = (valueType: string[]) => {
    setCarBody(valueType);
  };
  const handlerCarFuel = (valueType: string[]) => {
    setCarFuel(valueType);
  };
  const handlerCarTransmission = (valueType: string[]) => {
    setCarTransmission(valueType);
  };
  const handlerCarColor = (valueType: string[]) => {
    setCarColor(valueType);
  };
  const handlerDriveType = (valueType: string[]) => {
    setCarDriveType(valueType);
  };
  const handlerCarTransportCondition = (valueType: string[]) => {
    setCarTransportCondition(valueType);
  };
  const handlerCarWheelConfiguration = (valueType: string | string[]) => {
    setCarWheelConfiguration(valueType);
  };
  const handlerCarNumberAxles = (valueType: string | string[]) => {
    setCarNumberAxles(valueType);
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.checked ? true : undefined);
  };
  // mobile btnShow
  const handleMobileBtnIsOpen = (blockName: keyof BlocksVisibilityState) => {
    setIsOpen(prevState => ({
      ...prevState,
      [blockName]: !prevState[blockName],
    }));
  };
  const handleTabletBtnIsOpen = (blockName: keyof BlocksVisibilityState) => {
    setIsShow(prevState => ({
      ...prevState,
      [blockName]: !prevState[blockName],
    }));
  };
  const handlerResetFilter = () => {
    const newResetValue = Array(N).fill(true);
    setResetValue(newResetValue);
    setEngineDisplacement({ from: 0, to: 0 });
    setYear({ from: 0, to: 0 });
    setPrice({ from: 0, to: 0 });
    setMileage({ from: 0, to: 0 });
    setEnginePower({ from: 0, to: 0 });
    setNumberOfDoors({ from: 0, to: 0 });
    setNumberOfSeats({ from: 0, to: 0 });
    setSelectedCategory('Легкові');
    setCarBody('');
    setCarFuel('');
    setCarTransmission('');
    setCarColor('');
    setCarTransportCondition('');
    setCarDriveType('');
    setCarNumberAxles('');
    setCarWheelConfiguration('');
    setSelectedOption(undefined);
    setCarMark('Бренд');
    setCarModel('Модель');
    setSelectedCity('Місто');
    setSelectedRegions('Область');
    setCountryDeliver('Країна');
    dispatch(cleanFiltredStore({ field: 'carsList' }));
    setTimeout(() => {
      dispatch(cleanFiltredStore({ field: 'cities' }));
    }, 100);
    setTimeout(() => {
      const newResetValueFalse = Array(N).fill(false);
      setResetValue(newResetValueFalse);
    }, 200);
  };

  // надсилання данних фільтра запиту
  const handlerSendRequest = () => {
    const regionId = getArrayOfId(regions, selectedRegions);
    // dispatch(cleanFiltredStore({ field: 'filtredCars' }));
    const modelId = getArrayModelsOfIdForSearch(carsList, carModel);
    const cityId = getArrayCityOfId(cities, selectedCity);
    const bodyTypeId = getArrayCarBodyOfId(bodyTypes, carBody);
    const fuelTypeId = getArrayFuelOfId(fuel, carFuel);
    const driveTypeId = getArrayDriveOfid(driveType, carDriveType);
    const transmissionId = getArrayTransmissionOfId(
      transmission,
      carTransmission,
    );
    const colorId = getArrayColorOfId(transportColor, carColor);
    const conditionId = getArrayConditionOfId(
      transportCondition,
      carTransportCondition,
    );
    const numberAxlesId = getArrayNumberAxlesOfId(
      numberAxles ?? [],
      carNumberAxles,
    );
    const producingCountryId = getArrayProducingCountryOfId(
      producingCountry,
      countryDeliver,
    );
    const wheelConfigurationId = getArrayWheelConfigurationOfId(
      wheelConfiguration ?? [],
      carWheelConfiguration,
    );
    const priceFrom = price.from;
    const priceTo = price.to;
    const yearsFrom = year.from;
    const yearsTo = year.to;
    const mileageFrom = mileage.from;
    const mileageTo = mileage.to;
    const engineDisplacementFrom = engineDisplacement.from;
    const engineDisplacementTo = engineDisplacement.to;
    const enginePowerFrom = enginePower.from;
    const enginePowerTo = enginePower.to;
    const numberOfDoorsFrom = numberOfDoors.from;
    const numberOfDoorsTo = numberOfDoors.to;
    const numberOfSeatsFrom = numberOfSeats.from;
    const numberOfSeatsTo = numberOfSeats.to;
    const bargain = selectedOption;

    dispatch(
      changeFiltredParams({
        transportTypeId,
        brandId,
        cityId,
        modelId,
        regionId,
        bodyTypeId,
        fuelTypeId,
        driveTypeId,
        transmissionId,
        colorId,
        conditionId,
        numberAxlesId,
        producingCountryId,
        wheelConfigurationId,
        priceFrom,
        priceTo,
        yearsFrom,
        yearsTo,
        mileageFrom,
        mileageTo,
        engineDisplacementFrom,
        engineDisplacementTo,
        enginePowerFrom,
        enginePowerTo,
        numberOfDoorsFrom,
        numberOfDoorsTo,
        numberOfSeatsFrom,
        numberOfSeatsTo,
        bargain,
      }),
    );
    handlerResetFilter();
    onAdvencedFilter?.();
    navigate('', { state: { id: 0 } });

    dispatch(saveParamsForSubscr(requestParams));
  };
  // useEffect(() => {
  //   console.log('carModel', carModel);
  //   setCarModel(carModel);
  // }, [carMark, carModel]);
 
  return (
    <div className={styles.AdvSearchFilter}>
      <div className={styles.AdvSearchFilter_container}>
        <div className={styles.AdvSearchFilter_box}>
          {/*RadioButton type car */}
          <div className={styles.list}>
            <div
              className={`${styles.title} ${
                isOpen.block1 ? styles.openBlock : ''
              }`}
              // style={{ marginBottom: isOpen.block1 ? 8 : '' }}
            >
              <h2>Тип</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block1 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block1')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            {isOpen.block1 && (
              <div className={styles.listItem}>
                {typeCars && (
                  <CategoryBar
                    chips="chips"
                    categories={typeCars.map(typeCar => typeCar.type)}
                    handleSelect={handlerType}
                    selectedCategory={selectedCategory}
                  />
                )}
              </div>
            )}
          </div>
          {/*Select Regions */}

          <div className={styles.list}>
            <div
              className={`${styles.title} ${
                isOpen.block2 ? styles.openBlock : ''
              }`}
              // style={{ marginBottom: isOpen.block2 ? 8 : '' }}
            >
              <h2>Область</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block2 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block2')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block2 && (
                <div className={styles.itemdropdownbox}>
                  <Dropdown
                    resetValue={resetValue[0]}
                    updateStyle="advSearch"
                    options={regions.map(region => region.region)}
                    label="Область"
                    startValue="Область"
                    checkboxAllowed
                    allOptionsLabel="Вся Україна"
                    option={selectedRegions}
                    selectedOptions={selectedRegions}
                    setOption={setSelectedRegions}
                    hideLabel={true}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Select City */}

          {cities && cities.length > 0 && (
            <div className={styles.list}>
              <div
                className={`${styles.title} ${
                  isOpen.block3 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block3 ? 8 : '' }}
              >
                <h2>Місто</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block3 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block3')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block3 && (
                  <div className={styles.itemdropdownbox}>
                    <Dropdown
                      resetValue={resetValue[1]}
                      pickedRegions={pickedRegions}
                      updateStyle="advSearch"
                      optionList={optionList}
                      label="Місто"
                      startValue="Місто"
                      checkboxAllowed
                      allOptionsLabel="Місто"
                      option={selectedCity}
                      selectedOptions={selectedCity}
                      setOption={setSelectedCity}
                      title={selectedRegions}
                      hideLabel={true}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/*InputRange Price car */}

          <div className={styles.list}>
            <div
              className={`${styles.title} ${
                isOpen.block4 ? styles.openBlock : ''
              }`}
              // style={{ marginBottom: isOpen.block4 ? 8 : '' }}
            >
              <h2>Ціна</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block4 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block4')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            {isOpen.block4 && (
              <div className={styles.listItem}>
                <RangeSlider
                  resetValue={resetValue[1]}
                  setObjectValue={setPrice}
                  typeRange={'price'}
                  selectedValue={price}
                />
              </div>
            )}
          </div>
          {/*RadioButton type carBody */}

          {bodyTypes && (
            <div className={styles.typeCarBody}>
              <div
                className={`${styles.title} ${
                  isOpen.block5 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block5 ? 8 : '' }}
              >
                <h2>Тип кузову</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block5 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block5')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block5 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[1]}
                    categories={bodyTypes
                      .slice(0, isShow.block1 ? 13 : 5)
                      .map((item: any) => item.bodyType)}
                    handleSelect={handlerCarBody}
                    selectedCategory={carBody}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    } `}
                    onClick={() => handleTabletBtnIsOpen('block1')}
                  >
                    {isShow.block1 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/*Бренд*/}

          <div className={styles.selectBrand}>
            <div
              className={`${styles.title} ${
                isOpen.block20 ? styles.openBlock : ''
              }`}
              // style={{ marginBottom: isOpen.block20 ? 8 : '' }}
            >
              <h2>Бренд</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block20 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block20')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            {isOpen.block20 && (
              <div className={styles.listItemBrand}>
                <div className={styles.dropdownContainer}>
                  <Dropdown
                    resetValue={resetValue[2]}
                    updateStyle="advSearch"
                    options={[...brands.map(brand => brand.brand)].sort(
                      (a, b) => a.localeCompare(b),
                    )}
                    label="Бренд"
                    startValue="Бренд"
                    option={carMark}
                    selectedOptions={carMark}
                    setOption={setCarMark}
                    allOptionsLabel="Всі марки"
                    checkboxAllowed
                    hideLabel={true}
                  />
                </div>
              </div>
            )}
          </div>

          {carsList && carsList.length > 0 && (
            <div className={styles.selectBrand}>
              <div
                className={`${styles.title} ${
                  isOpen.block21 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block21 ? 8 : '' }}
              >
                <h2>Модель</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block21 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block21')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block21 && (
                <div className={styles.listItemBrand}>
                  <div className={styles.dropdownContainer}>
                    <Dropdown
                      resetValue={resetValue[3]}
                      updateStyle="advSearch"
                      optionList={carMark !== 'Всі марки' ? carsList : []}
                      label="Модель"
                      startValue="Модель"
                      allOptionsLabel="Всі моделі"
                      checkboxAllowed
                      option={carModel}
                      selectedOptions={carModel}
                      title={carMark}
                      setOption={setCarModel}
                      carMark={carMark}
                      pickedBrands={pickedBrands}
                      hideLabel={true}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {/*Рік виготовлення инпут слайдер inputText, inputRange   Доработать по стилям! */}

          <div className={styles.list}>
            <div
              className={`${styles.title} ${
                isOpen.block6 ? styles.openBlock : ''
              }`}
              // style={{ marginBottom: isOpen.block6 ? 8 : '' }}
            >
              <h2>Рік</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block6 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block6')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            {isOpen.block6 && (
              <div className={styles.listItem}>
                <RangeSlider
                  resetValue={resetValue[2]}
                  setObjectValue={setYear}
                  typeRange={'year'}
                  selectedValue={year}
                />
              </div>
            )}
          </div>
          {/*RadioButton type Fuel  */}

          {fuel && (
            <div className={styles.listTypeFuil}>
              <div
                className={`${styles.title} ${
                  isOpen.block7 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block7 ? 8 : '' }}
              >
                <h2>Тип палива</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block7 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block7')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block7 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[2]}
                    categories={fuel
                      .slice(0, isShow.block2 ? 8 : 5)
                      .map((item: any) => item.fuelType)}
                    handleSelect={handlerCarFuel}
                    selectedCategory={carFuel}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    }`}
                    onClick={() => handleTabletBtnIsOpen('block2')}
                  >
                    {isShow.block2 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* RadioButton type transmission  */}

          {transmission && (
            <div className={styles.list}>
              <div
                className={`${styles.title} ${
                  isOpen.block8 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block8 ? 8 : '' }}
              >
                <h2>Коробка передач</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block8 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block8')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block8 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[3]}
                    categories={transmission.map(
                      (item: any) => item.transmission,
                    )}
                    handleSelect={handlerCarTransmission}
                    selectedCategory={carTransmission}
                  />
                </div>
              )}
            </div>
          )}
          {/* RadioButton type color  */}

          {transportColor && (
            <div className={styles.listColor}>
              <div
                className={`${styles.title} ${
                  isOpen.block9 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block9 ? 8 : '' }}
              >
                <h2>Колір</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block9 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block9')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block9 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[4]}
                    color="transpotColor"
                    transportColor={transportColor}
                    isShow={isShow.block3}
                    handleSelect={handlerCarColor}
                    selectedCategory={carColor}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    }`}
                    onClick={() => handleTabletBtnIsOpen('block3')}
                  >
                    {isShow.block3 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* RadioButton type Технічний стан */}

          {transportCondition && (
            <div className={styles.listTechCondition}>
              <div
                className={`${styles.title} ${
                  isOpen.block10 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block10 ? 8 : '' }}
              >
                <h2>Технічний стан</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block10 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block10')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block10 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[5]}
                    categories={transportCondition
                      .slice(isShow.block4 ? 0 : 2)
                      .map((item: any) => item.transportCondition)}
                    handleSelect={handlerCarTransportCondition}
                    selectedCategory={carTransportCondition}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    } `}
                    onClick={() => handleTabletBtnIsOpen('block4')}
                  >
                    {isShow.block4 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Пробіг */}

          {mileages && (
            <div className={styles.listCarMileage}>
              <div
                className={`${styles.title} ${
                  isOpen.block11 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block11 ? 8 : '' }}
              >
                <h2>Пробіг</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block11 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block11')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block11 && (
                <div className={styles.listItem}>
                  <RangeSlider
                    resetValue={resetValue[3]}
                    setObjectValue={setMileage}
                    typeRange={'mileage'}
                    selectedValue={mileage}
                  />
                </div>
              )}
            </div>
          )}
          {/* Об`єм двигуна */}
          <div className={styles.listMotorPower}>
            <div
              className={`${styles.title} ${
                isOpen.block12 ? styles.openBlock : ''
              }`}
              // style={{ marginBottom: isOpen.block12 ? 8 : '' }}
            >
              <h2>Об`єм двигуна</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block12 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block12')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            {isOpen.block12 && (
              <div className={styles.listItem}>
                <RangeSlider
                  resetValue={resetValue[4]}
                  setObjectValue={setEngineDisplacement}
                  typeRange={'engineDisplacement'}
                  selectedValue={engineDisplacement}
                />
              </div>
            )}
          </div>

          {/* Потужність двигуна */}

          <div className={styles.listMotorPower}>
            <div
              className={`${styles.title} ${
                isOpen.block13 ? styles.openBlock : ''
              }`}
              // style={{ marginBottom: isOpen.block13 ? 8 : '' }}
            >
              <h2>Потужність двигуна</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block13 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block13')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            {isOpen.block13 && (
              <div className={styles.listItem}>
                <RangeSlider
                  resetValue={resetValue[5]}
                  setObjectValue={setEnginePower}
                  typeRange={'enginePower'}
                  selectedValue={enginePower}
                />
              </div>
            )}
          </div>
          {/* RadioButton type Привід */}

          {driveType && (
            <div className={styles.listMachineDrive}>
              <div
                className={`${styles.title} ${
                  isOpen.block14 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block14 ? 8 : '' }}
              >
                <h2>Привід</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block14 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block14')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block14 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[6]}
                    categories={driveType.map((item: any) => item.driveType)}
                    handleSelect={handlerDriveType}
                    selectedCategory={carDriveType}
                  />
                </div>
              )}
            </div>
          )}
          {/* Кількість дверей */}

          {door && (
            <div className={styles.howManyDoors}>
              <div
                className={`${styles.title} ${
                  isOpen.block15 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block15 ? 8 : '' }}
              >
                <h2>Кількість дверей</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block15 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block15')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block15 && (
                <div className={styles.listItem}>
                  <RangeSlider
                    resetValue={resetValue[6]}
                    setObjectValue={setNumberOfDoors}
                    typeRange={'numberOfDoors'}
                    selectedValue={numberOfDoors}
                  />
                </div>
              )}
            </div>
          )}
          {/* Кількість місць*/}

          {seats && (
            <div className={styles.listNumberSeats}>
              <div
                className={`${styles.title} ${
                  isOpen.block16 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block16 ? 8 : '' }}
              >
                <h2>Кількість місць</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block16 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block16')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block16 && (
                <div className={styles.listItem}>
                  <RangeSlider
                    resetValue={resetValue[7]}
                    setObjectValue={setNumberOfSeats}
                    typeRange={'numberOfSeats'}
                    selectedValue={numberOfSeats}
                  />
                </div>
              )}
            </div>
          )}
          {/* RadioButton type Кількість осей*/}
          {numberAxles && (
            <div className={styles.listNumberAxles}>
              <div
                className={`${styles.title} ${
                  isOpen.block17 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block17 ? 8 : '' }}
              >
                <h2>Кількість осей</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block17 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block17')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block17 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[7]}
                    categories={numberAxles.map(
                      (item: any) => item.numberAxles,
                    )}
                    handleSelect={handlerCarNumberAxles}
                    selectedCategory={carNumberAxles}
                  />
                </div>
              )}
            </div>
          )}
          {/* RadioButton type Конфігурація коліс*/}
          {wheelConfiguration && (
            <div className={styles.listWheelConfiguration}>
              <div
                className={`${styles.title} ${
                  isOpen.block18 ? styles.openBlock : ''
                }`}
                // style={{ marginBottom: isOpen.block18 ? 8 : '' }}
              >
                <h2>Конфігурація коліс</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block18 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block18')}
                >
                  <ArrowDownIcon />
                </div>
              </div>
              {isOpen.block18 && (
                <div className={styles.listItem}>
                  <CategoryCheckBar
                    resetValue={resetValue[8]}
                    categories={wheelConfiguration.map(
                      (item: any) => item.wheelConfiguration,
                    )}
                    handleSelect={handlerCarWheelConfiguration}
                    selectedCategory={carWheelConfiguration}
                  />
                </div>
              )}
            </div>
          )}
          {/* Країна з якої доставили    Select   */}
          <div className={styles.listCountryDelivery}>
            <div
              className={`${styles.title} ${
                isOpen.block19 ? styles.openBlock : ''
              }`}
            >
              <h2>Країна з якої доставили:</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block19 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block19')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            <div className={styles.itemdropdowncontainer}>
              {isOpen.block19 && (
                <div className={styles.itemdropdownbox}>
                  {producingCountry && (
                    <Dropdown
                      resetValue={resetValue[4]}
                      updateStyle="advSearch"
                      options={producingCountry.map(
                        (item: any) => item.producingCountry,
                      )}
                      label="Країна"
                      startValue="Країна"
                      checkboxAllowed
                      allOptionsLabel="Весь світ"
                      option={countryDeliver}
                      selectedOptions={countryDeliver}
                      setOption={setCountryDeliver}
                      hideLabel={true}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Checkbox type */}
          <div className={styles.listSelect}>
            <div
              className={`${styles.title} ${
                isOpen.block22 ? styles.openBlock : ''
              }`}
            >
              <h2>Торг</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block22 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block22')}
              >
                <ArrowDownIcon />
              </div>
            </div>
            {isOpen.block22 && (
              <div className={styles.listItem}>
                <input
                  type="checkbox"
                  name="option"
                  id="bargain"
                  checked={selectedOption === true}
                  onChange={handleOptionChange}
                  className={styles.bargainInput}
                />
                <label htmlFor="bargain" className={styles.bargainLabel}>
                  Можливість торгу
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.resultFilter}>
        <div className={styles.resultFilter_container}>
          <button
            className={styles.resultFilterShow}
            type="button"
            onClick={handlerSendRequest}
          >
            Показати
            <ArrowIcon />
          </button>

          <button
            className={styles.resultFilterReset}
            type="button"
            onClick={handlerResetFilter}
          >
            Скинути фільтр
          </button>
        </div>
      </div>
    </div>
  );
};
