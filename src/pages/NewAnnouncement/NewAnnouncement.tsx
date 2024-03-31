import React, { useEffect, useRef, useState } from 'react';
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
import {
  postNewAdvertisement,
  getCarTypeParam,
  getAdvertisement,
} from 'services/services';
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
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { getInitialBlocksVisibility } from 'utils/getInitialBlocksVisibility';
import { getWindowWidth } from 'utils/getWindowWidth';
import { BlocksVisibilityState } from 'types/BlocksVisibilityState';
import { CityItem } from 'types/CityItem';
import { generateEngineVolumes } from 'utils/generateEngineVolumes';
import { generateYears } from 'utils/generateYears';
import { yearNow } from 'utils/yearNow';
import { extractPhotoName } from 'utils/extractPhotoName';

const startVolume = 0.0;
const endVolume = 20.0;
const step = 0.1;
const startYear = 1970;
const endYear = yearNow();
const N = 20;
export const NewAnnouncement: React.FC = () => {
  const jsonString = localStorage.getItem('persist:userRoot');
  const inputRef = useRef<HTMLInputElement>(null);
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdvertisementsEdit = location.pathname === '/advertisements/edit';
  const isAdvertisements = location.pathname === '/advertisements';
  const dispatch = useAppDispatch();
  const [authToken, setAuthToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [responseData, setResponseData] = useState<any>(null);
console.log('responseData :>> ', responseData);
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

  const [isShow, setIsShow] = useState(Array(N).fill(false));
  const [messages, setMessages] = useState(Array(N).fill(''));
  const [activeField, setActiveField] = useState(Array(N).fill(''));
  const openNotification = (index: number, message: string) => {
    setIsShow(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setMessages(prevState => {
      const newMessages = [...prevState];
      newMessages[index] = message;
      return newMessages;
    });
  };

  const closeModal = (index: number) => {
    setIsShow(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };
  const [selectedImages, setSelectedImages] = useState<UploadedImage[]>([]);
  const [mainPhoto, setMainPhoto] = useState<string>('');
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
  const [fuelConsumption, setFuelConsumption] = useState<string | string[]>('');
  const [vincode, setVinCode] = useState<string>('');

  const [price, setPrice] = useState<number | null>(null);
  const [numberOfSeats, setNumberOfSeats] = useState<number | null>(null);
  const [numberOfDoors, setNumberOfDoors] = useState<number | null>(null);
  const [enginePower, setEnginePower] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<boolean>();
  const [transportTypeId, setTransportTypeId] = useState<number | null>(null);
  const [typeCategory, setTypeCategory] = useState<string | string[]>('');
  const [carBrand, setCarBrand] = useState<string | string[]>('');
  const [carModel, setCarModel] = useState<string | string[]>('');
  console.log('transportTypeId :>> ', transportTypeId);
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
  const engineDisplacement = data?.engineDisplacementTo;
  const engPower = data?.enginePowerFrom;
  const numberOfSeat = data?.numberOfSeatsTo;
  const mileageTo = data?.mileageTo;
  useEffect(() => {
    if (!isAdvertisements || !authToken) {
      return;
    }
    if (isAdvertisements && authToken) {
      setIsLoading(true);
      setResponseData(null);
      setTypeCategory('');
      setCarBrand('');
      setSelectedRegions('Вся Україна');
      setCarModel('');
      setSelectedCity('Місто');
      setSelectedBodyType( 'Тип кузову');
      setSelectedFuelType( 'Тип палива');
      setSelectedDriveType('Привід');
      setSelectedTransmission('Коробка передач');
      setFuelConsumption('');
      setSelectedColor('Колір');
      setSelectedCondition('Технічний стан');
      setSelectedAxle('Кількість осей');
      setSelectedProducingCountry('Країна');
      setSelectedWheelConfiguration('Конфігурація коліс');
      setYearCar('Рік');
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
      setVinCode('');
      setSelectedImages([]);
      setIsLoading(false);
    }
  }, [isAdvertisements,authToken]);

  useEffect(() => {
    if (jsonString) {
      const data = JSON.parse(jsonString);
      const token = data.token.replace(/^"(.*)"$/, '$1');
      setAuthToken(token);
    }
  }, [jsonString]);
  useEffect(() => {
    const fetchData = async () => {
      if (!isAdvertisementsEdit || !authToken) {
        return;
      }
      if (isAdvertisementsEdit && authToken) {
        const id = location.state.id;

        try {
          const response = await getAdvertisement(id, authToken);
          console.log('response :>> ', response);
          setResponseData(response);
          setTypeCategory(response.type);
          setCarBrand(response.brand);
          setSelectedRegions(response.region);
          setTimeout(() => {
            setCarModel(response.model);
            setSelectedCity(response.city);
          }, 200);
          setSelectedBodyType(response.bodyType);
          setSelectedFuelType(response.fuelType);
          setSelectedDriveType(response.driveType);
          setSelectedTransmission(response.transmission);
          setFuelConsumption(response.fuelConsumptionMixed);
          setSelectedColor(response.color);
          setSelectedCondition(response.condition);
          setSelectedAxle(response.numberAxles);
          setSelectedProducingCountry(response.importedFrom);
          setSelectedWheelConfiguration(response.wheelConfiguration);
          setYearCar(response.year);
          setPrice(response.price);
          setSelectedOption(response.bargain);
          setTextValue(response.description);
          setMainPhoto(
            response.mainPhoto
              ? extractPhotoName(response.mainPhoto) || ''
              : '',
          );
          setEngineVolumes(response.engineDisplacement);
          setEnginePower(response.enginePower);
          setMileage(response.mileage);
          setNumberOfDoors(response.numberOfDoors);
          setNumberOfSeats(response.numberOfSeats);
          setInputPhone(response.phone);
          setVinCode(response.vincode);
          setSelectedImages([
            {
              name: response.mainPhoto
                ? extractPhotoName(response.mainPhoto) || ''
                : '',
              url: response.galleries[0].transportGalleryUrl,
              id: response.galleries[0].transportGalleryId,
            },
          ]);
          setIsLoading(false);
        } catch (error) {
          console.log('error :>> ', error);
        }
      }
    };

    fetchData();
  },[]);

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
    event.target.classList.remove(styles.inputVincodeInValid);
    closeModal(16);
    if (/^\+[0-9]*$/.test(value) && value.length <= maxDigits + 1) {
      setInputPhone(value);
    }
  };
  const remainingDigits = maxDigits - (inputPhone.length - 1);
  // const handleInputPhoneFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   if (value.length !== 13) {
  //     openNotification(16, 'Приклад +380980001111');
  //   }
  // };
  const handleInputPhoneBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length !== 13) {
      event.currentTarget.classList.add(styles.inputVincodeInValid);

      openNotification(16, `Залишилось ввести цифр ${remainingDigits}!`);
    }
    if (value.length === 13) {
      event.currentTarget.classList.remove(styles.inputVincodeInValid);

      closeModal(16);
    }
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;

    if (value.length <= 2000) {
      setTextValue(value);
    }
  };
  const handleAddMorePhoto = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleAddPhoto = (newImages: UploadedImage[]) => {
    closeModal(0);
    setSelectedImages(prevImages => [...prevImages, ...newImages]);
  };
  const handleDeletePhoto = (imageId: string, name: string) => {
    setSelectedImages(prevImages =>
      prevImages.filter(image => image.id !== imageId),
    );
    if (name === mainPhoto) {
      setMainPhoto('');
    }
  };

  const handleVinCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regexp = '(^[A-Z0-9]*$)|^$';
    const regex = new RegExp(regexp);
    const isValid = regex.test(value);
    if (isValid || value === '') {
      setVinCode(value);
    } else {
      setVinCode('');
    }
  };
  const handleFocus = (
    index: number,
    event: React.FocusEvent<HTMLInputElement>,
    name: string,
  ) => {
    openNotification(index, '');
    setActiveField(prevState => {
      const activeField = [...prevState];
      activeField[index] = name;
      return activeField;
    });
    event.currentTarget.classList.remove(styles.inputVincodeInValid);
    event.currentTarget.classList.remove(styles.inputVincodeValid);
  };

  const handleBlur = (
    index: number,
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setActiveField(prevState => {
      const activeField = [...prevState];
      activeField[index] = null;
      return activeField;
    });
    if (value.length !== 17) {
      event.currentTarget.classList.add(styles.inputVincodeInValid);
      openNotification(
        index,
        'VIN code містить 17 символів, приклад SN2X03BW4ZTUA08WF',
      );
    }
    if (value.length === 17) {
      event.currentTarget.classList.remove(styles.inputVincodeInValid);
      closeModal(index);
    }
  };

  const handleMileage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.classList.remove(styles.inputVincodeInValid);
    closeModal(11);
    if (value === '') {
      setMileage(null);
      return;
    }
    const parsedValue: number = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      return;
    }
    setMileage(parsedValue);
  };
  const handleEnginePower = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setEnginePower(null);
      return;
    }
    const parsedValue: number = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      return;
    }
    setEnginePower(parsedValue);
  };
  const handleNumberOfDoors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setNumberOfDoors(null);
      return;
    }
    const parsedValue: number = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      return;
    }
    if (2 > parsedValue || parsedValue > 5) {
      return 2;
    }
    setNumberOfDoors(parsedValue);
  };
  const handleNumberOfSeats = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setNumberOfSeats(null);
      return;
    }
    const parsedValue: number = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      return;
    }
    if (parsedValue > 18) {
      return;
    }
    setNumberOfSeats(parsedValue);
  };
  const handleBlurSeats = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);

    if (value < 2) {
      setNumberOfSeats(null);
    }
  };
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.classList.remove(styles.inputVincodeInValid);
    closeModal(15);
    if (value === '') {
      setPrice(null);
      return;
    }
    const parsedValue: number = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      return;
    }
    setPrice(parsedValue);
  };
  const handleAddMainePhoto = (title: string) => {
    setMainPhoto(title);
  };
  const handleClick = () => {
    if (
      selectedImages.length > 0 &&
      mainPhoto !== '' &&
      price &&
      selectedCity !== 'Місто' &&
      carModel !== '' &&
      yearCar !== 'Рік' &&
      selectedBodyType !== 'Тип кузову' &&
      selectedFuelType !== 'Тип палива' &&
      fuelConsumption !== 'Літри' &&
      selectedTransmission !== 'Коробка передач' &&
      mileage &&
      engineVolumes !== 'Літри' &&
      selectedDriveType !== 'Привід' &&
      inputPhone.length === 13
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
          vincode: vincode,
          description: textValue,
          color: colorId[0],
          city: cityId[0],
          mainPhoto: mainPhoto,
          transmission: transmissionId[0],
          fuelType: fuelTypeId[0],
          fuelConsumptionMixed: +fuelConsumption,
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
        postNewAdvertisement(formData, authToken)
          .then(response => {
            navigate(`/catalog/${response}`);
          })
          .catch(error => {
            console.error('Произошла ошибка:', error);
          });

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
      }
    } else {
      if (!selectedImages.length && !mainPhoto) {
        openNotification(0, 'Додайте фото!');
      }
      if (typeCategory === 'Тип') {
        openNotification(1, 'Виберіть тип автомобіля!');
      }
      // if (!vincode && input1Ref.current) {
      //   input1Ref.current.classList.add(styles.inputVincodeInValid);
      //   openNotification(2, 'Додайте VIN code!');
      // }
      if (carBrand === 'Бренд') {
        openNotification(3, 'Виберіть бренд автомобіля!');
      }
      if (carModel === 'Модель') {
        openNotification(4, 'Виберіть модель автомобіля!');
      }
      if (yearCar === 'Рік') {
        openNotification(5, 'Виберіть рік випуску автомобіля!');
      }
      if (selectedBodyType === 'Тип кузову') {
        openNotification(6, 'Виберіть тип кузову автомобіля!');
      }
      if (selectedFuelType === 'Тип палива') {
        openNotification(7, 'Виберіть тип палива автомобіля!');
      }
      if (fuelConsumption === 'Літри') {
        openNotification(8, 'Виберіть середню витрату палива!');
      }
      if (engineVolumes === 'Літри') {
        openNotification(9, "Виберіть об'єм двигуна автомобіля!");
      }
      if (selectedTransmission === 'Коробка передач') {
        openNotification(10, 'Виберіть коробку передач автомобіля!');
      }
      if (!mileage && input2Ref.current) {
        input2Ref.current.classList.add(styles.inputVincodeInValid);
        openNotification(11, 'Додайте пробіг автомобіля!');
      }
      if (selectedDriveType === 'Привід') {
        openNotification(12, 'Виберіть привід автомобіля!');
      }
      if (selectedRegions === 'Область') {
        openNotification(13, 'Виберіть область!');
      }
      if (selectedCity === 'Місто') {
        openNotification(14, 'Виберіть місто!');
      }
      if (!price && input3Ref.current) {
        input3Ref.current.classList.add(styles.inputVincodeInValid);
        openNotification(15, 'Додайте ціну автомобіля!');
      }
      if (!inputPhone && input4Ref.current) {
        input4Ref.current.classList.add(styles.inputVincodeInValid);
        openNotification(16, 'Додайте номер телефону!');
      }
    }
  };

  return (
    <section className={styles.section}>
      {isLoading && <Loader />}
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>
          {isAdvertisementsEdit
            ? 'Редагування оголошення'
            : 'Додавання оголошення'}
        </h1>

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
            mainPhoto={mainPhoto}
            isShow={isShow[0]}
            inputRef={inputRef}
            selectedImages={selectedImages}
            handleAddPhoto={handleAddPhoto}
            handleDeletePhoto={handleDeletePhoto}
            addMainPhoto={handleAddMainePhoto}
          />
          {isShow[0] && (
            <span className={styles.photo_errorMessage}>{messages[0]}</span>
          )}
        </div>

        <h2 className={styles.main_info_title}>Основна інформація</h2>
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
                  stylepaddingZero={true}
                  isShow={isShow[1]}
                  index={1}
                  closeModal={closeModal}
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
                {isShow[1] && (
                  <span className={styles.photo_errorMessage}>
                    {messages[1]}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
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
                  rows={15}
                  cols={133}
                  className={styles.textarea}
                  maxLength={2000}
                  placeholder="Text"
                  value={textValue}
                  onChange={handleTextareaChange}
                />
                <div
                  style={{
                    paddingLeft: '3px',
                    textAlign: 'left',
                    fontSize: '12px',
                    color: 'gray',
                  }}
                >
                  {textValue.length.toString().padStart(4, '0')} / 2000
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>VIN code</h2>
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
                  {vincode ? (
                    <label
                      htmlFor="vincode"
                      className={
                        activeField[2] !== 'vincode' && messages[2]
                          ? `${styles.VinCode_red}`
                          : `${styles.VinCode_label}`
                      }
                    >
                      VIN code
                    </label>
                  ) : null}
                  <input
                    ref={input1Ref}
                    className={`${styles.inputPhone} ${styles.VinCode_field}`}
                    onFocus={event => handleFocus(2, event, 'vincode')}
                    onBlur={event => handleBlur(2, event)}
                    id="vincode"
                    type="text"
                    maxLength={17}
                    placeholder={`VIN code`}
                    value={vincode}
                    onChange={handleVinCode}
                  />
                  {isShow[2] && (
                    <span className={styles.VinCode_errorMessage}>
                      {messages[2]}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {brands && brands.length > 0 && (
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
                      stylepaddingZero={true}
                      isShow={isShow[3]}
                      index={3}
                      closeModal={closeModal}
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
                    {isShow[3] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[3]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {models && models.length > 0 && (
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
                      stylepaddingZero={true}
                      isShow={isShow[4]}
                      index={4}
                      closeModal={closeModal}
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
                    {isShow[4] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[4]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
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
                    stylepaddingZero={true}
                    isShow={isShow[5]}
                    index={5}
                    closeModal={closeModal}
                    updateStyle="advSearch"
                    options={yearsArray.map(item => item)}
                    label="Рік"
                    startValue="Рік"
                    allOptionsLabel="Всі моделі"
                    option={yearCar}
                    setOption={setYearCar}
                  />
                  {isShow[5] && (
                    <span className={styles.photo_errorMessage}>
                      {messages[5]}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {bodyTypes && (
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
                      stylepaddingZero={true}
                      isShow={isShow[6]}
                      index={6}
                      closeModal={closeModal}
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
                    {isShow[6] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[6]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {fuel && (
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
                      stylepaddingZero={true}
                      isShow={isShow[7]}
                      index={7}
                      closeModal={closeModal}
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
                    {isShow[7] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[7]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {fuel && (
            <div className={styles.box_item}>
              <div className={styles.boxtitle}>
                <h2 className={styles.description_car_title}>
                  Середня витрата <br /> палива
                </h2>
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
                      stylepaddingZero={true}
                      isShow={isShow[8]}
                      index={8}
                      closeModal={closeModal}
                      updateStyle="advSearch"
                      options={engineVolumesArray.map(item => item)}
                      label="Літри"
                      startValue="Літри"
                      option={fuelConsumption}
                      setOption={setFuelConsumption}
                    />
                    {isShow[8] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[8]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
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
                      stylepaddingZero={true}
                      isShow={isShow[9]}
                      index={9}
                      closeModal={closeModal}
                      updateStyle="advSearch"
                      options={engineVolumesArray.map(item => item)}
                      label="Літри"
                      startValue="Літри"
                      allOptionsLabel="Об'єм двигуна"
                      option={engineVolumes}
                      setOption={setEngineVolumes}
                    />
                    {isShow[9] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[9]}
                      </span>
                    )}
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
                      stylepaddingZero={true}
                      isShow={isShow[10]}
                      index={10}
                      closeModal={closeModal}
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
                    {isShow[10] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[10]}
                      </span>
                    )}
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
                      ref={input2Ref}
                      className={styles.inputPhone}
                      type="text"
                      placeholder="0"
                      maxLength={7}
                      value={mileage ?? ''}
                      onChange={handleMileage}
                    />
                    {isShow[11] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[11]}
                      </span>
                    )}
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
                      type="text"
                      maxLength={4}
                      placeholder="0"
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
                      stylepaddingZero={true}
                      isShow={isShow[12]}
                      index={12}
                      closeModal={closeModal}
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
                    {isShow[12] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[12]}
                      </span>
                    )}
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
                    stylepaddingZero={true}
                    isShow={isShow[13]}
                    index={13}
                    closeModal={closeModal}
                    updateStyle="advSearch"
                    options={
                      regions
                        ? regions.map(region => region.region)
                        : 'Нема співпадінь'
                    }
                    label="Область"
                    startValue="Область"
                    allOptionsLabel="Вся Україна"
                    option={selectedRegions}
                    setOption={setSelectedRegions}
                  />
                  {isShow[13] && (
                    <span className={styles.photo_errorMessage}>
                      {messages[13]}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {city && city.length > 0 && (
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
                      stylepaddingZero={true}
                      isShow={isShow[14]}
                      index={14}
                      closeModal={closeModal}
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
                    {isShow[14] && (
                      <span className={styles.photo_errorMessage}>
                        {messages[14]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          <h2 className={styles.main_info_title}>Технічна інформація</h2>
          {transportColor && (
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
                      stylepaddingZero={true}
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
          )}
          {transportCondition && (
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
                      stylepaddingZero={true}
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
          )}
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
                      type="text"
                      maxLength={1}
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
                      onBlur={handleBlurSeats}
                      type="text"
                      maxLength={2}
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
                      stylepaddingZero={true}
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
                      stylepaddingZero={true}
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
          {producingCountry && (
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
                      stylepaddingZero={true}
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
          )}

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
                    ref={input3Ref}
                    className={styles.inputPhone}
                    type="text"
                    placeholder="0"
                    value={price ?? ''}
                    onChange={handlePrice}
                  />
                  {isShow[15] && (
                    <span className={styles.VinCode_errorMessage}>
                      {messages[15]}
                    </span>
                  )}
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
                    ref={input4Ref}
                    className={styles.inputPhone}
                    type="text"
                    pattern="\+[0-9]*"
                    placeholder={`+380`}
                    maxLength={maxDigits + 1}
                    value={inputPhone}
                    title={`${remainingDigits} цифр залишилось`}
                    // onFocus={handleInputPhoneFocus}
                    onBlur={handleInputPhoneBlur}
                    onChange={handleInputPhone}
                  />
                  {isShow[16] && (
                    <span className={styles.VinCode_errorMessage}>
                      {messages[16]}
                    </span>
                  )}
                </div>
              </div>
            )}
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

// accidentHistory:true
// bargain:true
// bodyType:"Седан"
// brand:"BMW"
// city:"Вінниця"
// color:"Сірий"
// condition:"Повністю непошкоджене"
// description:"Потужний німецький автомобіль."
// driveType:"Задній"
// engineDisplacement:3
// enginePower:300
// fuelConsumptionMixed:10
// fuelType:"Бензин"
// galleries:
// [{transportGalleryId: 53,…}]
// id:66
// importedFrom:"Німеччина"
// lastUpdate:"2024-03-29T13:55:01.081403"
// mainPhoto:"http://res.cloudinary.com/de4bysqtm/image/upload/v1711637041/1711637040888_bmw-m3.jpg.jpg"
// mileage:100000
// model:"M3"
// numberOfDoors:4
// numberOfSeats:5
// phone:"+380980341818"
// price:5000
// region:"Вінницька область"
// trade:true
// transmission:"Типтронік"
// uncleared:true
// vincode:"SA22TT45U367X4Z2M"
// year:2015
// ================to send update==================
// {
//   "multipartFiles": [
//     "string"
//   ],
//   "body": {
//     "year": 2023,
//     "mileage": 0,
//     "bodyType": 0,
//     "city": 0,
//     "vincode": "",
//     "description": "string",
//     "transmission": 0,
//     "fuelType": 0,
//     "consumptionCity": 50,
//     "consumptionHighway": 50,
//     "consumptionMixed": 50,
//     "engineDisplacement": 0,
//     "enginePower": 0,
//     "driveType": 0,
//     "numberOfDoors": 0,
//     "numberOfSeats": 0,
//     "color": 0,
//     "accidentHistory": true,
//     "condition": 0,
//     "price": 0,
//     "bargain": true,
//     "trade": true,
//     "military": true,
//     "installmentPayment": true,
//     "uncleared": true,
//     "loadCapacity": 0,
//     "producingCountry": 0,
//     "wheelConfiguration": 0,
//     "numberAxles": 0,
//     "mainPhoto": "string",
//     "phone": ""vincode

//   }
// }
