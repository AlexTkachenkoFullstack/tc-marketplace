import React, { useCallback, useEffect, useRef, useState } from 'react';
import { franc } from 'franc';
import styles from './NewAnnouncement.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getFilterBrands,
  getFilterCities,
  getFilterModels,
  getFilterRegions,
  getFilterTypes,
  getIsloadingFiltredCars,
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
  putDeleteAdvertisement,
  deletePhotoAdvertisement,
  putEditAdvertisement,
  // putEditAdvertisement,
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
import { ReactComponent as Trash } from '../../assets/icons/delete.svg';
import { cleanFiltredStore } from 'redux/filter/slice';
import { useSelector } from 'react-redux';
interface RequestData {
  [key: string]: any;
}

interface ResponseData {
  [key: string]: any;
}
const staticValue = '+380';
const startVolume = 0.0;
const endVolume = 20.0;
const step = 0.1;
const startYear = 1970;
const endYear = yearNow();
const N = 30;
export const NewAnnouncement: React.FC = () => {
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
  const [resetValue, setResetValue] = useState(Array(N).fill(false));
  const [isValid, setIsValid] = useState(false);
  const [immutableData, setImmutableData] = useState(false);
  const [prevTypeCategory, setPrevTypeCategory] = useState<string | string[]>(
    '',
  );
  const isLoading = useSelector(getIsloadingFiltredCars);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
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
  const [resetCheckedItemId, setResetCheckedItemId] = useState(false);
  const [needToAddFile, setNeedToAddFile] = useState(false);
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

  const closeMessage = (index: number) => {
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
  const maxDigits = 9;
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>(
    'Область',
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
  const [typeCategory, setTypeCategory] = useState<string | string[]>(
    'Легкові',
  );
  const [carBrand, setCarBrand] = useState<string | string[]>('Бренд');
  const [carModel, setCarModel] = useState<string | string[]>('Модель');

  const typeCars: IType[] = useAppSelector(getFilterTypes);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const models: IModel[] = useAppSelector(getFilterModels);
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const cities: ICities[] = useAppSelector(getFilterCities);

  const sortedImages = [...selectedImages].sort((a, b) => {
    if (a.name === mainPhoto && b.name !== mainPhoto) {
      return -1;
    } else if (a.name !== mainPhoto && b.name === mainPhoto) {
      return 1;
    } else {
      return 0;
    }
  });

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

  const id = location.state && location.state.id ? location.state.id : null;
  const resetALLValue = useCallback(() => {
    if (
      input2Ref.current &&
      input2Ref.current.classList.contains(styles.inputVincodeInValid)
    ) {
      input2Ref.current.classList.remove(styles.inputVincodeInValid);
    }
    if (
      input3Ref.current &&
      input3Ref.current.classList.contains(styles.inputVincodeInValid)
    ) {
      input3Ref.current.classList.remove(styles.inputVincodeInValid);
    }
    if (
      input4Ref.current &&
      input4Ref.current.classList.contains(
        styles.inputVincodeInValid_staticValue,
      )
    ) {
      input4Ref.current.classList.remove(
        styles.inputVincodeInValid_staticValue,
      );
    }
    const newResetValue = Array(N).fill(true);
    const newResetValueFalse = Array(N).fill(false);
    setIsShow(newResetValueFalse);
    setResetValue(newResetValue);
    setCarModel('Модель');
    setVinCode('');
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
    setSelectedImages([]);
    dispatch(cleanFiltredStore({ field: 'models' }));
    setTimeout(() => {
      setResetValue(newResetValueFalse);
      dispatch(cleanFiltredStore({ field: 'cities' }));
    }, 100);
  }, [dispatch]);
  useEffect(() => {
    if (typeCategory !== prevTypeCategory && isAdvertisements) {
      resetALLValue();
    }
    setPrevTypeCategory(typeCategory);
  }, [
    typeCategory,
    prevTypeCategory,
    dispatch,
    isAdvertisements,
    resetALLValue,
  ]);
  useEffect(() => {
    const fetchData = async () => {
      if (!isAdvertisementsEdit || !id) {
        return;
      }
      if (isAdvertisementsEdit && id) {
        // setIsLoading(true)
        try {
          const response = await getAdvertisement(id);
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
          response.galleries.forEach((item: any) => {
            if (item.transportGalleryUrl !== null) {
              if (
                extractPhotoName(item.transportGalleryUrl!) ===
                extractPhotoName(response.mainPhoto)
              ) {
                setMainPhoto(
                  extractPhotoName(item.transportGalleryUrl!) as string,
                );
              }
            }
          });
          setEngineVolumes(response.engineDisplacement);
          setEnginePower(response.enginePower);
          setMileage(response.mileage);
          setNumberOfDoors(response.numberOfDoors);
          setNumberOfSeats(response.numberOfSeats);
          setInputPhone(response.phone.slice(4));
          setVinCode(response.vincode);
          response.galleries.forEach((item: any) => {
            setSelectedImages(prevImages => {
              return [
                ...prevImages,
                {
                  name: (item.transportGalleryUrl !== null
                    ? extractPhotoName(item.transportGalleryUrl)
                    : '') as string,
                  url: item.transportGalleryUrl,
                  id: item.transportGalleryId,
                },
              ];
            });
          });
          setImmutableData(true);
          // setIsLoading(false);
        } catch (error) {
          console.log('error :>> ', error);
        }
      }
    };

    fetchData();
  }, [isAdvertisementsEdit, id]);

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
      if (transportTypeId !== null) {
        const data = await getCarTypeParam(transportTypeId);
        setData(data);
      }
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
    event.target.classList.remove(styles.inputVincodeInValid_staticValue);
    closeMessage(16);
    if (/^[0-9]*$/.test(value) && value.length <= maxDigits) {
      setInputPhone(value);
      setIsValid(true);
    }
  };
  const remainingDigits = maxDigits - (inputPhone.length - 1);

  const handleInputPhoneBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length !== 9) {
      event.currentTarget.classList.add(styles.inputVincodeInValid_staticValue);
      setIsValid(false);
      openNotification(16, `Залишилось ввести цифр ${remainingDigits - 1}!`);
    }
    if (value.length === 9) {
      event.currentTarget.classList.remove(
        styles.inputVincodeInValid_staticValue,
      );
      setIsValid(true);
      closeMessage(16);
    }
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    event.currentTarget.classList.remove(styles.textareaInvalid);
    setTextValue(value);
    closeMessage(17);
  };

  const handleTextareaBlur = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    const detectedLanguage = franc(value);

    if (value.length < 100) {
      setIsValid(false);
      event.currentTarget.classList.add(styles.textareaInvalid);
      openNotification(
        17,
        'Опис автомобіля має становити 100 і більше символів!',
      );
    }
    if (detectedLanguage === 'ukr') {
      setIsValid(true);
      event.currentTarget.classList.remove(styles.textareaInvalid);
      closeMessage(17);
    }
    if (detectedLanguage === 'eng') {
      setIsValid(true);
      event.currentTarget.classList.remove(styles.textareaInvalid);
      closeMessage(17);
    }

    // Якщо мова не відповідає жодній перевірці
    if (detectedLanguage !== 'ukr' && detectedLanguage !== 'eng') {
      setIsValid(false);
      event.currentTarget.classList.add(styles.textareaInvalid);
      openNotification(
        17,
        'Неправильний формат тексту! Використовуйте українську чи англійську мови!',
      );
    } else {
      setIsValid(true);
      event.currentTarget.classList.remove(styles.textareaInvalid);
      closeMessage(17);
    }
  };

  const handleAddMorePhoto = () => {
    inputRef.current && (inputRef.current.value = '');
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleAddPhoto = (newImages: UploadedImage[]) => {
    closeMessage(0);
    setSelectedImages(prevImages => [...prevImages, ...newImages]);
    setNeedToAddFile(true);
  };
  const handleDeletePhoto = (imageId: string, name: string) => {
    if (
      responseData &&
      responseData.galleries.filter(
        (item: any) => item.transportGalleryId === imageId,
      ).length > 0
    ) {
      deletePhotoAdvertisement(imageId.toString(), () => {
        setSelectedImages(prevImages =>
          prevImages.filter(image => image.id !== imageId),
        );
        setNeedToAddFile(true);
        if (name === mainPhoto) {
          setMainPhoto('');
        }
        setResetCheckedItemId(true);
      }).catch(error => {
        console.error('Ошибка в запросе:', error);
      });
    } else {
      setSelectedImages(prevImages =>
        prevImages.filter(image => image.id !== imageId),
      );
      // setResetCheckedItemId(true)
      setNeedToAddFile(true);
      inputRef.current && (inputRef.current.value = '');
      if (name === mainPhoto) {
        setMainPhoto('');
      }
    }
  };

  const handleVinCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVinCode(value.toUpperCase().trim());
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
    const regexp = /^[a-zA-Z0-9]*$/;
    const regex = new RegExp(regexp);
    const isValid = regex.test(value);
    if (isValid && value.length === 17) {
      event.currentTarget.classList.remove(styles.inputVincodeInValid);
      closeMessage(index);
      setVinCode(value);
    } else {
      event.currentTarget.classList.add(styles.inputVincodeInValid);
      openNotification(
        index,
        'VIN code містить 17 символів, приклад SN2X03BW4ZTUA08WF',
      );
    }
    setActiveField(prevState => {
      const activeField = [...prevState];
      activeField[index] = null;
      return activeField;
    });
  };

  const handleMileage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.classList.remove(styles.inputVincodeInValid);
    closeMessage(11);
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
    closeMessage(15);
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
  const handleDeleteAdvers = () => {
    if (responseData && responseData.id !== null) {
      putDeleteAdvertisement(responseData!.id.toString());
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
  };

  const handleAddOrUpdateAdvers = () => {
    if (isAdvertisements) {
      if (
        textValue.length >= 100 &&
        isValid &&
        selectedImages.length > 0 &&
        mainPhoto !== '' &&
        price &&
        selectedCity !== 'Місто' &&
        carModel !== '' &&
        yearCar !== 'Рік' &&
        selectedBodyType !== 'Тип кузову' &&
        selectedFuelType !== 'Тип палива' &&
        fuelConsumption !== 'Літри' &&
        (typeCategory === 'Водний транспорт'
          ? true
          : selectedTransmission !== 'Коробка передач') &&
        (typeCategory === 'Водний транспорт' ? true : mileage) &&
        (typeCategory === 'Сільгосптехніка' ||
        typeCategory === 'Водний транспорт'
          ? true
          : engineVolumes !== 'Літри') &&
        (typeCategory === 'Водний транспорт'
          ? true
          : selectedDriveType !== 'Привід') &&
        inputPhone.length === 9
      ) {
        console.log('click :>> ');
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
          const colorId = getArrayColorOfId(
            transportColor ?? [],
            selectedColor,
          );
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
          selectedImageFile.forEach((item: any) => {
            formData.append('multipartFiles', item.file[0]);
          });

          const requestData: RequestData = {
            model: modelId[0],
            bodyType: bodyTypeId[0],
            importedFrom: producingCountryId[0],
            year: +yearCar,
            price: price,
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
            engineDisplacement: +engineVolumes,
            enginePower: enginePower,
            driveType: driveTypeId[0],
            mileage,
            numberOfDoors,
            numberOfSeats,
            wheelConfiguration: wheelConfigurationId[0],
            numberAxles: numberAxlesId[0],
            phone: staticValue + inputPhone,
          };

          formData.append(
            'requestAddTransportDTO',
            new Blob([JSON.stringify(requestData)], {
              type: 'application/json',
            }),
          );
          formData.set('Content-Type', 'application/json');

          return formData;
        };
        const formData: FormData = createFormData(selectedImages);
        // setIsLoading(true);

        postNewAdvertisement(formData)
          .then(response => {
            navigate(`/catalog/${response}`);
          })
          .catch(error => {
            console.error('Произошла ошибка:', error);
          });
        resetALLValue();
        // setIsLoading(false);
      } else {
        if (!selectedImages.length && !mainPhoto) {
          openNotification(0, 'Додайте фото!');
        }
        if (typeCategory === 'Тип' || typeCategory === '') {
          openNotification(1, 'Виберіть тип автомобіля!');
        }
        if (textValue.length < 100) {
          openNotification(
            17,
            'Опис автомобіля має становити 100 і більше символів!',
          );
        }
        if (carBrand === 'Бренд' || carBrand === '') {
          openNotification(3, 'Виберіть бренд автомобіля!');
        }
        if (carModel === 'Модель' || carModel === '') {
          openNotification(4, 'Виберіть модель автомобіля!');
        }
        if (yearCar === 'Рік' || yearCar === '') {
          openNotification(5, 'Виберіть рік випуску автомобіля!');
        }
        if (selectedBodyType === 'Тип кузову' || selectedBodyType === '') {
          openNotification(6, 'Виберіть тип кузову автомобіля!');
        }
        if (selectedFuelType === 'Тип палива' || selectedFuelType === '') {
          openNotification(7, 'Виберіть тип палива автомобіля!');
        }
        if (fuelConsumption === 'Літри' || fuelConsumption === '') {
          openNotification(8, 'Виберіть середню витрату палива!');
        }
        if (engineVolumes === 'Літри' || engineVolumes === '') {
          openNotification(9, "Виберіть об'єм двигуна автомобіля!");
        }
        if (
          selectedTransmission === 'Коробка передач' ||
          selectedTransmission === ''
        ) {
          openNotification(10, 'Виберіть коробку передач автомобіля!');
        }
        if (!mileage && input2Ref.current) {
          input2Ref.current.classList.add(styles.inputVincodeInValid);
          openNotification(11, 'Додайте пробіг автомобіля!');
        }
        if (selectedDriveType === 'Привід' || selectedDriveType === '') {
          openNotification(12, 'Виберіть привід автомобіля!');
        }
        if (selectedRegions === 'Область' || selectedRegions === '') {
          openNotification(13, 'Виберіть область!');
        }
        if (selectedCity === 'Місто' || selectedCity === '') {
          openNotification(14, 'Виберіть місто!');
        }
        if (!price && input3Ref.current) {
          input3Ref.current.classList.add(styles.inputVincodeInValid);
          openNotification(15, 'Додайте ціну автомобіля!');
        }
        if (!inputPhone && input4Ref.current) {
          input4Ref.current.classList.add(
            styles.inputVincodeInValid_staticValue,
          );
          openNotification(16, 'Додайте номер телефону!');
        }
      }
    }
    if (isAdvertisementsEdit) {
      const createFormData = () => {
        const cityId = getArrayCityOfId(cities, selectedCity);
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
        const newImages: any[] = [];

        if (selectedImages && responseData && responseData.galleries) {
          selectedImages.forEach(selectedImage => {
            const isUrlExists = responseData.galleries.some(
              (item: any) => item.transportGalleryUrl === selectedImage.url,
            );
            if (!isUrlExists) {
              newImages.push(selectedImage);
            }
          });
        }
        const formData = new FormData();
        newImages.forEach((item: any) => {
          if (needToAddFile) {
            formData.append('multipartFiles', item.file[0]);
          }
        });
        let comparedValues: { [key: string]: any } = {};

        const requestDataForChecking: RequestData = {
          description: textValue,
          fuelConsumptionMixed: +fuelConsumption,
          engineDisplacement: +engineVolumes,
          mileage,
          enginePower: enginePower,
          city: selectedCity,
          condition: selectedCondition,
          numberOfDoors,
          numberOfSeats,
          importedFrom: selectedProducingCountry,
          price,
          bargain: selectedOption,
          wheelConfiguration: selectedWheelConfiguration,
          numberAxles: selectedAxle,
          phone: staticValue + inputPhone,
        };
        if (responseData !== null && typeof responseData === 'object') {
          for (const key in requestDataForChecking) {
            if (
              key in responseData &&
              requestDataForChecking[key] !== responseData[key]
            ) {
              comparedValues[key] = requestDataForChecking[key];
            }
          }
        }
        const responseDataPhotoName = extractPhotoName(responseData!.mainPhoto);
        if (responseDataPhotoName !== mainPhoto) {
          comparedValues = {
            ...comparedValues,
            mainPhoto: mainPhoto,
          };
        }
        const newData: RequestData = {};
        const requestData: RequestData = {
          mainPhoto: mainPhoto,
          description: textValue,
          fuelConsumptionMixed: +fuelConsumption,
          engineDisplacement: +engineVolumes,
          mileage,
          enginePower: enginePower,
          city: cityId[0],
          condition: conditionId[0],
          numberOfDoors,
          numberOfSeats,
          importedFrom: producingCountryId[0],
          price,
          bargain: selectedOption,
          wheelConfiguration: wheelConfigurationId[0],
          numberAxles: numberAxlesId[0],
          phone: staticValue + inputPhone,
        };
        const keysFromComparedValues = Object.keys(comparedValues);
        const allKeysExist = keysFromComparedValues.every(
          key => key in requestData,
        );
        if (allKeysExist) {
          for (const key in requestData) {
            if (
              key in comparedValues &&
              requestData[key] !== undefined &&
              comparedValues[key] !== undefined
            ) {
              newData[key] = requestData[key];
            }
          }
        }

        formData.append(
          'body',
          new Blob([JSON.stringify(newData)], { type: 'application/json' }),
        );
        formData.set('Content-Type', 'application/json');

        return formData;
      };
      const formData: FormData = createFormData();

      putEditAdvertisement(id.toString(), formData)
        .then(() => navigate(-1))
        .catch(error => {
          console.error('Произошла ошибка:', error);
        });
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
            resetCheckedItemId={resetCheckedItemId}
            mainPhoto={mainPhoto}
            isShow={isShow[0]}
            inputRef={inputRef}
            selectedImages={sortedImages}
            setResetCheckedItemId={setResetCheckedItemId}
            handleAddPhoto={handleAddPhoto}
            handleDeletePhoto={handleDeletePhoto}
            addMainPhoto={handleAddMainePhoto}
            closeMessage={closeMessage}
            errorAddPhoto={openNotification}
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
              onClick={() => handleMobileBtnIsOpen('block0')}
            >
              {isOpen.block0 ? (
                <Arrowup width={24} height={24} />
              ) : (
                <Arrowdown width={24} height={24} />
              )}
            </div>
          </div>
          <div className={styles.listItem}>
            {isOpen.block0 && (
              <div className={styles.item_dropdown_box}>
                <Dropdown
                  isDissabled={immutableData}
                  stylepaddingZero={true}
                  isShow={isShow[1]}
                  index={1}
                  closeMessage={closeMessage}
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
                  selectedOptions={typeCategory}
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
              <div className={styles.listItem}>
                <textarea
                  id="story"
                  name="story"
                  rows={15}
                  cols={133}
                  className={
                    isShow[17] ? styles.textareaInvalid : styles.textarea
                  }
                  maxLength={2000}
                  placeholder="Text"
                  value={textValue}
                  onChange={handleTextareaChange}
                  onBlur={handleTextareaBlur}
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
                  {isShow[17] && (
                    <span className={styles.VinCode_errorMessage}>
                      {messages[17]}
                    </span>
                  )}
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
                onClick={() => handleMobileBtnIsOpen('block2')}
              >
                {isOpen.block2 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block2 && (
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
                    autoComplete="off"
                    readOnly={immutableData}
                    disabled={immutableData}
                    ref={input1Ref}
                    className={`${styles.inputPhone} ${styles.VinCode_field}`}
                    style={{
                      cursor: immutableData ? 'not-allowed' : 'pointer',
                    }}
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
                      resetValue={resetValue[0]}
                      isDissabled={immutableData}
                      stylepaddingZero={true}
                      isShow={isShow[3]}
                      index={3}
                      closeMessage={closeMessage}
                      updateStyle="advSearch"
                      options={[...brands.map(brand => brand.brand)].sort(
                        (a, b) => a.localeCompare(b),
                      )}
                      label="Бренд"
                      startValue="Бренд"
                      option={carBrand}
                      selectedOptions={carBrand}
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
                      resetValue={resetValue[1]}
                      isDissabled={immutableData}
                      stylepaddingZero={true}
                      isShow={isShow[4]}
                      index={4}
                      closeMessage={closeMessage}
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
                      selectedOptions={carModel}
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
                    resetValue={resetValue[2]}
                    isDissabled={immutableData}
                    stylepaddingZero={true}
                    isShow={isShow[5]}
                    index={5}
                    closeMessage={closeMessage}
                    updateStyle="advSearch"
                    options={yearsArray.map(item => item)}
                    label="Рік"
                    startValue="Рік"
                    option={yearCar}
                    selectedOptions={yearCar}
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
                      resetValue={resetValue[3]}
                      isDissabled={immutableData}
                      stylepaddingZero={true}
                      isShow={isShow[6]}
                      index={6}
                      closeMessage={closeMessage}
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
                      selectedOptions={selectedBodyType}
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
                      resetValue={resetValue[4]}
                      isDissabled={immutableData}
                      stylepaddingZero={true}
                      isShow={isShow[7]}
                      index={7}
                      closeMessage={closeMessage}
                      updateStyle="advSearch"
                      options={
                        fuel
                          ? fuel.map((item: any) => item.fuelType)
                          : 'Нема співпадінь'
                      }
                      label="Тип палива"
                      startValue="Тип палива"
                      option={selectedFuelType}
                      selectedOptions={selectedFuelType}
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
                      resetValue={resetValue[5]}
                      stylepaddingZero={true}
                      isShow={isShow[8]}
                      index={8}
                      closeMessage={closeMessage}
                      updateStyle="advSearch"
                      options={engineVolumesArray.map(item => item)}
                      label="Літри"
                      startValue="Літри"
                      option={fuelConsumption}
                      selectedOptions={fuelConsumption}
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
                      resetValue={resetValue[6]}
                      stylepaddingZero={true}
                      isShow={isShow[9]}
                      index={9}
                      closeMessage={closeMessage}
                      updateStyle="advSearch"
                      options={engineVolumesArray.map(item => item)}
                      label="Літри"
                      startValue="Літри"
                      allOptionsLabel="Об'єм двигуна"
                      option={engineVolumes}
                      selectedOptions={engineVolumes}
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
                      resetValue={resetValue[7]}
                      isDissabled={immutableData}
                      stylepaddingZero={true}
                      isShow={isShow[10]}
                      index={10}
                      closeMessage={closeMessage}
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
                      selectedOptions={selectedTransmission}
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      resetValue={resetValue[8]}
                      isDissabled={immutableData}
                      stylepaddingZero={true}
                      isShow={isShow[12]}
                      index={12}
                      closeMessage={closeMessage}
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
                      selectedOptions={selectedDriveType}
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
                    resetValue={resetValue[9]}
                    stylepaddingZero={true}
                    isShow={isShow[13]}
                    index={13}
                    closeMessage={closeMessage}
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
                    selectedOptions={selectedRegions}
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
                      resetValue={resetValue[10]}
                      stylepaddingZero={true}
                      isShow={isShow[14]}
                      index={14}
                      closeMessage={closeMessage}
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
                      selectedOptions={selectedCity}
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
                      resetValue={resetValue[11]}
                      isDissabled={immutableData}
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
                      selectedOptions={selectedColor}
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
                      resetValue={resetValue[12]}
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
                      selectedOptions={selectedCondition}
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      resetValue={resetValue[13]}
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
                      selectedOptions={selectedAxle}
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
                      resetValue={resetValue[14]}
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
                      selectedOptions={selectedWheelConfiguration}
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
                      resetValue={resetValue[15]}
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
                      selectedOptions={selectedProducingCountry}
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
                <div className={styles.item_dropdown_box}>
                  <input
                    autoComplete="off"
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
                onClick={() => handleMobileBtnIsOpen('block25')}
              >
                {isOpen.block25 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            {isOpen.block25 && (
              <div className={styles.wrapper_item}>
                <div className={styles.item}>
                  <span className={styles.staticValue}>+380</span>
                  <input
                    autoComplete="off"
                    ref={input4Ref}
                    className={styles.inputPhone_withStaticValue}
                    type="text"
                    pattern="\+[0-9]*"
                    maxLength={maxDigits}
                    value={inputPhone}
                    title={`${remainingDigits} цифр залишилось`}
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

          {isAdvertisements && (
            <button
              className={styles.btn_advers}
              type="button"
              onClick={handleAddOrUpdateAdvers}
            >
              Розмістити оголошення
            </button>
          )}
          {isAdvertisementsEdit && (
            <div className={styles.buttonContainer}>
              <button
                className={styles.btn_advers_delete}
                type="button"
                onClick={handleDeleteAdvers}
              >
                Видалити оголошення
                <Trash className={styles.trashIcon} />
              </button>
              <button
                className={styles.btn_advers}
                type="button"
                onClick={handleAddOrUpdateAdvers}
              >
                Зберегти
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
