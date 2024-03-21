import React, { useEffect, useRef, ChangeEvent, useState } from 'react';

import styles from './NewAnnouncement.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getFilterBrands,
  getFilterCitys,
  getFilterModels,
  getFilterRegions,
  getFilterTypes,
} from 'redux/filter/selectors';
import { IType } from 'types/IType';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { ReactComponent as Arrowdown } from '../../assets/icons/more-down.svg';
import { ReactComponent as Arrowup } from '../../assets/icons/more-up.svg';
import { postNewAdvertisement, getCarTypeParam } from 'services/services';
import { IRegion } from 'types/IRegion';
import {
  fetchBrands,
  fetchCity,
  fetchModels,
  fetchRegions,
  fetchTypes,
} from 'redux/filter/operations';
import { ISearchParams } from 'types/ISearchParam';
import { ICities } from 'types/ICities';
import { UploadPhoto } from 'components/UploadPhoto/UploadPhoto';
import { UploadedImage } from 'types/UploadedImage';
import {
  getArrayCarBodyOfId,
  getArrayCityOfId,
  getArrayColorOfId,
  getArrayConditionOfId,
  getArrayDriveOfid,
  getArrayFuelOfId,
  getArrayModelsOfId,
  getArrayNumberAxlesOfId,
  getArrayProducingCountryOfId,
  getArrayTransmissionOfId,
  getArrayWheelConfigurationOfId,
} from 'utils/getArrayOfId';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { getInitialBlocksVisibility } from 'utils/getInitialBlocksVisibility';
import { getWindowWidth } from 'utils/getWindowWidth';
import { BlocksVisibilityState } from 'types/BlocksVisibilityState';
import { CityItem } from 'types/CityItem';
import { generateEngineVolumes } from 'utils/generateEngineVolumes';
import { generateYears } from 'utils/generateYears';
import { yearNow } from 'utils/yearNow';

const startVolume = 0.0;
const endVolume = 20.0;
const step = 0.1; 
const startYear = 1970;
const endYear = yearNow();
export const NewAnnouncement: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState<BlocksVisibilityState>(() => {
    return getWindowWidth() < 767
      ? getInitialBlocksVisibility(false)
      : getInitialBlocksVisibility(true);
  });
  const engineVolumesArray = generateEngineVolumes(
    startVolume,
    endVolume,
    step,
  );
  const [engineVolumes, setEngineVolumes] = useState<string | string[]>(
    'Літри',
  );
  const yearsArray = generateYears(startYear, endYear);

  const [selectedImages, setSelectedImages] = useState<UploadedImage[]>([]);
  const [mainPhoto, setMainPhoto] = useState('');
  const [textValue, setTextValue] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const maxDigits = 12;
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>(
    'Вся Україна',
  );
  const [yearCar, setYearCar] = useState<string | string[]>('Рік');
  const [selectedCity, setSelectedCity] = useState<string | string[]>('Місто');
  // response(catalog) get-param
  const [data, setData] = useState<any>([]);
  const [selectedDriveType, setSelectedDriveType] = useState<string | string[]>(
    'Привід',
  );
  const [selectedTransmission, setSelectedTransmission] = useState<
    string | string[]
  >('Коробка передач');
  const [selectedFuelType, setSelectedFuelType] = useState<string | string[]>(
    'Тип палива',
  );
  const [selectedBodyType, setSelectedBodyType] = useState<string | string[]>(
    'Тип кузову',
  );
  const [selectedColor, setSelectedColor] = useState<string | string[]>(
    'Колір',
  );
  const [selectedProducingCountry, setSelectedProducingCountry] = useState<
    string | string[]
  >('Країна');
  const [selectedWheelConfiguration, setSelectedWheelConfiguration] = useState<
    string | string[]
  >('Конфігурація коліс');
  const [selectedAxle, setSelectedAxle] = useState<string | string[]>(
    'Кількість осей',
  );
  const [selectedCondition, setSelectedCondition] = useState<string | string[]>(
    'Технічний стан',
  );
  const [price, setPrice] = useState<number | null>(null);
  const [numberOfSeats, setNumberOfSeats] = useState<number | null>();
  const [numberOfDoors, setNumberOfDoors] = useState<number | null>();
  const [enginePower, setEnginePower] = useState<number | null>();
  const [mileage, setMileage] = useState<number | null>();
  const [selectedOption, setSelectedOption] = useState<boolean>();
  const [transportTypeId, setTransportTypeId] = useState<number | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState<string>('Легкові');
  const [typeCategory, setTypeCategory] = useState<string | string[]>('Тип');
  const [carBrand, setCarBrand] = useState<string | string[]>('Бренд');
  const [carModel, setCarModel] = useState<string | string[]>('Всі моделі');
  const typeCars: IType[] = useAppSelector(getFilterTypes);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const models: IModel[] = useAppSelector(getFilterModels);
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const cities: ICities[] = useAppSelector(getFilterCitys);

  const city: CityItem[] = [];
  if (cities.length > 0) {
    cities?.forEach((item: ICities) => {
      city.push(...item.cities);
    });
  }
  //  response catalog/get-param/id
  const bodyTypes = data?.bodyTypeDTOS;
  const fuel = data?.fuelTypeDTOS;
  const transmission = data?.transmissionDTOS;
  const transportColor = data?.transportColorDTOS;
  const driveType = data?.driveTypeDTOS;
  const transportCondition = data?.transportConditionDTOS;
  const numberAxles = data?.numberAxlesDTOS;
  const wheelConfiguration = data?.wheelConfigurationDTOS;
  const producingCountry = data?.producingCountryDTOS;
  const numberOfDoor = data?.numberOfDoorsTo;
  const engineDisplacement = data?.engineDisplacementFrom;
  const engPower = data?.enginePowerFrom;
  const numberOfSeat = data?.numberOfSeatsTo;
  const mileageTo = data?.mileageTo;

  useEffect(() => {
    if (typeCars.length > 0) {
      return;
    }
    dispatch(fetchTypes());
    if (regions.length > 0) {
      return;
    }
    dispatch(fetchRegions());
  }, [dispatch, typeCars.length, regions.length]);

  useEffect(() => {
    const type = typeCars.find(item => item.type === typeCategory);
    type && setTransportTypeId(type?.typeId);
    if (type) {
      dispatch(fetchBrands(type.typeId));
    }
  }, [typeCars, dispatch, typeCategory]);

  //get-params transportTypeId
  useEffect(() => {
    if (!transportTypeId) {
      return;
    }
    async function getCarTypeParams() {
      const data = await getCarTypeParam(`${transportTypeId}`);
      setData(data);
    }
    getCarTypeParams();
  }, [transportTypeId]);

  useEffect(() => {
    if (selectedRegions && regions) {
      const region = regions.find(item => item.region === selectedRegions);
      const regionId = region?.regionId;
      if (regionId !== null && regionId !== undefined) {
        const searchParams: Pick<ISearchParams, 'regionId'> = {
          regionId: [regionId],
        };
        const searchConfig = {
          searchParams,
        };

        dispatch(fetchCity(searchConfig));
      }
    }
  }, [selectedRegions, dispatch, regions]);
  useEffect(() => {
    const type = typeCars.find(item => item.type === typeCategory);
    const brand = brands.find(item => item.brand === carBrand);
    if (type && brand) {
      // setBrandId([brand?.brandId]);
      dispatch(
        fetchModels({
          transportTypeId: type?.typeId,
          transportBrandId: brand?.brandId,
        }),
      );
    }
  }, [brands, carBrand, typeCars, dispatch, typeCategory]);

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
  }, [windowWidth]);

 
  useEffect(() => {
    if (!transportTypeId) {
      return;
    }
    async function getCarTypeParams() {
      const data = await getCarTypeParam(`${transportTypeId}`);
      setData(data);
    }
    getCarTypeParams();
  }, [transportTypeId]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'Так';
    setSelectedOption(value);
  };
  const handleMobileBtnIsOpen = (blockName: keyof BlocksVisibilityState) => {
    setIsOpen(prevState => ({
      ...prevState,
      [blockName]: !prevState[blockName],
    }));
  };
  const handleInputPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\+[0-9]*$/.test(value) && value.length <= maxDigits + 1) {
      setInputPhone(value);
    }
  };
  const remainingDigits = maxDigits - (inputPhone.length - 1);
  
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;

    if (value.length <= 100) {
      setTextValue(value);
    }
  };
  const handleAddMorePhoto = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleAddPhoto = (newImages: UploadedImage[]) => {
    setSelectedImages(prevImages => [...prevImages, ...newImages]);
  };
  const handleDeletePhoto = (imageId: string) => {
    setSelectedImages(prevImages =>
      prevImages.filter(image => image.id !== imageId),
    );
  };
  const handleMileage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      return;
    }
    setMileage(value);
  };
  const handleEnginePower = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      return;
    }
    setEnginePower(value);
  };
  const handleNumberOfDoors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      return;
    }
    setNumberOfDoors(value);
  };
  const handleNumberOfSeats = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      return;
    }
    setNumberOfSeats(value);
  };
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      return;
    }
    setPrice(value);
  };
  const handleAddMainePhoto = (image: string) => {
    setMainPhoto(image);
  };
  const handleClick = () => {
    if (
      selectedImages.length > 0 &&
      carModel &&
      selectedCity &&
      selectedBodyType &&
      selectedFuelType &&
      selectedDriveType &&
      transmission &&
      // selectedColor &&
      selectedCondition &&
      selectedAxle &&
      // selectedProducingCountry &&
      // selectedWheelConfiguration &&
      yearCar &&
      price &&
      selectedOption &&
      textValue &&
      mainPhoto &&
      engineVolumes &&
      mileage &&
      // numberOfDoors &&
      // numberOfSeats &&
      inputPhone
    ) {
      const createFormData = (selectedImageFile: any) => {
        const modelId = getArrayModelsOfId(models, carModel);
        const cityId = getArrayCityOfId(cities, selectedCity);
        const bodyTypeId = getArrayCarBodyOfId(
          bodyTypes ?? [],
          selectedBodyType,
        );
        const fuelTypeId = getArrayFuelOfId(fuel ?? [], selectedFuelType);
        const driveTypeId = getArrayDriveOfid(
          driveType ?? [],
          selectedDriveType,
        );
        const transmissionId = getArrayTransmissionOfId(
          transmission ?? [],
          selectedTransmission,
        );
        const colorId = getArrayColorOfId(transportColor ?? [], selectedColor);
        const conditionId = getArrayConditionOfId(
          transportCondition ?? [],
          selectedCondition,
        );
        const numberAxlesId = getArrayNumberAxlesOfId(
          numberAxles ?? [],
          selectedAxle,
        );
        const producingCountryId = getArrayProducingCountryOfId(
          producingCountry ?? [],
          selectedProducingCountry,
        );
        const wheelConfigurationId = getArrayWheelConfigurationOfId(
          wheelConfiguration ?? [],
          selectedWheelConfiguration,
        );

        const formData = new FormData();
        selectedImageFile.forEach((item: any) =>
          formData.append('multipartFiles', item.file[0]),
        );

        const requestData = {
          model: modelId[0],
          bodyType: bodyTypeId[0],
          importedFrom: producingCountryId[0],
          year: +yearCar,
          price,
          bargain: selectedOption,
          trade: true,
          // military: true,
          // installmentPayment: true,
          uncleared: true,
          accidentHistory: true,
          condition: conditionId[0],
          // vincode: 'RU2X03BW4ZTUA08WF',
          description: textValue,
          color: colorId[0],
          city: cityId[0],
          mainPhoto: mainPhoto,
          transmission: transmissionId[0],
          fuelType: fuelTypeId[0],
          // fuelConsumptionCity: 50,
          // fuelConsumptionHighway: 50,
          // fuelConsumptionMixed: 50,
          engineDisplacement: engineVolumes,
          enginePower: enginePower,
          driveType: driveTypeId[0],
          mileage,
          numberOfDoors,
          numberOfSeats,
          wheelConfiguration: wheelConfigurationId[0],
          numberAxles: numberAxlesId[0],
          phone: inputPhone,
        };
        formData.append(
          'requestAddTransportDTO',
          new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
        );
        formData.set('Content-Type', 'application/json');

        return formData;
      };

      const formData: FormData = createFormData(selectedImages);

      const jsonString = localStorage.getItem('persist:userRoot');
      if (jsonString) {
        const data = JSON.parse(jsonString);
        const authToken = data.token.replace(/^"(.*)"$/, '$1');
        setIsLoading(true);
        postNewAdvertisement(formData, authToken);
      }
      setCarModel('');
      setSelectedCity('');
      setSelectedBodyType('');
      setSelectedFuelType('');
      setSelectedDriveType('');
      setSelectedTransmission('');
      setSelectedColor('');
      setSelectedCondition('');
      setSelectedAxle('');
      setSelectedProducingCountry('');
      setSelectedWheelConfiguration('');
      setYearCar('');
      setPrice(null);
      setSelectedOption(undefined);
      setTextValue('');
      setMainPhoto('');
      setEngineVolumes('');
      setEnginePower(null);
      setMileage(null);
      setNumberOfDoors(null);
      setNumberOfSeats(null);
      setInputPhone('');
      setSelectedImages([]);
     
        setIsLoading(false);
        navigate('/');
     
    } else {
      alert('Заповніть всі поля!');
    }
  };

  return (
    <section className={styles.section}>
      {isLoading && <Loader />}
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Додавання оголошення</h1>
        <h2 className={styles.title}>Ваші контактні дані</h2>

        <div className={styles.boxPhone}>
          <div className={styles.boxtitle}>
            <h2 className={styles.titlePhone}>Номер телефону</h2>
            <div
              className={`${styles.mobileButton}  ${
                getWindowWidth() >= 768 ? styles.hide : ''
              }`}
              onClick={() => handleMobileBtnIsOpen('block1')}
            >
              {isOpen.block1 ? (
                <Arrowup width={24} height={24} />
              ) : (
                <Arrowdown width={24} height={24} />
              )}
            </div>
          </div>
          {isOpen.block1 && (
            <div className={styles.wrapper_item}>
              <div className={styles.item}>
                <input
                  className={styles.inputPhone}
                  type="text"
                  pattern="\+[0-9]*"
                  placeholder={`+380`}
                  maxLength={maxDigits + 1}
                  value={inputPhone}
                  title={`${remainingDigits} цифр осталось`}
                  onChange={handleInputPhone}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.blocTitleFoto}>
          <div className={styles.boxTitleFoto}>
            <h2 className={styles.titleAddFoto}>Додайте фото</h2>
            <button className={styles.addMore} onClick={handleAddMorePhoto}>
              Додати більше
            </button>
          </div>
          <p className={styles.titleHelpText}>
            Обов’язково додайте мінімум одне фото
          </p>
        </div>
        <div className={styles.imgContainer}>
          <UploadPhoto
            inputRef={inputRef}
            selectedImages={selectedImages}
            handleAddPhoto={handleAddPhoto}
            handleDeletePhoto={handleDeletePhoto}
            addMainPhoto={handleAddMainePhoto}
          />
        </div>

        <h2 className={styles.main_info_title}>Основна інформація</h2>
        <div className={styles.box_item}>
          <div className={styles.box_description}>
            <h2 className={styles.description_car_title}>Опис автомобіля</h2>
            <div
              className={`${styles.mobileButton}  ${
                getWindowWidth() >= 768 ? styles.hide : ''
              }`}
              onClick={() => handleMobileBtnIsOpen('block2')}
            >
              {isOpen.block2 ? (
                <Arrowup width={24} height={24} />
              ) : (
                <Arrowdown width={24} height={24} />
              )}
            </div>
          </div>
          {isOpen.block2 && (
            <div className={styles.wrapper_item}>
              <div className={styles.listItem}>
                <textarea
                  id="story"
                  name="story"
                  rows={5}
                  cols={33}
                  className={styles.textarea}
                  maxLength={100}
                  placeholder="Text"
                  value={textValue}
                  onChange={handleTextareaChange}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Tип</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block3')}
              >
                {isOpen.block3 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block3 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      typeCars
                        ? typeCars.map(typeCar => typeCar.type)
                        : 'Нема співпадінь'
                    }
                    label="Тип"
                    startValue="Тип"
                    allOptionsLabel="Всі типи"
                    option={typeCategory}
                    setOption={setTypeCategory}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Бренд</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block4')}
              >
                {isOpen.block4 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block4 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={[...brands.map(brand => brand.brand)].sort(
                      (a, b) => a.localeCompare(b),
                    )}
                    label="Бренд"
                    startValue="Бренд"
                    option={carBrand}
                    setOption={setCarBrand}
                    allOptionsLabel="Всі бренди"
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Модель</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block5')}
              >
                {isOpen.block5 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block5 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      carBrand !== 'Всі марки'
                        ? models.map(item => item.model)
                        : []
                    }
                    label="Модель"
                    startValue="Модель"
                    allOptionsLabel="Всі моделі"
                    option={carModel}
                    setOption={setCarModel}
                    carMark={carBrand}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Рік</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block6')}
              >
                {isOpen.block6 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block6 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={yearsArray.map(item => item)}
                    label="Рік"
                    startValue="Рік"
                    allOptionsLabel="Всі моделі"
                    option={yearCar}
                    setOption={setYearCar}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Тип кузову</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block7')}
              >
                {isOpen.block7 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block7 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      bodyTypes
                        ? bodyTypes.map((item: any) => item.bodyType)
                        : 'Нема співпадінь'
                    }
                    label="Тип кузову"
                    startValue="Тип кузову"
                    allOptionsLabel="Тип кузову"
                    option={selectedBodyType}
                    setOption={setSelectedBodyType}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Тип палива</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block8')}
              >
                {isOpen.block8 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block8 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      fuel
                        ? fuel.map((item: any) => item.fuelType)
                        : 'Нема співпадінь'
                    }
                    label="Тип палива"
                    startValue="Тип палива"
                    allOptionsLabel="Тип палива"
                    option={selectedFuelType}
                    setOption={setSelectedFuelType}
                  />
                </div>
              )}
            </div>
          </div>
          {engineDisplacement && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>Об'єм двигуна</h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block9')}
                >
                  {isOpen.block9 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block9 && (
                  <div className={styles.item_dropdown_box}>
                    <Dropdown
                      updateStyle="advSearch"
                      options={engineVolumesArray.map(item => item)}
                      label="Літри"
                      startValue="Літри"
                      allOptionsLabel="Об'єм двигуна"
                      option={engineVolumes}
                      setOption={setEngineVolumes}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {transmission && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>
                  Коробка передач
                </h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block10')}
                >
                  {isOpen.block10 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block10 && (
                  <div className={styles.item_dropdown_box}>
                    <Dropdown
                      updateStyle="advSearch"
                      options={
                        transmission
                          ? transmission.map((item: any) => item.transmission)
                          : 'Нема співпадінь'
                      }
                      label="Коробка передач"
                      startValue="Коробка передач"
                      allOptionsLabel="Коробка передач"
                      option={selectedTransmission}
                      setOption={setSelectedTransmission}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {mileageTo && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>Пробіг</h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block11')}
                >
                  {isOpen.block11 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block11 && (
                  <div className={styles.item_dropdown_box}>
                    <input
                      className={styles.inputPhone}
                      type="number"
                      min={0}
                      max={1000000}
                      placeholder="0 - 1000000"
                      value={mileage ?? ''}
                      onChange={handleMileage}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {engPower && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>
                  Потужність двигуна
                </h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block12')}
                >
                  {isOpen.block12 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block12 && (
                  <div className={styles.item_dropdown_box}>
                    <input
                      className={styles.inputPhone}
                      type="number"
                      min={0}
                      max={5000}
                      placeholder="20 - 5000"
                      value={enginePower ?? ''}
                      onChange={handleEnginePower}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {driveType && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>Привід</h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block13')}
                >
                  {isOpen.block13 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block13 && (
                  <div className={styles.item_dropdown_box}>
                    <Dropdown
                      updateStyle="advSearch"
                      options={
                        driveType
                          ? driveType.map((item: any) => item.driveType)
                          : 'Нема співпадінь'
                      }
                      label="Привід"
                      startValue="Привід"
                      allOptionsLabel="Привід"
                      option={selectedDriveType}
                      setOption={setSelectedDriveType}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Область</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block14')}
              >
                {isOpen.block14 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block14 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      regions
                        ? regions.map(region => region.region)
                        : 'Нема співпадінь'
                    }
                    label="Область"
                    startValue="Оласть"
                    allOptionsLabel="Вся Україна"
                    option={selectedRegions}
                    setOption={setSelectedRegions}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Місто</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block15')}
              >
                {isOpen.block15 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block15 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      city && city.length > 0
                        ? city.map((item: CityItem) => item.city)
                        : 'Місто'
                    }
                    label="Місто"
                    startValue="Місто"
                    allOptionsLabel="Місто"
                    option={selectedCity}
                    setOption={setSelectedCity}
                  />
                </div>
              )}
            </div>
          </div>
          <h2 className={styles.main_info_title}>Технічна інформація</h2>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Колір</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block16')}
              >
                {isOpen.block16 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block16 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      transportColor &&
                      transportColor.map((item: any) => item.transportColor)
                    }
                    label="Колір"
                    startValue="Колір"
                    allOptionsLabel="Вся Україна"
                    option={selectedColor}
                    setOption={setSelectedColor}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Технічний стан</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block17')}
              >
                {isOpen.block17 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block17 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      transportCondition
                        ? transportCondition.map(
                            (item: any) => item.transportCondition,
                          )
                        : 'Нема співпадінь'
                    }
                    label="Технічний стан"
                    startValue="Технічний стан"
                    allOptionsLabel="Технічний стан"
                    option={selectedCondition}
                    setOption={setSelectedCondition}
                  />
                </div>
              )}
            </div>
          </div>
          {numberOfDoor && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>
                  Кількість дверей
                </h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block18')}
                >
                  {isOpen.block18 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block18 && (
                  <div className={styles.item_dropdown_box}>
                    <input
                      className={styles.inputPhone}
                      type="number"
                      min={2}
                      max={5}
                      placeholder="2 - 5"
                      value={numberOfDoors ?? ''}
                      onChange={handleNumberOfDoors}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {numberOfSeat && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>
                  Кількість місць
                </h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block19')}
                >
                  {isOpen.block19 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block19 && (
                  <div className={styles.item_dropdown_box}>
                    <input
                      className={styles.inputPhone}
                      type="number"
                      min={2}
                      max={18}
                      placeholder="2 - 18"
                      value={numberOfSeats ?? ''}
                      onChange={handleNumberOfSeats}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {numberAxles && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>Кількість осей</h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block20')}
                >
                  {isOpen.block20 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block20 && (
                  <div className={styles.item_dropdown_box}>
                    <Dropdown
                      updateStyle="advSearch"
                      options={
                        numberAxles
                          ? numberAxles.map((item: any) => item.numberAxles)
                          : 'Нема співпадінь'
                      }
                      label="Кількість осей"
                      startValue="Кількість осей"
                      allOptionsLabel="Кількість осей"
                      option={selectedAxle}
                      setOption={setSelectedAxle}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {wheelConfiguration && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>
                  Конфігурація коліс
                </h2>
                <div
                  className={`${styles.mobileButton}  ${
                    getWindowWidth() >= 768 ? styles.hide : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block21')}
                >
                  {isOpen.block21 ? (
                    <Arrowup width={24} height={24} />
                  ) : (
                    <Arrowdown width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.listItem}>
                {isOpen.block21 && (
                  <div className={styles.item_dropdown_box}>
                    <Dropdown
                      updateStyle="advSearch"
                      options={
                        wheelConfiguration
                          ? wheelConfiguration.map(
                              (item: any) => item.wheelConfiguration,
                            )
                          : 'Нема співпадінь'
                      }
                      label="Конфігурація коліс"
                      startValue="Конфігурація коліс"
                      allOptionsLabel="Конфігурація коліс"
                      option={selectedWheelConfiguration}
                      setOption={setSelectedWheelConfiguration}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>
                {getWindowWidth() >= 768 ? (
                  <>
                    Країна з якої <br /> доставили:
                  </>
                ) : (
                  'Країна з якої доставили:'
                )}
              </h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block22')}
              >
                {isOpen.block22 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block22 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      producingCountry
                        ? producingCountry.map(
                            (item: any) => item.producingCountry,
                          )
                        : 'Нема співпадінь'
                    }
                    label="Країна"
                    startValue="Країна"
                    allOptionsLabel="Весь Світ"
                    option={selectedProducingCountry}
                    setOption={setSelectedProducingCountry}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Можливість торгу</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block23')}
              >
                {isOpen.block23 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block23 && (
                <div className={styles.listItemSelectTitle}>
                  <label
                    htmlFor="No"
                    className={`${styles.itemTypeNo} ${
                      selectedOption === false ? styles.selected : ''
                    }`}
                  >
                    Ні
                    <input
                      type="radio"
                      name="option"
                      id="No"
                      value="Ні"
                      checked={selectedOption === false}
                      onChange={handleOptionChange}
                    />
                  </label>
                  <label
                    htmlFor="Yes"
                    className={`${styles.itemTypeYes}
                      ${selectedOption === true ? styles.selected : ''}
                      `}
                  >
                    Так
                    <input
                      type="radio"
                      name="option"
                      id="Yes"
                      value="Так"
                      checked={selectedOption === true}
                      onChange={handleOptionChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          {/* </div>
          </div>  */}
          <h2 className={styles.main_info_title}>Вартість</h2>
          <div className={styles.box_item_price}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Ціна</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block24')}
              >
                {isOpen.block24 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block24 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="number"
                    min={100}
                    max={10000000}
                    placeholder="100 - 10000000"
                    value={price ?? ''}
                    onChange={handlePrice}
                  />
                </div>
              )}
            </div>
          </div>
          <button
            className={styles.btn_advers}
            type="button"
            onClick={handleClick}
          >
            Розмістити оголошення
          </button>
        </div>
      </div>
    </section>
  );
};
